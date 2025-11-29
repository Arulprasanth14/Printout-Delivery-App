import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryPage from './app/(tabs)'; // Your EntryPage
import UserRegistration from './app/(tabs)/user_registration'; // Your target screen
import { UserProvider } from './context/userContext'; // Import the UserProvider

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EntryPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="EntryPage" component={EntryPage} />
          <Stack.Screen name="UserRegistration" component={UserRegistration} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    
  );
}
