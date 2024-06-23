import { View, Text, Image, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import data from '../../assets/constant/list'
import { FlatList } from 'react-native-gesture-handler'

const bookmark = () => {
  const [selected, setSelect] = useState(null);

  const toggleSelection = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelect(selected === key ? null : key);
  };

  return (
    <FlatList
      className="bg-white pt-4 px-6"
      data={data.booking}
      keyExtractor={(item) => item.key.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={`flex-row rounded-xl items-center text-black my-4 ${selected === item.key ? "border-green-800 border-[1px] p-4" : ""}`}
          onPress={() => toggleSelection(item.key)}>
          <Image source={item.img} resizeMode='fit' className={`rounded-lg w-[120px] h-[90px] mr-4 ${selected === item.key ? "w-[100] h-[90]" : ""}`} />
          <View className="flex-1">
            <View className="justify-center gap-1">
              <Text className="font-semibold text-base">{item.title}</Text>
              <Text className="text-xs font-light">{item.loc}</Text>
              <View className="flex-row">
                <Text className="text-xs mr-4 font-light">Date: {item.date}</Text>
                <Text className="text-xs font-light">Slot: {item.slot}</Text>
              </View>
              <View className={`flex-row pt-2 ${selected === item.key ? "justify-between" : ""}`}>
                <Text className={`text-sm flex-row font-normal ${item.status === "Upcoming" && item.key === selected ? "w-[40%]" : ""}`}>Status: {item.status}</Text>
                {selected === item.key && item.status === "Upcoming" && (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    className="justify-center items-center bg-yellow-400 rounded-lg p-1 w-[40%] flex-row"
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    >
    </FlatList>
  )
}

export default bookmark