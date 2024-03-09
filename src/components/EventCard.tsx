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
            style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: 'white'
            }}>
            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, opacity: 10, backgroundColor: 'rgba(255,255,255, 0.8)', borderTopRightRadius: 10 }} onPress={toggleStatus}>
                <LottieView
                    autoPlay={false}
                    loop={false}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                    ref={(animation: any) => setAnimation(animation)}
                    source={require("../utils/lottie/heart.json")}
                />
            </TouchableOpacity>
            <FastImage
                source={{ uri: event.image_url || ART_LOGO }}
                style={{ width: '100%', height: 110, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                resizeMode='cover'
            />
            <View style={{ padding: 5 }}>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>{event.title}</Text>
                <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap' }}>
                    {event.program_titles?.map((p: string, index, { length }) => (
                        <Text style={{ fontSize: 12, color: 'gray' }} key={index}>{p} {index + 1 !== length ? '·' : ''} </Text>
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
