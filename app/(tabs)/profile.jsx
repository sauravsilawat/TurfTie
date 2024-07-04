import { View, Image, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'; // Make sure to import the necessary Firestore functions
import { auth, db } from '../../firebaseConfig'; // Adjust the import according to your project structure

import pic from '../../assets/image/profilpic.png';
import { AuthContext, useAuth } from '../../AuthContext';

export default function Profile() {

  const { userData, setUserData } = useContext(AuthContext);
  const [editOpen, setEditOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const usernameRef = useRef("");
  const profilepicRef = useRef("");

  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  }

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
      } else {
        console.error("No such document!");
      }
    });

    return () => unsubscribe();
  }, [setUserData]);

  const editProfil = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        profile: { current: profilepicRef.current },
        username: usernameRef.current
      });
      console.log("Profile updated successfully.");
    } catch (error) {
      console.error("Error while profile update:", error);
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: editOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [editOpen]);

  return (
    <View className="bg-[#00B09D]">
      <View className="items-center py-10">
        {
          userData.profile?.current !== "" ?
            <Image source={{ uri: userData.profile.current }} className="w-[100px] h-[100px] rounded-full"></Image> :
            <Image source={pic} className="w-[100px] h-[100px] rounded-full"></Image>
        }
        <Text className="text-2xl mt-4 font-semibold">{userData.username}</Text>
      </View>
      <View className="w-full h-screen items-center pt-10 rounded-3xl bg-white">
        <TouchableOpacity onPress={() => setEditOpen(!editOpen)} className="flex-row justify-between items-center w-4/5 mb-6">
          <View className="flex-row gap-2 items-center">
            <Ionicons name='create-outline' size={26}></Ionicons>
            <Text className="text-lg font-medium">Edit Account</Text>
          </View>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons name='caret-forward-outline' color={"#ffd42a"} size={26} />
          </Animated.View>
        </TouchableOpacity>
        {editOpen && <View className="items-center">
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 mb-4 py-2 w-[300px]"
            placeholder="Enter your name"
            onChangeText={(value) => usernameRef.current = value}
            autoCapitalize="none"
          />
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 mb-6 w-[300px]"
            placeholder="Enter your profile link"
            onChangeText={(value) => profilepicRef.current = value}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={editProfil} className="flex-row justify-between p-2 rounded-md bg-[#ffd42a] items-center w-4/5 mb-6">
            <Text className="text-base text-white font-medium">Update</Text>
          </TouchableOpacity>
        </View>}
        <TouchableOpacity onPress={handleLogout} className="flex-row justify-between items-center w-4/5 mb-6">
          <View className="flex-row gap-2 items-center">
            <Ionicons name='log-out-outline' size={26}></Ionicons>
            <Text className="text-lg font-medium">Logout</Text>
          </View>
          <Ionicons name='caret-forward-outline' color={"#ffd42a"} size={26}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
