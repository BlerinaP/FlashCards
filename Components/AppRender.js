import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./Home"
import AddDeck from "./AddDeck"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import DeckDetails from "./DeckDetails";
import AddCard from "./AddCard";
import Constants from 'expo-constants';
import StartQuiz from "./StartQuiz";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreenNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DeckDetails" component={DeckDetails} />
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name="StartQuiz" component={StartQuiz}/>
        </Stack.Navigator>
    )
};

function StatusBarCard({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    );
}

export default function AppRender() {
    return (
        <View style={styles.mainRoute}>
            <StatusBarCard  backgroundColor="darkgray" barStyle="light-content"/>
            <NavigationContainer style={styles.container}>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarIcon: () => {
                        if(route.name === 'Decks'){
                            return <Ionicons name={"book-outline"} size={25}/>
                        } else if (route.name === 'Add Decks'){
                            return <Ionicons name={'add-circle-outline'} size={25}/>
                        }

                    },
                })}
                               tabBarOptions={
                                   {
                                       activeBackgroundColor: 'tomato',
                                       inactiveBackgroundColor: 'white',
                                       activeTintColor: 'white',
                                       inactiveTintColor: 'black',
                                   }
                               }
                >
                    <Tab.Screen name="Decks" component={HomeScreenNavigation}/>
                    <Tab.Screen name="Add Decks" component={AddDeck}/>
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainRoute: {
        flex: 1,
    }
});
