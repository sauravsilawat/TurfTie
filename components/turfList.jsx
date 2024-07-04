import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from 'expo-router'
import { getDocs, query, where } from 'firebase/firestore'
import { turfsRef } from '../firebaseConfig'
import { AuthContext } from '../AuthContext'

export default function TurfList() {
    const { sportCat, search, cities, filteredData, setFilteredData } = useContext(AuthContext)
    const [turfData, setTurfData] = useState(null);

    useEffect(() => {
        const fetchTurfs = async () => {
            try {
                console.log("Fetching turfs collection...");
                let q = turfsRef;

                if (sportCat) {
                    q = query(q, where('sport', 'array-contains', sportCat));
                } if (cities !== "Anywhere") {
                    q = query(q, where('city', '==', cities));
                } else {
                    q = query(turfsRef);
                }
                const querySnapshot = await getDocs(q);
                let datalist = [];
                querySnapshot.forEach(doc => {
                    datalist.push({ id: doc.id, ...doc.data() });
                });
                setTurfData(datalist);
                setFilteredData(datalist);
            } catch (error) {
                console.error("Error fetching turfs collection:", error);
            }
        };

        fetchTurfs();
    }, [sportCat, cities]);

    useEffect(() => {
        if (search) {
            const filtered = turfData.filter(turf =>
                turf.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(turfData);
        }
    }, [search, turfData]);

    if (!turfData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View className='flex-row flex-wrap justify-between gap-y-10'>
            {filteredData && filteredData.map((item) => (
                <Link href={`/listing/${item.key}`} key={item.key} asChild>
                    <TouchableOpacity className="relative">
                        <Image source={{ uri: item.img }} className="w-[165px] h-36 rounded-t-xl"></Image>
                        <View className="absolute flex-row p-3">
                            <View className=" justify-center items-center rounded-full w-5 h-5 bg-[#ffd42a]"><Ionicons color='white' name='star' size={14} /></View>
                            <Text className="ml-2 font-rblack text-white">{item.rating}</Text>
                        </View>
                        <View className="p-2 bg-[#00B09D] rounded-b-xl">
                            <Text className="text-white font-extrabold text-base">{item.title}</Text>
                            <Text className="text-white text-sm">{item.loc}</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            ))
            }
        </View>
    )
}