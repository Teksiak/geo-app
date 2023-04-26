import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

import ListItem from "../ListItem";
import MyButton from "../MyButton";
import { Switch } from "react-native";

export default function List({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSansLight: require("../../assets/fonts/OpenSans-Light.ttf"),
    });
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState("test")
    const [pins, setPins] = useState([]);
    const [enabledPins, setEnabledPins] = useState([]);
    const [enabledAll, setEnabledAll] = useState(false)

    useEffect(() => {
        Location.requestForegroundPermissionsAsync();
    }, []);

    useEffect(() => {
        getData();
        console.log(pins);
    }, [processing]);

    useEffect(() => {
        setMessage("")
    }, [enabledPins])

    const saveLocation = async () => {
        setProcessing(true);
        let pos = await Location.getCurrentPositionAsync();
        await AsyncStorage.setItem(
            pos.timestamp.toString(),
            JSON.stringify({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            })
        );
        setProcessing(false);
    };

    const clearData = async () => {
        setProcessing(true);
        await AsyncStorage.clear();
        setEnabledPins([])
        setProcessing(false);
    };

    const getData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let data = await AsyncStorage.multiGet(keys);
        data = data.map((el) => {
            let date = new Date(parseInt(el[0]));
            return {
                timestamp: el[0],
                date: date.toLocaleString("pl-PL"),
                latitude: JSON.parse(el[1]).latitude,
                longitude: JSON.parse(el[1]).longitude,
            };
        });
        if (processing == false) {
            setPins(data);
        }
    };

    const handleEnabledPin = (data, enabled) => {
        setEnabledPins((prev) => {
            if (enabled) {
                if(!prev.includes(data)) {
                    return [...prev, data];
                }
                return prev
            } else {
                return prev.filter(el => el.timestamp !== data.timestamp);
            }
        });
    };

    const handleMapRedirect = () => {
        if(enabledPins.length == 0) {
            setMessage("No pins were selected!")
        }
        else {
            navigation.navigate("Map", enabledPins)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#52489C" }}>
            {fontsLoaded ? (
                <View style={style.main}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Main", {})}
                        >
                            <Image
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: 10,
                                }}
                                source={require("../../assets/back-button.png")}
                            ></Image>
                        </TouchableOpacity>
                        <Text
                            style={[
                                style.defaultText,
                                {
                                    fontFamily: "OpenSansBold",
                                    fontSize: 32,
                                },
                            ]}
                        >
                            Position Manager
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                        }}
                    >
                        <MyButton
                            text={"Save position"}
                            bgColor={"#F5EBFF"}
                            fgColor={"#52489C"}
                            onPress={saveLocation}
                        />
                        {processing ? (
                            <ActivityIndicator color={"#F5EBFF"} size={30} />
                        ) : (
                            ""
                        )}
                        <MyButton
                            text={"Clear data"}
                            bgColor={"#F5EBFF"}
                            fgColor={"#52489C"}
                            onPress={clearData}
                        />
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Text
                            style={[
                                { fontWeight: 500, fontSize: 26 },
                                style.defaultText,
                            ]}
                        >
                            Select all
                        </Text>
                        <Switch value={enabledAll} onValueChange={() => {setEnabledAll((prev) => !prev);}}/>
                    </View>
                    <View style={style.horizontal}></View>
                    <FlatList
                        data={pins}
                        extraData={enabledAll}
                        renderItem={({ item }) => (
                            <ListItem
                                timestamp={item.timestamp}
                                date={item.date}
                                latitude={item.latitude}
                                longitude={item.longitude}
                                handleEnabledPin={handleEnabledPin}
                                enabledAll={enabledAll}
                            />
                        )}
                        keyExtractor={(item) => item.timestamp}
                    />
                    <View style={{ marginBottom: 40, marginTop: 10 }}>
                        <Text style={[{textAlign: 'center'}, style.mutedText]}>{message}</Text>
                        <MyButton
                            text={"Show on map"}
                            bgColor={"#F5EBFF"}
                            fgColor={"#52489C"}
                            onPress={handleMapRedirect}
                        />
                    </View>
                </View>
            ) : (
                <Text>Failded to load fonts!</Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30,
    },
    defaultText: {
        color: "#F5EBFF",
    },
    mutedText: {
        color: "#8A7EB2",
    },
    horizontal: {
        width: "80%",
        height: 1,
        backgroundColor: "#F5EBFF",
    },
});
