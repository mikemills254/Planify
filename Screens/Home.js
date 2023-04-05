import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { getAuth } from 'firebase/auth'


const _COLOR = '#00ADB5'

const Home = () => {

    return (
        <View style={styles.container}>
            <View style={styles.progress}>
                <Text style={styles.progressHeader}>Today's Progress Summary</Text>
                <Text style={{fontWeight: 200, fontSize: 12}}>5 Tasks</Text>
                <Text style={styles.ProgressTasks}>Next Coming Task: {'\n'} UI Designing {'\n'} Build an API</Text>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    progress: {
        borderRadius: 20,
        backgroundColor: _COLOR,
        padding: 20,
        height: '20%'
    },
    progressHeader: {
        // marginHorizontal: '5%',
        color: 'white',
        fontSize: 20,
        fontWeight: 600
    },
    ProgressTasks: {
        color: 'white',
        marginVertical: '5%'
    }
})
