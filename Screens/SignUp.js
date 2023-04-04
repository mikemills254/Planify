import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'
import Ionic from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

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
    const OnRegisterPress = async () => {
    try{
        const UserCred = await createUserWithEmailAndPassword(auth, Email, Password);
        const user = UserCred.user;
        console.log(user.email);
        const Email = user.email

        navigation.replace('AppScreen');
    } catch (error) {
        console.log(error.code, error.message)
    }
    }

    return (
        <View style={styles.Container}>
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
                onPress={() => {console.log('Logged In')}}
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
        </View>        
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