import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import axios from "axios";
import EventCard from "../../components/EventCard";
import { IEvent } from "../../interfaces/Event";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITES_STORAGE_ID } from "../../utils/constants";

const MainScreen = () => {
    const [events, setEvents] = useState([]);
    const [favoriteEvents, setFavoriteEvents] = useState<any[]>([]);

    useEffect(() => {
        axios.get('https://api.artic.edu/api/v1/events').then(res => setEvents(res?.data?.data))
        AsyncStorage.getItem(FAVORITES_STORAGE_ID).then(res => {
            console.log(res);
            setFavoriteEvents(res ? JSON.parse(res) : []);
        })
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 10,
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>Events</Text>
                    <FastImage
                        style={{ width: 40, height: 40 }}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Art_Institute_of_Chicago_logo.svg/2048px-Art_Institute_of_Chicago_logo.svg.png' }}
                    />
                </View>
                <ScrollView style={{ paddingTop: 10 }} showsVerticalScrollIndicator={false}>
                    {events?.map((e: IEvent) => (
                        <EventCard
                            favoriteEvents={favoriteEvents}
                            setFavoriteEvents={setFavoriteEvents}
                            key={e.id}
                            event={{ ...e, isFavorite: favoriteEvents?.find(f => f === e.id) }}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;
