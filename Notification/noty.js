import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Mobile_FlashCard = 'Mobile_Flashcard_key:notifications';

export function clearLocalNotification(){
    return AsyncStorage.removeItem(Mobile_FlashCard).then(
        Notifications.cancelAllScheduledNotificationsAsync
    ).catch(err => console.log(err));
}
export function setLocalNotification() {
    AsyncStorage.getItem(Mobile_FlashCard).then(JSON.parse).then((data) => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                if(status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync();
                    let tomorrow = new Date()
                    console.log('test')
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)

                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: "FlashCard",
                            body: "Don't forget to study today",
                        },
                        trigger: tomorrow
                    })
                    AsyncStorage.setItem(Mobile_FlashCard, JSON.stringify(true))
                }
            }).catch(err => console.log(err))
        }
    }).catch(err => console.log(err))
}

