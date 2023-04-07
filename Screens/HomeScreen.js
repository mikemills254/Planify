import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Pressable, Image,} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Db } from '../Components/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Firestore } from 'firebase/firestore';
import Planify from '../Components/Images/Planify.png'

const _COLOR = '#00ADB5'
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const Greeting = () => {
    const date = new Date();
    const hours = date.getHours();
    let timeNow
if (hours < 12) {
    timeNow = "Good Morning!";
} else if (hours >= 12 && hours < 20) {
    timeNow = "Good Afternoon!";
} else if (hours >= 20 && hours < 24) {
    timeNow = "Good Evening!";
} 
return timeNow ;
}


const HomeScreen = ({navigation}) => {
    const [tasks, setTasks] = useState([])
    const [dateString, setDateString] = useState('');

useEffect(() => {
    const date = new Date();
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    setDateString(formattedDate);
}, []);


    const Size = 15

    useEffect(() => {
        const getUserId = async () => {
        try {
            const userToken = await AsyncStorage.getItem('UserToken');
            const TaskRef = collection(Db, 'Tasks')
            const TasksQuery = query(TaskRef, where('UserId', '==', userToken));
            const Unsubscribe = onSnapshot(TasksQuery, (snapshot) => {
            const TasksList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(TasksList);
            }, (error) => {
            console.log(error);
            });
            return Unsubscribe;
        } catch (error) {
            console.log(error);
        }
        };
        getUserId();
    }, []);

    
    
    const DATA = [
        {
            id: 1,
            title: 'Business',
            icon: <Icon name='briefcase' color='#c1e1ec' size={Size} style={styles.icon}/>,
            number: 5
        },
        {
            id: 2,
            title: 'Personal',
            icon: <Icon name='user' color='#ffd0d7' size={Size} style={styles.icon}/>,
            number: 4

        },
        {
            id: 4,
            title: 'Home',
            icon: <Icon name= 'home' color='#bcf5bc' size={Size} style={styles.icon}/>,
            number: 10

        },
    ];
    
    const Item = ({title, icon, number}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        {icon}
        <Text style={{fontSize: 30, left: 40, bottom: 20}}>{number}</Text>
    </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.header}><Greeting/></Text>
                <View style={styles.TopBar}>
                <Text numberOfLines={2} ellipsizeMode='clip' style={{color:'#27BCA5', textAlign: 'center', maxWidth: 180, fontSize: 20}}>Plan your day and work with ease</Text>
                <Image source={Planify} style={
                    {
                        position: 'absolute',
                        height: 100, 
                        width: 100, 
                        left: '80%',
                        top: '20%'
                    }} resizeMode='cover'/>
                <Text style={
                    {
                        position: 'absolute',
                        top: '95%', 
                        left: '5%',
                        backgroundColor: '#00ADB5', 
                        width: '20%', 
                        textAlign: 'center',
                        padding:5,
                        borderRadius: 50,
                        color: 'white',
                        fontWeight: 500,
                    }}>
                    {dateString}
                </Text>
                </View>
                
                <View style={styles.Taskscontainer}>
                <Text style={styles.headerInfo}>TODAY'S TASK</Text>
                <FlatList 
                    data={tasks}
                    renderItem={({ item }) => (
                        <Pressable style={styles.taskContainer}>
                            <View style={styles.tasksLeft}>
                                <Text style={styles.taskTitle}>{item.Tasks}</Text>
                                <Text style={styles.taskDue}>Due {item.Due}</Text>
                            </View>
                            <View style={styles.taskStatus}>
                                <Icon 
                                    name='trash-2' 
                                    size={15} style={styles.trash} 
                                    onPress={() => {
                                        const taskCollection = collection(Db, 'Tasks')
                                        const taskRef = doc(taskCollection, item.id)
                                        deleteDoc(taskRef)
                                        .then(() => {
                                            console.log('Task deleted successfully')
                                        })
                                        .catch((error) => {
                                            console.log('Error while deleting tasks', error)
                                        })
                                    }}
                                />
                                <Text style={styles.taskStatusText}>{item.Category}</Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    
                />
                </View>
                <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <TouchableOpacity
                style={{
                    backgroundColor: _COLOR,
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => {navigation.navigate('Tasks')}}
                >
                <Icon name='plus' color='white' size={30}/>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
    }

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 15,
        fontSize: 29,
        fontWeight: 'bold',
        color: "#003133"
    },
    headerTitle: {
        fontSize: 15,
        padding: 20
    },
    item: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: '#d3d3d3',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
        height:Dimensions.get('screen').height * 0.1,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#00ADB5'
    },
    icon: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#ededed',
        padding: 5,
        borderRadius: 50
    },
    title: {
        fontSize: 15,
        fontWeight: 400,
        color: '#003133',
        top: 50,
    },
    headerInfo: {
        fontSize: 15,
    },
    plusIcon: {
        position: 'absolute',
        right: 20,
        bottom: 0,
    },
    Taskscontainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        padding: 10
    },
    taskContainer: {
        backgroundColor: '#d4ebf2',
        marginVertical: 5,
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        height: 80,
    },
    taskTitle: {
        fontSize: 15,
        fontWeight: 600,
        maxWidth: '100%',
        color: '#00ADB5',
        margin: 10
        
    },
    tasksLeft: {
        // backgroundColor: 'yellow',
        width: '70%'
    },
    taskDue: {
        position: 'absolute',
        bottom: 2,
        fontSize: 10
    },
    taskStatus: {
        // backgroundColor: 'pink',
        width: '30%'
    },
    trash: {
        position: 'absolute',
        right: 5,
        borderRadius: 50,
        backgroundColor: 'white',
        padding: 5,
        color: '#00ADB5'
    },
    taskStatusText: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        fontSize: 10
    },
    TopBar: {
        backgroundColor: '#d4ebf2',
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        elevation: 10,
        height: windowHeight * 0.22
    }
})