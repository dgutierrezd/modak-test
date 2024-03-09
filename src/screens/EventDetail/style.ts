import { StyleSheet } from "react-native";

export const EventDetailStyles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: 'white' },
    closeButton: { padding: 3, position: 'absolute', top: 10, left: 10, zIndex: 10 },
    image: {
        width: '100%', height: 300,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    scrollContainer: { height: '100%', backgroundColor: 'transparent' },
    detailsContainer: {
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 285,
        bottom: 0,
        zIndex: 20,
        padding: 20,
        paddingBottom: 70
    },
    title: { fontSize: 20, fontWeight: '600' },
    location: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    date: { flexDirection: 'row', alignItems: 'center' },
    programTitlesContainer: { flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', marginTop: 30 },
    programTitle: { fontSize: 14, color: 'gray' },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingHorizontal: 20,
        shadowOpacity: 0.2
    },
});