import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import pic from '../../assets/image/profilpic.png';

export default function Profile() {
  return (
    <View className="bg-[#0bc288]">
      <View className="items-center py-10">
        <Image source={pic} className="w-[100px] h-[100px]"></Image>
        <Text className="text-xl mt-4 font-semibold">Your Name</Text>
        <View className="flex-row gap-x-2 items-center mt-2">
          <Ionicons name='location' size={16}></Ionicons>
          <Text className="text-sm">Location</Text>
        </View>
      </View>
      <View className="w-full h-screen items-center pt-10 rounded-3xl bg-white">
        <TouchableOpacity className="flex-row justify-between items-center w-4/5 mb-6">
          <View className="flex-row gap-2 items-center">
            <Ionicons name='create-outline' size={26}></Ionicons>
            <Text className="text-lg font-medium">Edit Account</Text>
          </View>
          <Ionicons name='caret-forward-outline' color={"orange"} size={26}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center w-4/5 mb-6">
          <View className="flex-row gap-2 items-center">
            <Ionicons name='bookmark-outline' size={26}></Ionicons>
            <Text className="text-lg font-medium">Bookings</Text>
          </View>
          <Ionicons name='caret-forward-outline' color={"orange"} size={26}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center w-4/5 mb-6">
          <View className="flex-row gap-2 items-center">
            <Ionicons name='log-out-outline' size={26}></Ionicons>
            <Text className="text-lg font-medium">Logout</Text>
          </View>
          <Ionicons name='caret-forward-outline' color={"orange"} size={26}></Ionicons>
        </TouchableOpacity>
        <Text className="items-center justify-center mt-52">Made by <Ionicons name="paper-plane"></Ionicons> Saurav</Text>
      </View>
    </View>
  );
}
