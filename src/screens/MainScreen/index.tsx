import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import axios from "axios";
import Icon from 'react-native-vector-icons/Octicons'
import EventCard from "../../components/EventCard";
import { IEvent } from "../../interfaces/Event";
import { ART_LOGO } from "../../utils/constants";
import { MyContext } from "../../../App";
import { MainViewStyles } from "./style";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
    const contextValue = useContext(MyContext);

    const [events, setEvents] = useState<IEvent[]>([]);
    const [favoriteEvents, setFavoriteEvents] = useState<any[]>(contextValue.favorites);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

    const navigation: any = useNavigation();

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

    const goToFavorites = () => {
        navigation.navigate("Favorites");
    }

    return (
        <SafeAreaView style={MainViewStyles.safeContainer}>
            <View style={MainViewStyles.containerHorizontal}>
                <View style={MainViewStyles.header}>
                    <Text style={MainViewStyles.title}>Events</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable style={{ padding: 3 }} onPress={goToFavorites}>
                            <Icon name="heart-fill" size={24} color="#575757" />
                        </Pressable>
                        <FastImage
                            style={MainViewStyles.logo}
                            source={{ uri: ART_LOGO }}
                        />
                    </View>
                </View>
                <ScrollView
                    style={MainViewStyles.scrollContainer}
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
