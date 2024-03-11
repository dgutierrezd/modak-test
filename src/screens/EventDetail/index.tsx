import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, Alert, Dimensions, ImageBackground, NativeModules, Pressable, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import RenderHTML from "react-native-render-html";
import { MyContext } from "../../../App";
import { ART_LOGO } from "../../utils/constants";
import PushNotification from "react-native-push-notification";
import { EventDetailStyles } from "./style";

const { CalendarManager } = NativeModules;

const EventDetail = ({ route }: any) => {
    const { event } = route.params;
    const { image_url, title, description, location, date_display, start_date, end_date, start_time, end_time } = event;
    const contextValue = useContext(MyContext);

    const [isFavorite, setIsFavorite] = useState(event?.isFavorite);
    const [animation, setAnimation] = useState(null);
    const [loadingSchedule, setLoadingSchedule] = useState(false);
    const [responseSchedule, setResponseSchedule] = useState('');
    const [showClose, setShowClose] = useState(true);

    const navigation = useNavigation();

    const width = Dimensions.get('screen').width;

    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        const savedItem = contextValue.saved?.find(s => s === event.id);
        if (savedItem) setResponseSchedule('success');
    }, [contextValue]);

    useEffect(() => {
        if (isFavorite) {
            animation?.play();
        } else animation?.reset();
    }, [isFavorite, animation]);

    const toggleStatus = async () => {
        contextValue.onChangeFavorites(event.id, isFavorite);
        setIsFavorite(!isFavorite);
    };

    const resetSchedule = () => {
        setTimeout(() => {
            setLoadingSchedule(false);
            setResponseSchedule('');
        }, 3000);
    }

    const splitStartTime = start_time?.split(':');
    const splitEndTime = end_time?.split(':');

    const startDate = new Date(start_date).setHours(splitStartTime[0], splitStartTime[1]);
    const endDate = new Date(end_date).setHours(splitEndTime[0], splitEndTime[1]);

    const onScheduleNotification = () => {
        const ssDate = new Date(startDate)
        const dateScheduleEvent = new Date(ssDate.setMinutes(ssDate.getMinutes() - 30))
        PushNotification.localNotificationSchedule({
            title: 'Remember',
            message: `${title} at ${start_time}`,
            date: dateScheduleEvent,
            picture: image_url || ART_LOGO,
        });
    }

    const onSchedule = () => {
        if (responseSchedule !== 'success') {
            setLoadingSchedule(true);

            CalendarManager.addEvent(title, startDate, endDate)
                .then(() => {
                    onScheduleNotification();
                    setLoadingSchedule(false);
                    setResponseSchedule('success');
                    contextValue.onScheduleEvent(event.id);
                    Alert.alert("Event added successfully");
                })
                .catch(() => {
                    setLoadingSchedule(false);
                    setResponseSchedule('error');
                    resetSchedule();
                });
        }
    }

    const onScroll = (e) => {
        const offsetY = e.nativeEvent.contentOffset.y;

        if (offsetY > 225) setShowClose(false)
        else setShowClose(true)
    }

    return (
        <SafeAreaView style={EventDetailStyles.safeContainer}>
            <View>
                {showClose &&
                    <Pressable style={EventDetailStyles.closeButton} onPress={goBack}>
                        <Icon name="window-close" color="black" size={26} />
                    </Pressable>
                }
                <ImageBackground
                    source={{ uri: image_url || ART_LOGO }}
                    style={EventDetailStyles.image}
                    resizeMode='stretch'
                />
                <ScrollView style={EventDetailStyles.scrollContainer} showsVerticalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16}>
                    <View style={EventDetailStyles.detailsContainer}>
                        <Text style={EventDetailStyles.title}>{title}</Text>
                        <RenderHTML
                            contentWidth={width}
                            source={{ html: description }}
                        />
                        {location && (
                            <View style={EventDetailStyles.location}>
                                <MIcon name="place" size={24} color='blue' />
                                <Text>{location}</Text>
                            </View>
                        )}
                        <View style={EventDetailStyles.date}>
                            <Icon name="calendar" size={24} color='blue' />
                            <Text>{date_display || new Date(startDate).toLocaleString("en-US")}</Text>
                        </View>
                        <View style={EventDetailStyles.programTitlesContainer}>
                            {event.program_titles?.map((p: string, index, { length }) => (
                                <Text style={EventDetailStyles.programTitle} key={index}>{p} {index + 1 !== length ? '·' : ''} </Text>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                <View style={EventDetailStyles.bottomContainer}>
                    <Pressable
                        style={{ backgroundColor: responseSchedule === 'success' ? 'green' : responseSchedule === 'error' ? 'red' : 'blue', borderRadius: 10, padding: 12, width: 200, alignItems: 'center' }}
                        onPress={onSchedule}
                    >
                        {loadingSchedule ?
                            <ActivityIndicator color="white" />
                            : responseSchedule === 'success' ?
                                <Icon name="check" size={16} color="white" />
                                : responseSchedule === 'error' ?
                                    <Icon name="window-close" size={16} color="white" /> :
                                    <Text style={{ color: 'white' }}>Schedule to calendar</Text>
                        }
                    </Pressable>
                    <TouchableOpacity onPress={toggleStatus}>
                        <LottieView
                            autoPlay={false}
                            loop={false}
                            resizeMode="contain"
                            style={{ width: 60, height: 60 }}
                            ref={(animation: any) => setAnimation(animation)}
                            source={require("../../utils/lottie/heart.json")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default EventDetail;
