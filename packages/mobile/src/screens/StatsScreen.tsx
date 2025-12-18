import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStatistics } from '@ai-checkers/shared';

export const StatsScreen = () => {
  const { stats, resetStatistics } = useStatistics();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Game Statistics</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
          <Text style={styles.statLabel}>Games Played</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.gamesWon}</Text>
          <Text style={styles.statLabel}>Games Won</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.gamesLost}</Text>
          <Text style={styles.statLabel}>Games Lost</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.winRate}%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Streaks</Text>
        <View style={styles.streakContainer}>
          <View style={styles.streakItem}>
            <Text style={styles.streakValue}>{stats.currentStreak}</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={styles.streakValue}>{stats.bestStreak}</Text>
            <Text style={styles.streakLabel}>Best Streak</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.performanceContainer}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{stats.averageMoves}</Text>
            <Text style={styles.performanceLabel}>Avg Moves/Game</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{stats.totalMoves}</Text>
            <Text style={styles.performanceLabel}>Total Moves</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Games</Text>
        <View style={styles.recentGames}>
          <Text style={styles.noDataText}>
            {stats.gamesPlayed > 0 ? 'Recent game history coming soon!' : 'No games played yet'}
          </Text>
          <Text style={styles.hintText}>
            {stats.gamesPlayed > 0 ? 'Play more games to see your history here!' : 'Play your first game to see statistics!'}
          </Text>
        </View>
      </View>

      {stats.gamesPlayed > 0 && (
        <View style={styles.section}>
          <TouchableOpacity style={styles.resetButton} onPress={resetStatistics}>
            <Text style={styles.resetButtonText}>Reset Statistics</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    margin: '1%',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28CD41',
    marginBottom: 5,
  },
  streakLabel: {
    fontSize: 14,
    color: '#666',
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 5,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  recentGames: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  hintText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});