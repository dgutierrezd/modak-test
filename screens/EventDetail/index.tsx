import React, { useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, Dimensions, ImageBackground, NativeModules, Pressable, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import RenderHTML from "react-native-render-html";

const { CalendarManager } = NativeModules;

const EventDetail = ({ route }: any) => {
    const { event } = route.params;
    const { image_url, title, description, location, date_display, start_date, end_date, start_time, end_time } = event;

    const [isFavorite, setIsFavorite] = useState(event?.isFavorite);
    const [animation, setAnimation] = useState(null);
    const [loadingSchedule, setLoadingSchedule] = useState(false);
    const [responseSchedule, setResponseSchedule] = useState('');

    const navigation = useNavigation();

    const width = Dimensions.get('screen').width;

    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        if (isFavorite) {
            animation?.play();
        } else animation?.reset();
    }, [isFavorite, animation]);

    const toggleStatus = () => {
        setIsFavorite(!isFavorite);
    };

    const resetSchedule = () => {
        setTimeout(() => {
            setLoadingSchedule(false);
            setResponseSchedule('');
        }, 3000);
    }

    const onSchedule = () => {
        setLoadingSchedule(true);
        const splitStartTime = start_time?.split(':');
        const splitEndTime = end_time?.split(':');

        const startDate = new Date(start_date).setHours(splitStartTime[0], splitStartTime[1]);
        const endDate =  new Date(end_date).setHours(splitEndTime[0], splitEndTime[1]);

        CalendarManager.addEvent(title, startDate, endDate)
            .then(() => {
                setLoadingSchedule(false);
                setResponseSchedule('success');
                resetSchedule();
            })
            .catch(() => {
                setLoadingSchedule(false);
                setResponseSchedule('error');
                resetSchedule();
            });
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <Pressable style={{ padding: 3, position: 'absolute', top: 10, left: 10, zIndex: 10 }} onPress={goBack}>
                    <Icon name="window-close" color="black" size={26} />
                </Pressable>
                <ImageBackground
                    source={{ uri: image_url }}
                    style={{
                        width: '100%', height: 300,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                    resizeMode='stretch'
                />
                <ScrollView style={{ height: '100%', backgroundColor: 'transparent' }} showsVerticalScrollIndicator={false}>
                    <View style={{ height: '100%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 285, bottom: 0, zIndex: 20, padding: 20, paddingBottom: 70 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>{title}</Text>
                        <RenderHTML
                            contentWidth={width}
                            source={{ html: description }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                            <MIcon name="place" size={24} color='blue' />
                            <Text>{location}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="calendar" size={24} color='blue' />
                            <Text>{date_display}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', marginTop: 30 }}>
                            {event.program_titles?.map((p: string, index, { length }) => (
                                <Text style={{ fontSize: 14, color: 'gray' }} key={index}>{p} {index + 1 !== length ? '·' : ''} </Text>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', height: 60, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', paddingHorizontal: 20, shadowOpacity: 0.2 }}>
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
