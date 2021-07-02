import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppRender from "./Components/AppRender";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from "./Reducers";
import {setLocalNotification} from "./Notification/noty";

export default class App extends React.Component{
    componentDidMount() {
        setLocalNotification()
    }
    render(){
        return (
            <Provider store={createStore(reducer, applyMiddleware(thunk))}>
                <AppRender/>
            </Provider>
        );
    }

}


