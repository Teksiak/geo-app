import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";

export default function Main({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSansLight: require("../../assets/fonts/OpenSans-Light.ttf"),
    });
    
    return (
        <View style={{ flex: 1, backgroundColor: "#52489C" }}>
            {fontsLoaded ? (
                <View style={style.main}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("List");
                        }}
                    >
                        <Text
                            style={[
                                style.defaultText,
                                {
                                    fontFamily: "OpenSansBold",
                                    fontSize: 64,
                                },
                            ]}
                        >
                            Geo App
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            style.mutedText,
                            {
                                fontFamily: "OpenSansLight",
                                fontSize: 24,
                                textAlign: "center",
                                padding: 20,
                            },
                        ]}
                    >
                        Find and save your position using google maps
                    </Text>
                </View>
            ) : (
                <Text>none</Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    defaultText: {
        color: "#F5EBFF",
    },
    mutedText: {
        color: "#8A7EB2",
    },
});
