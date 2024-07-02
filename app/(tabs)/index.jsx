import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'
import SelectSport from '../../components/selectSport'
import TurfList from '../../components/turfList'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from '../../AuthContext'


export default function home() {
  const {search, setSearch} = useContext(AuthContext);

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <ScrollView className="bg-white h-[100%]  py-16">
      <Text className='px-[6%] text-3xl font-medium '>Hello Saurav</Text>
      <Text className="px-[6%]">Let's book your perfect playfield</Text>

      <View className='flex-row px-[6%] items-center gap-2 py-6'>
        <Ionicons name='location-sharp' size={20} />
        <Text className='text-2xl'>Indore</Text>
        <Ionicons name='caret-down-outline' size={16} />
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