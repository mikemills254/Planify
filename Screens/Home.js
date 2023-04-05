import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';


const _COLOR = '#00ADB5'


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

const Home = () => {
    const DATA = [
        {
          id: 1,
          title: 'Business',
        },
        {
          id: 2,
          title: 'Personal',
        },
        {
            id: 3,
            title: 'School',
        },
        {
        id: 4,
        title: 'Home',
        },
    ];
    
    const Item = ({title}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} contentContainerStyle={{flex: 1}}>
                <Text style={styles.header}><Greeting/></Text>
                <Text style={styles.headerTitle}>CATEGORIES</Text>
                <View>
                    <FlatList
                        data={DATA}
                        renderItem={({item}) => <Item title={item.title} />}
                        keyExtractor={item => item.id.toString} 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        />
                </View>
                
                <Text style={styles.headerInfo}>TODAY'S TASK</Text>
            
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
                onPress={() => {console.log('Clicked')}}
                >
                <Icon name='plus' color='white' size={30}/>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    }

export default Home

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
        justifyContent: 'center',
        backgroundColor: '#c0c0c0',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
        height:Dimensions.get('screen').height * 0.09,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00ADB5'
    },
    title: {
        fontSize: 15,
        fontWeight: 400,
        color: '#003133'
    },
    headerInfo: {
        fontSize: 15,
        padding: 20,
    },
    plusIcon: {
        position: 'absolute',
        right: 20,
        bottom: 0,
    }
})