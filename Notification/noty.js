import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Mobile_FlashCard = 'Mobile_Flashcard_key:notifications';

export function clearLocalNotification(){
    return AsyncStorage.removeItem(Mobile_FlashCard)
        .then(Notifications.cancelScheduledNotificationAsync())
}
export function createNotification(){
    return{
        title: "FlashCard",
        body: "Don't forget to study today",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}
export function setLocalNotification() {
    AsyncStorage.getItem(Mobile_FlashCard).then(JSON.parse).then((data) => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                if(status === 'granted'){
                    Notifications.cancelScheduledNotificationAsync();
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)
                    Notifications.scheduleNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day'
                        }
                    )
                    AsyncStorage.setItem(Mobile_FlashCard, JSON.stringify(true))
                }
            })
        }
    })
}

