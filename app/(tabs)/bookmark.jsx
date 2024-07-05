import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { format } from 'date-fns';
import { AuthContext } from '../../AuthContext';

import nodata from '../../assets/image/nodata.png'

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
      return userDoc.data(); 
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user's booking data:", error);
    return null;
  }
};

const Bookmark = () => {
  const { bookingAlert } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchAndSetBookingData = async () => {
      const userData = await fetchBookingData();
      if (userData && userData.bookedTurfs) {
        const reversedBooking = [...userData.bookedTurfs].reverse();
        setBookingData(reversedBooking);
      }
    };

    fetchAndSetBookingData();
  }, [bookingAlert]);

  const handleDate = (data) => {
    const date = data.toDate();
    return format(date, 'dd MMM yyyy');
  };

  const cancelBooking = async (bookingId) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        bookedTurfs: arrayRemove(bookingData.find(item => item.key === bookingId))
      });
      console.log("Booking canceled successfully.");
      
      // Update state to reflect deletion
      const updatedBookings = bookingData.filter(item => item.key !== bookingId);
      setBookingData(updatedBookings);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const toggleSelection = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelected(selected === key ? null : key);
  };

  if(bookingData.length === 0){
    return <Image source={nodata} className=" mx-auto mt-28 w-[300px] h-[380px]"></Image>
  }

  return (
    <FlatList
      className="bg-white pt-4 px-6"
      data={bookingData}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={`flex-row rounded-xl items-center text-black my-4 ${selected === item.key ? "border-green-800 border-[1px] p-4" : ""}`}
          onPress={() => toggleSelection(item.key)}
        >
          <Image source={{ uri: item.img }} resizeMode='fit' className={`rounded-lg w-[120px] h-[90px] mr-4 ${selected === item.key ? "w-[100px] h-[90px]" : ""}`} />
          <View className="flex-1">
            <View className="justify-center gap-1">
              <Text className="font-semibold text-base">{item.title}</Text>
              <Text className="text-xs font-light">{item.loc}</Text>
              <View className="flex-row">
                <Text className="text-xs mr-4 font-light">Date: {handleDate(item.date)}</Text>
                <Text className="text-xs font-light">Slot: {item.slot}</Text>
              </View>
              <View className={`flex-row pt-2 ${selected === item.key ? "justify-between" : ""}`}>
                {selected === item.key && (
                  new Date(item.date.toDate()) > new Date() ? (
                    <TouchableOpacity
                      onPress={() => cancelBooking(item.key)}
                      activeOpacity={0.4}
                      className="justify-center items-center bg-[#ffd42a] rounded-md p-1 w-full flex-row"
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.4}
                      className="justify-center items-center bg-gray-400 rounded-md p-1 w-full flex-row"
                    >
                      <Text className="text-white">Past</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Bookmark;
