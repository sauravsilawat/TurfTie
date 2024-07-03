import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import pic from '../../assets/image/profilpic.png';
import { AuthContext, useAuth } from '../../AuthContext';

export default function Profile() {

  const {name} = useContext(AuthContext);

  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  }

  return (
    <View className="bg-[#00B09D]">
      <View className="items-center py-10">
        <Image source={pic} className="w-[100px] h-[100px] rounded-full"></Image>
        <Text className="text-2xl mt-4 font-semibold">{name}</Text>
      </View>
      <View className="w-full h-screen items-center pt-10 rounded-3xl bg-white">
        <TouchableOpacity className="flex-row justify-between items-center w-4/5 mb-6">
          <View className="flex-row gap-2 items-center">
            <Ionicons name='create-outline' size={26}></Ionicons>
            <Text className="text-lg font-medium">Edit Account</Text>
          </View>
          <Ionicons name='caret-forward-outline' color={"orange"} size={26}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} className="flex-row justify-between items-center w-4/5 mb-6">
          <View className="flex-row gap-2 items-center">
            <Ionicons name='log-out-outline' size={26}></Ionicons>
            <Text className="text-lg font-medium">Logout</Text>
          </View>
          <Ionicons name='caret-forward-outline' color={"orange"} size={26}></Ionicons>
        </TouchableOpacity>
        <Text className="items-center justify-center mt-72">Made by <Ionicons name="paper-plane"></Ionicons> Saurav</Text>
      </View>
    </View>
  );
}
