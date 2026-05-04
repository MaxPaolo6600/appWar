import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import personagem from "../assets/img/img1.png";
import moedaCara from "../assets/img/cara.png";
import moedaCoroa from "../assets/img/coroa.png";

export default function Batalha({ route }) {

    const { jogadores, turno } = route.params;
    const VILAS = {
        "Vila forte": { vida: 10, ataque: 3 },
        "Vila agressiva": { vida: 7, ataque: 5 },
        "Vila estrategista": { vida: 5, ataque: 4 },
        "Vila medrosa": { vida: 6, ataque: 5 },
    };

    const jogadorAtual = jogadores[turno];
    const [inimigo] = useState(() => {
        const outros = jogadores.filter((_, i) => i !== turno);
        return outros[Math.floor(Math.random() * outros.length)];
    });

    const statsJogador = VILAS[jogadorAtual.tipo];
    const statsInimigo = VILAS[inimigo.tipo];
    const [vidaJogador, setVidaJogador] = useState(statsJogador.vida);
    const [vidaInimigo, setVidaInimigo] = useState(statsInimigo.vida);

    const [vez, setVez] = useState(null);
    const [moeda, setMoeda] = useState(null);

    function jogarMoeda() {
        const resultado = Math.random() < 0.5 ? "cara" : "coroa";

        if (resultado === "cara") {
            setVez(jogadorAtual.nome);
            setMoeda(moedaCara);
        } else {
            setVez(inimigo.nome);
            setMoeda(moedaCoroa);
        }
    }

    function atacar() {
        if (!vez) return;

        if (vez === jogadorAtual.nome) {
            setVidaInimigo(v => Math.max(0, v - statsJogador.ataque));
            setVez(inimigo.nome);
        } else {
            setVidaJogador(v => Math.max(0, v - statsInimigo.ataque));
            setVez(jogadorAtual.nome);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container4}>
                <View style={styles.barras}>
                    <Text style={[styles.nome, { color: inimigo.cor }]}>
                        {inimigo.nome}
                    </Text>
                    <View style={styles.barraVida}>
                        <Text style={styles.textoBarra}>
                            {vidaInimigo}
                        </Text>
                    </View>
                    <View style={[styles.barraAtaque, { backgroundColor: inimigo.cor }]}>
                        <Text style={styles.textoBarra}>
                            {statsInimigo.ataque}
                        </Text>
                    </View>
                </View>
                <View style={styles.personagem}>
                    <Image source={personagem} style={styles.personagemImg} />
                </View>
            </View>
            <View style={styles.container3}>
                <Text style={styles.vs}>
                    {jogadorAtual.nome} VS {inimigo.nome}
                </Text>
                {moeda && (
                    <Image source={moeda} style={styles.moedaImg} />
                )}
                {vez && (
                    <Text style={styles.textoVez}>
                        Vez: {vez}
                    </Text>
                )}
                <TouchableOpacity style={styles.botao} onPress={jogarMoeda}>
                    <Text style={{ color: "#fff" }}>Girar Moeda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoAtaque} onPress={atacar}>
                    <Text style={{ color: "#fff" }}>Atacar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container2}>
                <View style={styles.personagem}>
                    <Image source={personagem} style={styles.personagemImg} />
                </View>
                <View style={styles.barras}>
                    <Text style={[styles.nome, { color: jogadorAtual.cor }]}>
                        {jogadorAtual.nome}
                    </Text>
                    <View style={styles.barraVida}>
                        <Text style={styles.textoBarra}>
                            {vidaJogador}
                        </Text>
                    </View>
                    <View style={[styles.barraAtaque, { backgroundColor: jogadorAtual.cor }]}>
                        <Text style={styles.textoBarra}>
                            {statsJogador.ataque}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    container2: {
        flex: 2,
        flexDirection: 'row',
        alignItems: "center",
    },
    container3: {
        flex: 1,
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
        alignItems: "center",
    },
    personagemImg: {
        width: 120,
        height: 120,
    },
    barras: {
        width: "50%",
        padding: 10,
    },
    barraVida: {
        borderWidth: 2,
        borderColor: "#111",
        borderRadius: 15,
        height: 40,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dd4040",
    },
    barraAtaque: {
        borderWidth: 2,
        borderColor: "#111",
        borderRadius: 15,
        height: 40,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    textoBarra: {
        color: "#fff",
        fontWeight: "bold"
    },
    nome: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    moedaImg: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    textoVez: {
        color: "#fff",
        marginBottom: 10,
    },
    botao: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    botaoAtaque: {
        backgroundColor: "#E53935",
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    vs: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold"
    }
});