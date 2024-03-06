import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../src/Dashboard";
import Pickup from "../src/PickUp";
import Destenation from "../src/Destenation";
import SelectRide from "../src/SelectRide";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PickUp" component={Pickup} />
        <Stack.Screen name="Destenation" component={Destenation} />
        <Stack.Screen name="SelectRide" component={SelectRide} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
