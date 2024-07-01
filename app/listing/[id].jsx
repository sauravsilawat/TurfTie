import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useLocalSearchParams } from 'expo-router'
import data from '../../assets/constant/list.js'
import { ScrollView } from 'react-native'
import { format, addDays } from 'date-fns';

const ListingDetail = () => {

    const [selectedDate, setSelectedDate] = useState(0);
    const { id } = useLocalSearchParams();
    const turfDetail = data.listing.find((item) => item.key === id);

    const today = new Date();

    const getNextDates = (startDate, numOfDays) => {
        const dates = [];
        for (let i = 0; i < numOfDays; i++) {
            dates.push(addDays(startDate, i));
        }
        return dates;
    };

    const dates = getNextDates(today, 7);

    if (!turfDetail) {
        return (
            <View>
                <Text>Turf not found</Text>
            </View>
        );
    }

    const renderIcon = (sport) => {
        return data.icons[sport];
    };

    return (
        <ScrollView key={turfDetail.key} className='flex-grow bg-white px-[5%]'>
            <Stack.Screen options={{
                headerTransparent: false,
                headerTitle: "Details",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'semibold',
                    fontSize: 26,
                },
                headerStyle: {
                    shadowColor: '',
                }
            }} />
            <View>
                <Image source={turfDetail.img} className="w-full h-52 rounded-xl my-10"></Image>
                <View className="mb-6 flex-row justify-between items-center">
                    <Text className="text-2xl font-bold">{turfDetail.title}</Text>
                    <View className="flex-row gap-2 items-center">
                        <View className="justify-center items-center rounded-full w-7 h-7 bg-[#ffd42a]"><Ionicons color='white' name='star' size={20} /></View>
                        <Text className="font-bold text-xl">{turfDetail.rating}</Text>
                    </View>
                </View>
                <View className="flex-row gap-2 mb-4">
                    <Text className="text-xl font-semibold">Payment:</Text>
                    <Text className="text-xl font-bold text-yellow-400">{turfDetail.price}</Text>
                </View>
                <View
                    className="bg-white rounded-lg p-4 mx-2"
                    style={{
                        shadowColor: '#6c6c6c',
                        shadowOpacity: 0.1,
                        elevation: 8,
                    }}>
                    <View className="flex-row items-center gap-2">
                        <View className="justify-center items-center rounded-full w-6 h-6 bg-[#ffd42a]"><Ionicons color='white' name='location' size={16} /></View>
                        <Text className="text-base font-medium">Location</Text>
                    </View>
                    <Text className="mt-2 ml-7">{turfDetail.loc}</Text>
                </View>
                <View className="mt-4">
                    <Text className="text-xl font-semibold">Date</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} className="flex-row mt-2 pl-2">
                        {dates.map((date, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedDate(index)}
                                className={`px-4 py-[14px] bg-white my-2 mr-5 rounded-xl ${selectedDate === index ? "bg-[#ffd42a] text-white" : ""}`}
                                style={{
                                    shadowColor: '#6c6c6c',
                                    shadowOpacity: 0.1,
                                    elevation: 4,
                                }}
                            >
                                <Text className={`font-black text-base ${selectedDate === index ? "text-white" : "text-slate-400"}`}>
                                    {format(date, 'dd')}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View className='mt-4'>
                    <Text className="text-xl font-semibold">Available Sport</Text>
                    <View className=" flex-row px-2  items-center gap-4 my-2 flex-wrap ">
                        {
                            turfDetail.sport.map((sport) =>
                                <View
                                    key={sport}
                                    className="flex-row items-center rounded-full bg-white py-2 px-4 "
                                    style={{
                                        shadowColor: '#6c6c6c',
                                        shadowOpacity: 0.1,
                                        elevation: 5,
                                    }}>
                                    {renderIcon(sport)}
                                    <Text className="ml-1 text-base">{sport}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
                
                <TouchableOpacity className="bg-[#00B09D] rounded-xl my-4 w-full h-16 items-center justify-center">
                    <Text className="text-2xl font-bold text-white">Book Your Slot</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default ListingDetail