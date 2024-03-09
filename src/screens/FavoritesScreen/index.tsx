import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Octicons";
import { MyContext } from "../../../App";
import EventCard from "../../components/EventCard";
import { IEvent } from "../../interfaces/Event";
import { MainViewStyles } from "../MainScreen/style";

const FavoritesScreen = () => {
    const contextValue = useContext(MyContext);

    const [events, setEvents] = useState<IEvent[]>([]);
    const [favoriteEvents, setFavoriteEvents] = useState<any[]>(contextValue.favorites);

    const navigation: any = useNavigation();

    useEffect(() => {
        setFavoriteEvents(contextValue.favorites);
    }, [contextValue]);

    useEffect(() => {
        axios.get(`https://api.artic.edu/api/v1/events?ids=${favoriteEvents?.join(',')}`).then(res => {
            setEvents(res?.data?.data);
        });
    }, []);

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={MainViewStyles.safeContainer}>
            <View style={MainViewStyles.containerHorizontal}>
                <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
                    <Pressable style={{ padding: 3, marginRight: 10 }} onPress={goBack}>
                        <Icon name="arrow-left" size={28} />
                    </Pressable>
                    <Text style={MainViewStyles.title}>Favorites</Text>
                </View>
                <ScrollView
                    style={MainViewStyles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {events?.map((e: IEvent) => {
                        return (
                            <EventCard
                                key={e.id}
                                event={{ ...e, isFavorite: favoriteEvents?.find(f => f === e.id) }}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default FavoritesScreen;
