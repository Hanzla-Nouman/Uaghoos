import Features from "@/components/Features";
import { dummyMessages } from "@/constants/mesages";
import React, { useState,useEffect } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  ScrollViewBase,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Voice from '@react-native-community/voice';
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
const Home = () => {
  
  const [messages, setMessages] = useState(dummyMessages);
  const [text, setText] = useState("");

  const handleText=(e)=>{
    setText(e)
  }
 
const getResponse = async () => {
  try {
    const res = await fetch("http://192.168.100.3:4000/api/generate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },body: JSON.stringify({
        prompt: "This is a prompt"
      })
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("Error: " + error);
  }
}

const handleGetContent= async()=>{
 await getResponse()
}

  return (
    <>
      <View className="flex-1 bg-white justify-around">
        <StatusBar barStyle={"dark-content"} />

        <SafeAreaView className=" mt-6 flex-1 justify-around ">
          {/* <View className=" flex-row justify-center items-center mt-4">
            <Image
              style={{ height: hp(20), width: hp(20) }}
              source={require("../assets/images/bot.png")}
            />
          </View> */}
          {messages.length > 0 ? (
            <>
              <View className="flex-row items-center justify-between pr-4">
                <View className="flex-row items-center">
                <Image
           style={{ height: hp(8), width: hp(8) }}
           source={require("../assets/images/bot.png")}
         />
                <Text
                  style={{ fontSize: wp(5) }}
                  className="text-gray-700 font-medium "
                >
                  Assistant {text}
                </Text>
                </View>
                <Ionicons name="menu" size={30} color="black" />
                </View>
              <View className="space-y-2 flex-1 ">
                <View
                  style={{ }}
                  className="bg-neutral-300  px-4"
                >
                  <ScrollView
                    overScrollMode="never"
                    bounces={false}
                    className="space-y-4 pt-2 "
                    showsVerticalScrollIndicator={false}
                  >
                    {messages.map((message, index) => {
                      if (message.role === "assistant") {
                        if (message.content.includes("https")) {
                          return (
                            <View
                              key={index}
                              className="flex-row justify-start"
                            >
                              <View className=" p-2 rounded-2xl rounded-tl-none bg-emerald-100">
                                <Image
                                  resizeMode="contain"
                                  className="rounded-xl"
                                  style={{ width: wp(60), height: wp(60) }}
                                  source={{
                                    uri: message.content,
                                  }}
                                />
                              </View>
                            </View>
                          );
                        } else {
                          return (
                            <View
                              key={index}
                              className="flex-row justify-start"
                            >
                              <View
                                style={{  }}
                                className="bg-emerald-100 max-w-[300]  rounded-xl p-2 rounded-tl-none"
                              >
                                <Text>{message.content}</Text>
                              </View>
                            </View>
                          );
                        }
                      } else {
                        return (
                          <View key={index} className="flex-row justify-end ">
                            <View
                              style={{ }}
                              className="bg-white rounded-xl max-w-[300] p-2 rounded-tr-none"
                            >
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        );
                      }
                    })}
                  </ScrollView>
                </View>
              </View>
            </>
          ) : (
            <>
              <Features />
            </>
          )}
          <View className="bg-neutral-300">
        <View className="  flex-row  relative items-center rounded-full  my-1 mx-1 ">
         <TextInput className=" font-normal  text-lg p-3 w-full mr-10 pr-12 rounded-full pl-5 bg-white" onChangeText={(e)=>handleText(e)} multiline placeholder="Ask anything..."  />
        <TouchableHighlight className="absolute right-1 bg-emerald-500 rounded-full p-2" onPress={handleGetContent}>
         <Ionicons name="send" size={27} color="white" />
         </TouchableHighlight>
         </View>
        
         </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Home;
