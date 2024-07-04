import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState } from 'react';

import supimg from '../assets/image/signup.png';
import sinimg from '../assets/image/signin.png';
import { useAuth } from '../AuthContext';

export default function Sign() {

  const [isLogin, setLogin] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profilepicRef = useRef("");

  const { login, register } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Please fill all the fields");
      return;
    }

    let response = await login(emailRef.current, passwordRef.current);

    console.log('got result:', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    } 
  };

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current ) {
      Alert.alert('Sign Up', "Please fill all the fields");
      return;
    }

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profilepicRef);

    console.log('got result:', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  }

  return (
    <View className="bg-white h-screen justify-center items-center">
      <Image source={isLogin ? sinimg : supimg} className="w-80 h-80 my-8" />
      <View className="gap-4">
        {!isLogin && <TextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 min-w-[300px]"
          placeholder="Enter your name"
          onChangeText={(value) => usernameRef.current = value}
          autoCapitalize="none"
        />}
        <TextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 min-w-[300px]"
          placeholder="Enter your email"
          onChangeText={(value) => emailRef.current = value}
          autoCapitalize="none"
        />
        <TextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Enter your password"
          onChangeText={(value) => passwordRef.current = value}
          secureTextEntry
        />
        {!isLogin && <TextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Enter your profile link"
          onChangeText={(value) => profilepicRef.current = value}
          autoCapitalize="none"
        />}
        <TouchableOpacity
          className="p-2 bg-[#00B09D] items-center justify-center rounded-lg"
          onPress={() => {
            if (isLogin) {
              handleLogin();
            } else {
              handleRegister();
            }
          }}
        >
          <Text className="text-white text-xl font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="mt-4 py-4" onPress={() => setLogin(!isLogin)}>
        <Text className="text-xs text-gray-500">
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
