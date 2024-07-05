import { View, Text, Modal, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'
import SelectSport from '../../components/selectSport'
import TurfList from '../../components/turfList'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from '../../AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'

const place = [
  "Anywhere",
  "Kolkata",
  "New Delhi",
  "Mumbai"
]

const fetchBookingData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return [];
  }

  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data(); // Return entire user data
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user's booking data:", error);
    return null;
  }
};

export default function home() {
  const { userData, setUserData, search, setSearch, cities, setCities } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    const fetchAndSetBookingData = async () => {
      const Data = await fetchBookingData();
      setUserData(Data)
    };

    fetchAndSetBookingData();
  }, []);

  const handleCitySelect = (city) => {
    setCities(city);
    setModalVisible(false);
  };

  return (
    <ScrollView className="bg-white h-[100%]  py-16">
      <Text className='px-[6%] text-3xl font-medium '>Hello {userData && userData.username}</Text>
      <Text className="px-[6%]">Let's book your perfect playfield</Text>

      <View>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          className='flex-row px-[6%] items-center gap-2 py-6'
        >
          <Ionicons name='location-sharp' size={20} />
          <Text className='text-2xl'>{cities}</Text>
          <Ionicons name='caret-down-outline' size={16} />
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className='flex-1 justify-center items-start ml-12 bg-[rgba(0,0,0,0.5)]'>
              <TouchableWithoutFeedback>
                <View className='w-3/5 bg-gray-100 top-[-110px] rounded-lg p-5 shadow-lg'>
                  <FlatList
                    data={place}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className='py-3 border-b border-gray-300'
                        onPress={() => handleCitySelect(item)}
                      >
                        <Text className='text-lg'>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      <View className="px-6">
        <SearchBar
          containerStyle={{
            height: 50,
            // width: 330,
            backgroundColor: 'white',
            borderBottomColor: 'white',
            borderTopColor: 'white',
            borderRadius: 11,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 0.44,
            elevation: 14,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            height: 30,
          }}
          inputStyle={{
            color: 'black',
          }}
          placeholder="Enter your keyword"
          onChangeText={updateSearch}
          value={search}
        />
      </View>
      <View className='my-10 px-[5%]'>
        <SelectSport />
      </View>

      <View className='mb-20 px-[6%]'>
        <TurfList />
      </View>

    </ScrollView>
  )
}