import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function _layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: "#929090",
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    height: 70,
                    paddingHorizontal: 20,
                },
                headerStyle: {
                    height: 150,
                    borderBottomColor: "",
                    borderBottomWidth: 0,
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarLabel: '',
                    headerShown: "",
                    tabBarIcon: () => (
                        <Ionicons size={28} name={'home'} />
                    ),
                }}
            />
            <Tabs.Screen
                name='bookmark'
                options={{
                    title: 'Bookings',
                    tabBarLabel: '',
                    headerShown: "Bookings",
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'semibold',
                        fontSize: 26,
                    },
                    headerStyle: {
                        shadowColor: '',
                    },
                    tabBarIcon: () => (
                        <Ionicons size={28} name={'bookmark'} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarLabel: '',
                    headerShown: "",
                    tabBarIcon: () => (
                        <Ionicons size={28} name={'person'} />
                    ),
                }}
            />
        </Tabs>
    )
}