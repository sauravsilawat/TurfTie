import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function _layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'orange', 
                tabBarInactiveTintColor: "#CECDCD",
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomEndRadius: 100,
                    borderBottomStartRadius: 100,
                    marginBottom: 30,
                    marginHorizontal: 60,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    height: 60,
                    paddingHorizontal: 20,
                    position: 'absolute',
                    bottom: 0,
                    width: '70%'
                    
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
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name={'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='bookmark'
                options={{
                    title: 'Bookings',
                    tabBarLabel: '',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'semibold',
                        fontSize: 26,
                    },
                    headerStyle: {
                        shadowColor: '',
                    },
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name={'bookmark-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name={'person-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
