import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "./screens/HomeScreen"
import Signin from "./screens/Signin"

const Drawer = createDrawerNavigator()

const Main = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
      name="SignIn"
      component={Signin}
      />
    </Drawer.Navigator>
  )
}

export default Main

