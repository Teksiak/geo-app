import { View, Text, Image, Switch, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function ListItem({ timestamp, date, latitude, longitude, handleEnabledPin, enabledAll }) {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        handleEnabledPin({timestamp: timestamp, latitude: latitude, longitude: longitude}, enabled)
    }, [enabled])

    useEffect(() => {
        setEnabled(enabledAll)
    }, [enabledAll])

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                marginVertical: 10,
            }}
        >
            <Image
                style={{ width: 40, height: 53 }}
                source={require("../assets/geoalt.png")}
            />
            <View style={{ display: "flex", flexDirection: "column" }}>
                <Text
                    style={[
                        { fontWeight: 600, fontSize: 16 },
                        style.defaultText,
                    ]}
                >
                    {date}
                </Text>
                <Text style={style.mutedText}>Latitude: {latitude}</Text>
                <Text style={style.mutedText}>longitude: {longitude}</Text>
            </View>
            <Switch
                trackColor={{ false: "#8A7EB2", true: "#F5EBFF" }}
                thumbColor={enabled ? "#8A7EB2" : "#f4f3f4"}
                onValueChange={() => {
                    setEnabled((prev) => !prev);
                }}
                value={enabled}
            />
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
