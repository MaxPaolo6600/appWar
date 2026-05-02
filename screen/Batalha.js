import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import personagem from "../assets/img/img1.png"
import moedaCara from "../assets/img/cara.png"
import moedaCoroa from "../assets/img/coroa.png"

export default function Batalha() {
    const [vez, setVez] = useState(null);
    const [moeda, setMoeda] = useState(null);

    function jogarMoeda() {
        const vezDe = Math.random() < 0.5 ? "cara" : "coroa";

        if (vezDe === "cara") {
            setVez("Jogador");
            setMoeda(moedaCara);
        } else {
            setVez("Inimigo");
            setMoeda(moedaCoroa);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.personagem}>
                    <Image source={personagem} style={styles.personagemImg} />
                </View>
                <View style={styles.barras}>
                    <View style={styles.barraVida}>
                        <Text>10</Text>
                    </View>
                    <View style={styles.barraArmadura}>
                        <Text>10</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container3}>
                <View style={styles.moedaContainer}>
                    {moeda && (
                        <Image source={moeda} style={styles.moedaImg} />
                    )}
                    {vez && (
                        <Text style={styles.textoVez}>
                            Vez: {vez}
                        </Text>
                    )}
                    <TouchableOpacity
                        onPress={() => jogarMoeda()}
                    >
                        <Text>Gire a Moeda</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container4}>
                <View style={styles.barras}>
                    <View style={styles.barraVida}>
                        <Text>10</Text>
                    </View>
                    <View style={styles.barraArmadura}>
                        <Text>10</Text>
                    </View>
                </View>
                <View style={styles.personagem}>
                    <Image source={personagem} style={styles.personagemImg} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex: 2,
        flexDirection: 'row',
        alignItems: "center",
    },
    container3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    container4: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    personagem: {
        width: "50%",
    },
    barras: {
        width: "50%",
        backgroundColor: 'white',
    },
    barraVida: {
        borderWidth: 3,
        borderColor: "#111",
        borderRadius: 15,
        backgroundColor: "red",
        height: 50,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    barraArmadura: {
        borderWidth: 3,
        borderColor: "#111",
        borderRadius: 15,
        backgroundColor: "blue",
        height: 50,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    moedaImg: {
        width: 100,
        height: 100,
    },
});