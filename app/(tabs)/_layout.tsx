import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../services/colors";
import { useFonts } from "expo-font";
import { Quantico_400Regular, Quantico_700Bold } from "@expo-google-fonts/quantico";
import { VT323_400Regular } from "@expo-google-fonts/vt323";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function  TabsLayout(){
    const [fontsLoaded, error] = useFonts({
        JetBrainsMonoBold: require('../../assets/fonts/JetBrainsMonoBold.ttf'),
        JetBrainsMonoLight: require('../../assets/fonts/JetBrainsMonoLight.ttf'),
          Quantico_700Bold,
          Quantico_400Regular,
          VT323_400Regular,
      });

      if(!fontsLoaded) {
        return <View >
                  <Text>Loading...</Text>
              </View>
    }

    return(
        
        <Tabs>
            <Tabs.Screen name='(mainStack)'
            options={{
                ...tabOptions,
                tabBarIcon(props) {
                    return  <MaterialIcons name="catching-pokemon" size={props.size} color={props.color} />
                },
                title: 'Pokedex'
             }}/>
            <Tabs.Screen name='favScreen'
            options={{
                ...tabOptions,
                tabBarIcon(props) {
                    return <FontAwesome name="star" size={props.size} color={props.color} />
                },
                title: 'Favorites',
                
             }}/>
        </Tabs>
    )
}
const tabStyle = {
    elevation: 0,
    //elevation: 0,
    borderTopWidth: 0,
    padding: 0,
}

const tabOptions = {
    tabBarStyle: tabStyle,
    headerShown: false,
    tabBarActiveTintColor: COLORS.semiDark,
    tabBarInactiveTintColor: COLORS.gray01,
    tabBarLabelStyle: {
        fontSize: 15, // Change font size here
        fontFamily: 'VT323_400Regular', // Change font family here
    },
}


