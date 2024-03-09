import { StyleSheet } from "react-native";

export const MainViewStyles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#e5e5e5' },
    containerHorizontal: { paddingHorizontal: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    title: { fontSize: 24, fontWeight: '600' },
    logo: { width: 40, height: 40, marginLeft: 20 },
    scrollContainer: { paddingTop: 10 },
})