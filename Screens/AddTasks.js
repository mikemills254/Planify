import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, Alert, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from  'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Button from '../Components/Button'
import { addDoc, collection } from 'firebase/firestore'
import { Db } from '../Components/FireBaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment/moment'
import { windowHeight, windowWidth } from './HomeScreen'

const DropDownSelect = ({Option, setOption}) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] =useState([
        {label: 'Personal', value: 'Personal'},
        {label: 'Business', value: 'Business'},
        {label: 'Family', value: 'Family'},
    ])

    return(
        <DropDownPicker
            open={open}
            value={Option}
            items={items}
            setOpen={setOpen}
            setValue={setOption}
            setItems={setItems}
            placeholder='Category'
            style={styles.categoryInput}
            placeholderStyle={styles.placeholder}
            dropDownContainerStyle={styles.taskInput}
            zIndex={1000}
            // dropDownDirection='TOP'
        />
        
    )
}

const AddTasks = ({navigation}) => {
    const [taskName, setTaskName] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [category, setCategory] = useState('Default')
    const [userId, setUserId] = useState('')

    const handleSave = (date) => {
        setTaskDate(date.toISOString().slice(0, 10))
        setIsVisible(false)
    }

    const auth = getAuth()

    useEffect(() => {
        const GetUserId = async () => {
            const token = await AsyncStorage.getItem('UserToken')
            setUserId(token)
        };

        GetUserId();
    })

const OnsavePressed = () => {
    var date = moment()
    .local()
    .format('DD/MM/YYYY HH:mm')

    addDoc(collection(Db, 'Tasks'), {
        Tasks: taskName,
        Due: taskDate,
        Category: category,
        UserId: userId,
        time: date
    })
        .then(() => {
        Alert.alert('Success', 'Successfully Added', [
            {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
            },
        ]);
        setTaskName('');
        setCategory('');
        setTaskDate('');
        })
        .catch((error) => {
        Alert.alert('Error', 'Error while saving', [
            {
            text: 'OK',
            },
        ]);
        console.log(error);
        });
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.newTask}>
                <Text style={{fontSize: 15, fontWeight: 500}}>What is to be done?</Text>
                <TextInput
                    placeholder='Enter new task'
                    value={taskName}
                    onChangeText={(text) => {setTaskName(text)}}
                    style={styles.taskInput}
                />
            </View>
            <View style={styles.newDate}>
                <Text style={{fontSize: 15, fontWeight: 500}}>Due Date.</Text>
                <TextInput
                    placeholder='Select Date'
                    value={taskDate}
                    onChangeText={(text) => {setTaskDate(text)}}
                    style={styles.taskInput}
                    onFocus={() => setIsVisible(true)}
                />
                <Icon
                    name='calendar' 
                    color='#00ADB5' 
                    size={20}
                    style={{position: 'absolute', top: 40, right: 15}} 
                    onPress={() => setIsVisible(true)}
                />
                <DateTimePicker
                    mode='date'
                    isVisible={isVisible}
                    onCancel={() => setIsVisible(false)}
                    onConfirm={handleSave}
                />
            </View>
            <View style={styles.newTask}>
                <Text style={{fontSize: 15, fontWeight: 600}}>Add to List</Text>
                <DropDownSelect 
                    Option={category} 
                    setOption={setCategory}
                    />
            </View>
            <View style={
                {
                    marginVertical: windowHeight*0.1,
                    width: '100%', 
                    zIndex: -1}}>
                <Button 
                    text="SAVE"
                    onPress={OnsavePressed}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddTasks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    newTask: {
        // backgroundColor: 'red',
        padding: 10
    },
    taskInput: {
        borderBottomWidth: 2,
        borderColor: '#00ADB5',
        padding: 5
    },
    newDate: {
        padding: 10,
        marginVertical: 50
    },
    category: {
        padding: 5
    },
    categoryInput: {
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 2,
        borderColor: '#00ADB5',

    }
})
