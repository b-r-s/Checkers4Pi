import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useSettings } from '@ai-checkers/shared';

// Stub types for Pi Network on mobile
interface PiUser {
  username: string;
  piBalance: number;
}

// Stub for Pi Network on mobile - will be implemented via backend API later
const usePiNetworkStub = () => ({
  isAuthenticated: false,
  user: null as PiUser | null,
  authenticate: () => {
    console.log('Pi Network authentication not yet implemented on mobile. Will use backend API.');
  }
});

export const OptionsScreen = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { isAuthenticated, user, authenticate } = usePiNetworkStub();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Options</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pi Network</Text>
        {!isAuthenticated ? (
          <TouchableOpacity style={styles.authButton} onPress={authenticate}>
            <Text style={styles.authButtonText}>Connect Pi Wallet (Coming Soon)</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.authStatus}>
            <Text style={styles.authText}>Connected as: {user?.username}</Text>
            <Text style={styles.authSubtext}>Pi Balance: {user?.piBalance || '0'} π</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Difficulty</Text>
        <View style={styles.buttonGroup}>
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.button,
                settings.difficulty === level && styles.buttonActive
              ]}
              onPress={() => updateSettings({ difficulty: level })}
            >
              <Text style={[
                styles.buttonText,
                settings.difficulty === level && styles.buttonTextActive
              ]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Sound Effects</Text>
          <Switch
            value={settings.soundEnabled}
            onValueChange={(value) => updateSettings({ soundEnabled: value })}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Show Hints</Text>
          <Switch
            value={settings.showHints}
            onValueChange={(value) => updateSettings({ showHints: value })}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
          <Text style={styles.resetButtonText}>Reset to Defaults</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  buttonTextActive: {
    color: '#fff',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authButton: {
    backgroundColor: '#6B46C1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authStatus: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  authText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  authSubtext: {
    fontSize: 14,
    color: '#666',
  },
});