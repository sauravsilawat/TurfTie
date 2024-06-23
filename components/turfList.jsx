import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native-elements'
import data from '../assets/constant/list'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from 'expo-router'

export default function TurfList() {
    return (
        <View className='flex-row flex-wrap justify-between gap-y-10'>
            {data ? (
                data.listing.map((item) => (
                    <Link href={`/listing/${item.key}`} asChild>
                        <TouchableOpacity key={item.key} className="relative">
                            <Image source={item.img} className="w-[165px] h-36 rounded-t-xl"></Image>
                            <View className="absolute flex-row p-3">
                                <View className=" justify-center items-center rounded-full w-5 h-5 bg-yellow-400"><Ionicons color='white' name='star' size={14} /></View>
                                <Text className="ml-2 font-rblack text-white">{item.rating}</Text>
                            </View>
                            <View className="p-2 bg-[#0bc288] rounded-b-xl">
                                <Text className="text-white font-extrabold text-base">{item.title}</Text>
                                <Text className="text-white text-sm">{item.loc}</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))
            ) : (
                <View></View>
            )}
        </View>
    )
}