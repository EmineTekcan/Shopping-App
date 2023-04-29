import { Provider } from 'react-redux';
import AppNavigator from './src/AppNavigator';
import 'react-native-gesture-handler';
import store from './src/redux/store';


export default function App() {
  return <Provider store={store}>
    <AppNavigator/>
  </Provider>
}

