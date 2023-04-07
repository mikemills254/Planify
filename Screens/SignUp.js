import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'
import Ionic from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { auth, Db } from  '../Components/FireBaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Socials = () => {
    return(
        <View style={{flexDirection: 'row', marginVertical: 20, marginHorizontal: '10%'}}>
            <Button
                
                type='SECONDARY'
                fgColor="#DD4D44"
                bgColor= "#FAE9EA"
                Icon='logo-google'
            />
            <Button
                Icon='logo-facebook' 
                type='SECONDARY'
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
        </View>
    )
}


const SignUp = ({navigation}) => {
    const Navigation = useNavigation()
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword]  =useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toogleEye =() => {
        setShowPassword(!showPassword);
    }
    const onTermsOfUsePressed = () => {
        console.warn("Terms Of use")
    }
    const onPrivatePolicyPressed = () => {
        console.warn("Private Policy")
    }
const OnSignUpPress = async () => {
    try {
        const UserCred = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password,
        Username
        );
        const user = UserCred.user;
        const email = user.email;
        const UserToken = user.uid;
        const UserAccess = user.getIdToken()
        await AsyncStorage.setItem('UserEmail', email);
        await AsyncStorage.setItem('UserToken', UserToken);
        await AsyncStorage.setItem('UserAccess', JSON.stringify(UserAccess));

    
        const docRef = doc(collection(Db, 'User'), user.uid);
        await setDoc(docRef, {
        Username: Username,
        EmailAddress: Email,
        Password: Password,
        });
        navigation.navigate('AppScreen');
    } catch (error) {
        Alert.alert('Alert Title', 'Incorrect Credetials', [
        {
            text: 'Ok',
        },
        ]);
        console.log(error);
    }
    };
    

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView style={styles.Container}>
            <View style={styles.Icon}>
                <Ionic name='check-circle' size={100} color='#00ADB5'/>
            </View>
            <Input
                placeholder='UserName'
                value={Username}
                onChangeText={fname => setUsername(fname)}
            />
            <Input
                placeholder='Email Address..'
                value={Email}
                onChangeText={email => setEmail(email)}
            />
            <Input
                placeholder='Password..'
                value={Password}
                onChangeText={password => setPassword(password)}
                secureTextEntry={!showPassword}
                Icon={showPassword ? 'eye' : 'eye-off'}
                onPress={toogleEye}
            />
            <Button
                text='REGISTER'
                onPress={() => {OnSignUpPress()}}
            />
            <Text style={{color: "gray", fontSize: 15, marginVertical: 10, marginHorizontal: 20}}>
                    By registering, confirm that you accept out
                    <Text style={{color: "#FDB075"}} onPress={onTermsOfUsePressed}> terms of use</Text> and
                    <Text style={{color: "#FDB075"}} onPress={onPrivatePolicyPressed}> privacy policy</Text>
                </Text>
                <Socials/>
                <Button
                    type='TERTIARY'
                    text='Have an Account? Login'
                    onPress={() => {
                        Navigation.navigate('Login')
                    }}
                />
                
        </SafeAreaView> 
        </ScrollView>       
    )
}

export default SignUp

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    ScrollView: {
        backgroundColor: 'red',
        height: '100%'
    },
    Icon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        // marginBottom: 5
    },
    DropDownSelect: {
        borderWidth: 1,
        borderColor: '#00ADB5',
        width: '80%',
        marginHorizontal: '10%',
        borderRadius: 5,
        marginVertical: 5
    },
    placeholder: {
        color: 'gray'
    },
    DropStyle: {
        backgroundColor: '#fff',
        marginTop: 2,
        width: '80%',
        marginHorizontal: '10%',
        borderRadius: 5,
        borderColor: '#00ADB5',
    },
    
})