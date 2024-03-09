import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { IEvent } from "../interfaces/Event";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { MyContext } from "../../App";
import { ART_LOGO } from "../utils/constants";
import { EventCardStyles } from "./style";

interface EventCardProps {
    event: IEvent,
}

const EventCard = ({ event }: EventCardProps) => {
    const contextValue = useContext(MyContext);

    const [isFavorite, setIsFavorite] = useState(event.isFavorite);
    const [animation, setAnimation] = useState(null);

    const width = Dimensions.get('screen').width;

    const navigation: any = useNavigation();

    useEffect(() => {
        if (isFavorite) {
            animation?.play();
        } else animation?.reset();
    }, [isFavorite, animation]);

    const toggleStatus = async () => {
        contextValue.onChangeFavorites(event.id, isFavorite);
        setIsFavorite(!isFavorite);
    };

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('EventDetail', {
                    event,
                })
            }}
            style={EventCardStyles.cardContainer}>
            <TouchableOpacity style={EventCardStyles.heartContainer} onPress={toggleStatus}>
                <LottieView
                    autoPlay={false}
                    loop={false}
                    resizeMode="contain"
                    style={EventCardStyles.heart}
                    ref={(animation: any) => setAnimation(animation)}
                    source={require("../utils/lottie/heart.json")}
                />
            </TouchableOpacity>
            <FastImage
                source={{ uri: event.image_url || ART_LOGO }}
                style={EventCardStyles.image}
                resizeMode='cover'
            />
            <View style={EventCardStyles.detailsContainer}>
                <Text style={EventCardStyles.title}>{event.title}</Text>
                <View style={EventCardStyles.programTitleContainer}>
                    {event.program_titles?.map((p: string, index, { length }) => (
                        <Text style={EventCardStyles.programTitle} key={index}>{p} {index + 1 !== length ? '·' : ''} </Text>
                    ))}
                </View>
                <RenderHTML
                    contentWidth={width}
                    source={{ html: event.short_description || '' }}
                />
            </View>
        </Pressable>
    );
};

export default EventCard;
