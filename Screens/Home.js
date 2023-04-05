import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, useState, TouchableOpacity} from 'react-native';
import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AddTask from './AddTask';


const _COLOR = '#00ADB5'

const Home = () => {
    const navigation = useNavigation();

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
            id: 1,
            title: 'Business',
          },
          {
            id: 2,
            title: 'Personal',
          },
      ];
      
      const Item = ({title}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
      const handleAddTaskPress = () => {
        navigation.navigate('AddTask');
      };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
                <Text style={styles.header}>What's up, Joy!</Text>
                <Text style={styles.headerTitle}>CATEGORIES</Text>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <Item title={item.title} />}
                    keyExtractor={item => item.id.toString} horizontal={true}
            />
            <Text style={styles.headerInfo}>TODAY'S TASK</Text>
            <TouchableOpacity style={styles.plusIcon} onPress={handleAddTaskPress}>
                <Icon name='plus' size={25} color='#00ADB5'/>
            </TouchableOpacity>
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
    },
    headerTitle: {
        fontSize: 15,
        padding: 20
    },
    item: {
        width: Dimensions.get('screen').width/2.5,
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        height: 100
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
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