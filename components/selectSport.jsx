import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../AuthContext';

export default function SelectSport() {
    const {sportCat, setSportCat} = useContext(AuthContext)
    
    const handlePress = (sp) => {
        if (sportCat !== sp) {
            setSportCat(sp);
        } else if (sportCat === sp) {
            setSportCat(null);
        }
    };

    return (
        <View className='flex-row items-center justify-between'>
            <TouchableOpacity onPress={() => handlePress("football")}>
                <View className={`items-center m-2 p-2 rounded-lg ${sportCat === "football" ? "bg-[#ffd42a]" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='football' color={sportCat === "football" ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>football</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("cricket")}>
                <View className={`items-center m-2 p-2 rounded-lg ${sportCat === "cricket" ? "bg-[#ffd42a]" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name="menu-sharp" className="bg-transparent" color={sportCat === "cricket" ? "white" : "black"} size={26} style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
                <Text className='text-xs text-center'>cricket</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("basketball")}>
                <View className={`items-center m-2 p-2 rounded-lg ${sportCat === "basketball" ? "bg-[#ffd42a]" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='basketball-sharp' color={sportCat === "basketball" ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>basketball</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("swimming")}>
                <View className={`items-center m-2 p-2 rounded-lg ${sportCat === "swimming" ? "bg-[#ffd42a]" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='water-sharp' color={sportCat === "swimming" ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>swimming</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("esport")}>
                <View className={`items-center m-2 p-2 rounded-lg ${sportCat === "esport" ? "bg-[#ffd42a]" : "bg-white"}`} style={{
                    shadowColor: '#6c6c6c',
                    shadowOpacity: 0.1,
                    elevation: 10,
                }}>
                    <Ionicons name='game-controller-sharp' color={sportCat === "esport" ? "white" : "black"} size={26} />
                </View>
                <Text className='text-xs text-center'>e-sport</Text>
            </TouchableOpacity>
        </View>
    )
}
