import React, {useState} from "react";
import {View, Text,TextInput, StyleSheet} from 'react-native';
import Input from "../Components/Input";
import Button from "../Components/Button";
const AddTask = () => {
    const [newTask, setNewTask] = useState("");
    const handleTask = () => {
        navigation.navigate('Home', { task: newTask });
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter new Task'
                value={newTask}
                onChangeText={setNewTask}
                // style={styles.Input}
            />
            <Button
                text='SAVE'
                type="PRIMARY"
                onPress={() => {handleTask()}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
   
})
export default AddTask;