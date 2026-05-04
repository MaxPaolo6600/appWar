import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Game from "./screen/Game";
import Batalha from "./screen/Batalha"
import TelaJogadores from "./screen/TelaJogadores";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="TelaJogadores" component={TelaJogadores}/>
        <Stack.Screen name="Game" component={Game}/>
        <Stack.Screen name="Batalha" component={Batalha}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}