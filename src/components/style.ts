import { StyleSheet } from "react-native";

export const EventCardStyles = StyleSheet.create({
    cardContainer: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    heartContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        opacity: 10,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderTopRightRadius: 10
    },
    heart: { width: 40, height: 40 },
    image: {
        width: '100%',
        height: 110,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    detailsContainer: { padding: 5 },
    title: { fontWeight: '500', fontSize: 16 },
    programTitleContainer: { flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap' },
    programTitle: { fontSize: 12, color: 'gray' },
});