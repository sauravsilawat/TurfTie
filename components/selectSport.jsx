import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function SelectSport() {
    const [selectedSport, setselectedSport] = useState(0);

    return (
        <View className='flex-row items-center justify-between'>
            <TouchableOpacity onPress={() => setselectedSport(0)}>
                <View className={`items-center m-2 p-2 rounded-lg ${selectedSport === 0 ? "bg-yellow-400" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='football' color={selectedSport === 0 ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>football</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setselectedSport(1)}>
                <View className={`items-center m-2 p-2 rounded-lg ${selectedSport === 1 ? "bg-yellow-400" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name="menu-sharp" className="bg-transparent" color={selectedSport === 1 ? "white" : "black"} size={26} style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
                <Text className='text-xs text-center'>cricket</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setselectedSport(2)}>
                <View className={`items-center m-2 p-2 rounded-lg ${selectedSport === 2 ? "bg-yellow-400" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='basketball-sharp' color={selectedSport === 2 ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>basketball</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setselectedSport(3)}>
                <View className={`items-center m-2 p-2 rounded-lg ${selectedSport === 3 ? "bg-yellow-400" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='water-sharp' color={selectedSport === 3 ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>swimming</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setselectedSport(4)}>
                <View className={`items-center m-2 p-2 rounded-lg ${selectedSport === 4 ? "bg-yellow-400" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='game-controller-sharp' color={selectedSport === 4 ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>e-sport</Text>
            </TouchableOpacity>
        </View>
    )
}
