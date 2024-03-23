import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "../src/Dashboard";
import Pickup from "../src/PickUp";
import Destenation from "../src/Destenation";
import SelectRide from "../src/SelectRide";
import RideHistory from "../src/RideHistory";
import SignUp from "../src/Authencation/SignUp";
import Login from "../src/Authencation/Login";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Signup/login" component={Auth} />
        <Drawer.Screen name="Dashboard" component={MainComponents} />
        <Drawer.Screen name="Ride History" component={Ride_History} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function MainComponents() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="PickUp" component={Pickup} />
      <Stack.Screen name="Destenation" component={Destenation} />
      <Stack.Screen name="SelectRide" component={SelectRide} />
    </Stack.Navigator>
  );
}

function Ride_History() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RideHistory" component={RideHistory} />
    </Stack.Navigator>
  );
}
