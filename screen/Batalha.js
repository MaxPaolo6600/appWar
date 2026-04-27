import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import personagem from "../assets/img/img1.png"

export default function Batalha() {

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.personagem}>
                    <Image source={personagem} style={styles.personagemImg} />
                </View>
                <View style={styles.barras}>
                    
                </View>
            </View>
            <View style={styles.container3}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
    },
    container3: {
        flex: 1,
        backgroundColor: 'blue',
    },
    personagem: {
        flex: 1,
        backgroundColor: 'green',
    },

    barras: {
        flex: 1.,
        backgroundColor: 'white',
    },
});