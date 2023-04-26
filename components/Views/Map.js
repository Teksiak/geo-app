import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function MapDisplay({ route, navigation }) {
    const enabledPins = route.params
    return (
        <View style={{ flex: 1, backgroundColor: "#52489C" }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: enabledPins[0].latitude,
                    longitude: enabledPins[0].longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                {enabledPins.map((el) => {
                    return <Marker
                        coordinate={{
                            latitude: el.latitude,
                            longitude: el.longitude,
                        }}
                        key={el.timestamp}
                    />;
                })}
            </MapView>
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
