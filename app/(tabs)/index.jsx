import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'
import SelectSport from '../../components/selectSport'
import TurfList from '../../components/turfList'
import { ScrollView } from 'react-native-gesture-handler'


export default function home() {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <ScrollView className="bg-white h-[100%] px-[5%] py-16">
      <Text className=' text-3xl font-medium '>Hello Saurav</Text>
      <Text>Let's book your perfect playfield</Text>

      <View className='flex-row items-center gap-2 py-6'>
        <Ionicons name='location-sharp' size={20} />
        <Text className='text-2xl'>Indore</Text>
        <Ionicons name='caret-down-outline' size={16} />
      </View>
      <SearchBar
        containerStyle={{
          height: 50,
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
      <View className='my-10'>
        <SelectSport />
      </View>

      <View className='mb-20'>
        <TurfList />
      </View>

    </ScrollView>
  )
}