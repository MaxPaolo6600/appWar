import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const imgInterro = require("../assets/img/img1.png");
const imgCaixa = require("../assets/img/caixa.png");

const { width } = Dimensions.get('window');
const CELL_SIZE = width / 6;

const playerColors = [
    "#ff0000",
    "#00ff00",
    "#0084ff",
    "#8400ff"
];

export default function Game() {
    const comecoJogo = Array(36).fill(null);

    comecoJogo[0] = { type: "color", value: playerColors[0] };
    comecoJogo[1] = { type: "color", value: playerColors[0] };
    comecoJogo[2] = { type: "image", value: imgInterro };
    comecoJogo[3] = { type: "image", value: imgInterro };
    comecoJogo[6] = { type: "color", value: playerColors[0] };
    comecoJogo[7] = { type: "color", value: playerColors[0] };
    comecoJogo[4] = { type: "color", value: playerColors[1] };
    comecoJogo[5] = { type: "color", value: playerColors[1] };
    comecoJogo[10] = { type: "color", value: playerColors[1] };
    comecoJogo[11] = { type: "color", value: playerColors[1] };
    comecoJogo[12] = { type: "image", value: imgInterro };
    comecoJogo[14] = { type: "image", value: imgCaixa };
    comecoJogo[15] = { type: "image", value: imgCaixa };
    comecoJogo[17] = { type: "image", value: imgInterro };
    comecoJogo[18] = { type: "image", value: imgInterro };
    comecoJogo[20] = { type: "image", value: imgCaixa };
    comecoJogo[21] = { type: "image", value: imgCaixa };
    comecoJogo[23] = { type: "image", value: imgInterro };
    comecoJogo[24] = { type: "color", value: playerColors[2] };
    comecoJogo[25] = { type: "color", value: playerColors[2] };
    comecoJogo[30] = { type: "color", value: playerColors[2] };
    comecoJogo[31] = { type: "color", value: playerColors[2] };
    comecoJogo[28] = { type: "color", value: playerColors[3] };
    comecoJogo[29] = { type: "color", value: playerColors[3] };
    comecoJogo[32] = { type: "image", value: imgInterro };
    comecoJogo[33] = { type: "image", value: imgInterro };
    comecoJogo[34] = { type: "color", value: playerColors[3] };
    comecoJogo[35] = { type: "color", value: playerColors[3] };

    const [tabuleiro, setTabuleiro] = useState(comecoJogo);
    const [turno, setTurno] = useState(0);
    const navigation = useNavigation();

    function handlePress(index) {
        let nvoTabuleiro = [...tabuleiro];
        const quadrado = nvoTabuleiro[index];

        if (quadrado?.type === "color") return;

        if (quadrado?.type === "image") {
            nvoTabuleiro[index] = { type: "color", value: playerColors[turno] };
            setTabuleiro(nvoTabuleiro);
            navigation.navigate("Batalha");

            setTurno((turno + 1) % 4);
        }
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[
                styles.cell,
                { backgroundColor: item?.type === "color" ? item.value : "#fff" }
            ]}
            onPress={() => handlePress(index)}
        >
            {item?.type === "image" && (
                <Image
                    source={item.value}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabuleiro}>
                <Text style={[styles.turno, { color: playerColors[turno] }]}>
                    Vez do Jogador {turno + 1}
                </Text>
                <FlatList
                    data={tabuleiro}
                    renderItem={renderItem}
                    keyExtractor={(_, i) => i.toString()}
                    numColumns={6}
                    scrollEnabled={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    turn: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabuleiro: {
        marginBottom: 100,
        marginTop: 100,
    },
});