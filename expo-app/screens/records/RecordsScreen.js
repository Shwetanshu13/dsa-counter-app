import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
import useCounterStore from '../../store/counterStore';

const RecordsScreen = () => {
    const { user } = useAuthStore();
    const { records, getDailyRecords, isLoading } = useCounterStore();

    useFocusEffect(
        React.useCallback(() => {
            if (user?.id) {
                loadRecords();
            }
        }, [user?.id])
    );

    const loadRecords = async () => {
        if (user?.id) {
            await getDailyRecords(user.id);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getTotalProblems = () => {
        return records.reduce((total, record) => total + record.count, 0);
    };

    const getAverageProblems = () => {
        if (records.length === 0) return 0;
        return (getTotalProblems() / records.length).toFixed(1);
    };

    const renderRecord = ({ item, index }) => (
        <View style={styles.recordItem}>
            <View style={styles.recordHeader}>
                <Text style={styles.recordDate}>{formatDate(item.date)}</Text>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                </View>
            </View>
            <Text style={styles.recordSubtitle}>
                {item.count === 1 ? '1 problem solved' : `${item.count} problems solved`}
            </Text>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Records Yet</Text>
            <Text style={styles.emptyText}>
                Start solving problems today! Your daily records will appear here at the end of each day.
            </Text>
        </View>
    );

    const renderStats = () => {
        if (records.length === 0) return null;

        return (
            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Your Progress</Text>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{records.length}</Text>
                        <Text style={styles.statLabel}>Days Active</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{getTotalProblems()}</Text>
                        <Text style={styles.statLabel}>Total Solved</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{getAverageProblems()}</Text>
                        <Text style={styles.statLabel}>Daily Average</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {isLoading && records.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading your records...</Text>
                </View>
            ) : (
                <FlatList
                    data={records.sort((a, b) => new Date(b.date) - new Date(a.date))}
                    renderItem={renderRecord}
                    keyExtractor={(item, index) => `${item.userId}-${item.date}-${index}`}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={renderStats}
                    ListEmptyComponent={renderEmptyState}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={loadRecords}
                            tintColor="#007AFF"
                        />
                    }
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        color: '#6C6C70',
    },
    listContainer: {
        padding: 20,
        gap: 16,
    },
    statsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D1D1F',
        marginBottom: 16,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#6C6C70',
        textAlign: 'center',
    },
    recordItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    recordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    recordDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1F',
        flex: 1,
    },
    countBadge: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 40,
        alignItems: 'center',
    },
    countText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recordSubtitle: {
        fontSize: 14,
        color: '#6C6C70',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 32,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D1D1F',
        marginBottom: 16,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#6C6C70',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default RecordsScreen;
