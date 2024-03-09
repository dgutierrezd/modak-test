import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import axios from "axios";
import EventCard from "../../components/EventCard";
import { IEvent } from "../../interfaces/Event";
import { ART_LOGO, FAVORITES_STORAGE_ID } from "../../utils/constants";
import { MyContext } from "../../../App";

const MainScreen = () => {
    const contextValue = useContext(MyContext);

    const [events, setEvents] = useState<IEvent[]>([]);
    const [favoriteEvents, setFavoriteEvents] = useState<any[]>(contextValue.favorites);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

    useEffect(() => {
        setFavoriteEvents(contextValue.favorites);
    }, [contextValue]);

    const fetchEvents = () => {
        setLoadingEvents(true);
        axios.get(`https://api.artic.edu/api/v1/events?page=${currentPage}`).then(res => {
            const newEvents = events?.length ? [...events, res?.data?.data] : res?.data?.data;
            setEvents(newEvents?.flat());
            setCurrentPage(currentPage + 1);
            setLoadingEvents(false);
            setTotalPages(res?.data?.pagination?.total_pages)
        });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

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
                        source={{ uri: ART_LOGO }}
                    />
                </View>
                <ScrollView
                    style={{ paddingTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent) && !loadingEvents && totalPages > currentPage) {
                            fetchEvents();
                        }
                    }}
                    scrollEventThrottle={400}
                >
                    {events?.map((e: IEvent) => {
                        return (
                            <EventCard
                                key={e.id}
                                event={{ ...e, isFavorite: favoriteEvents?.find(f => f === e.id) }}
                            />
                        )
                    })}
                    {loadingEvents && <ActivityIndicator />}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;
