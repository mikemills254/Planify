import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'
import Ionic from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const Navigation = useNavigation()

    const [Email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toogleEye =() => {
        setShowPassword(!showPassword);
    }

    return (
        <View style={styles.Container}>
        <View style={styles.Icon}>
            <Ionic name='check-circle' size={100} color='#00ADB5'/>
        </View>
        <Input
            placeholder='Email Address...'
            value={Email}
            onChangeText={email => setEmail(email)}
        />
        <Input
            placeholder='Password...'
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry={!showPassword}
            Icon={showPassword ? 'eye' : 'eye-off'}
            onPress={toogleEye}
        />
        <Button
            text='LOGIN'
            onPress={() => {
            Navigation.replace('AppScreen')
            }}
        />
        <Button
            text='Forgot Password?'
            type='TERTIARY'
            onPress={() => {
            Navigation.navigate('Forget')
            }}
        />
        <Button
            text='----------or-----------'
            type='TERTIARY'
        />
        
        <Button
            text='Dont Have an Account? SIGNUP'
            type='TERTIARY'
            onPress={() => {
            Navigation.navigate('SignUp')
            }}
        />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    Icon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        marginBottom: 50
    }
})
