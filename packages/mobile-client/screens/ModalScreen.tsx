import { StatusBar } from 'expo-status-bar';
import { Flex, Spinner } from 'native-base';
import { Platform } from 'react-native';

export default function LoadingModal() {
  return (
    <Flex flex="1" align="center" justify="center">
      <Spinner size="lg" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Flex>
  );
}
