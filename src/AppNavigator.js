import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Main from "./Main"
import ProductDetail from "./screens/ProductDetail"
import Card from './screens/Card'
import Signin from "./screens/Signin"
import Signup from "./screens/Signup"
import Checkout from "./screens/Checkout"
import Addresses from "./screens/Addresses"
import AddAddress from "./screens/AddAddress"
import EditProfile from "./screens/EditProfile"
import Splash from "./screens/Splash"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
                <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
                <Stack.Screen name="Card" component={Card} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={Checkout} options={{headerShown:false}} />
                <Stack.Screen name="Addresses" component={Addresses} options={{headerShown:false}}/>
                <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown:false}} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
