import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import personagem from "../assets/img/img1.png";
import moedaCara from "../assets/img/cara.png";
import moedaCoroa from "../assets/img/coroa.png";
import bau from "../assets/img/bau.png"

export default function Batalha({ route }) {
    const navigation = useNavigation();
    const { jogadores, turno, interrogacao } = route.params;

    const VILAS = {
        "Vila forte": { vida: 10, ataque: 3 },
        "Vila agressiva": { vida: 7, ataque: 5 },
        "Vila estrategista": { vida: 5, ataque: 4 },
        "Vila medrosa": { vida: 6, ataque: 5 },
    };

    const jogadorAtual = jogadores[turno];
    const [evento] = useState(() => {
        if (interrogacao === "1") {
            return Math.random() < 0.5 ? "rebeldes" : "iten";
        }
        return "normal";
    });

    const [iten, setIten] = useState(null);
    const [dado, setDado] = useState(null);

    function rolarDado() {
        const d20 = Math.floor(Math.random() * 20) + 1;
        setDado(d20);

        let itemEscolhido;

        if (d20 <= 7) {
            itemEscolhido = Math.random() < 0.5
                ? "Escudo Ruim - +3 defesa"
                : "Armas Ruims - +2 ataque";
        }
        else if (d20 <= 14) {
            itemEscolhido = Math.random() < 0.5
                ? "Escudo Bom - +5 defesa"
                : "Armas Boas - +4 ataque";
        }
        else {
            itemEscolhido = Math.random() < 0.5
                ? "Escudo Muito Bom - +7 defesa"
                : "Armas Muito Boas - +5 ataque";
        }

        setIten(itemEscolhido);
    }

    const [inimigo] = useState(() => {
        if (evento === "rebeldes") {
            return {
                nome: "Rebeldes",
                cor: "#888",
                tipo: "especial"
            };
        }

        if (evento === "normal") {
            const outros = jogadores.filter((_, i) => i !== turno);
            return outros[Math.floor(Math.random() * outros.length)];
        }

        return null;
    });

    const statsJogador = VILAS[jogadorAtual.tipo];

    const statsInimigo = evento === "rebeldes"
        ? { vida: 5, ataque: 3 }
        : evento === "normal"
            ? VILAS[inimigo.tipo]
            : null;

    const [vidaJogador, setVidaJogador] = useState(statsJogador.vida);
    const [vidaInimigo, setVidaInimigo] = useState(
        statsInimigo ? statsInimigo.vida : 0
    );

    const [vez, setVez] = useState(null);
    const [moeda, setMoeda] = useState(null);

    function jogarMoeda() {
        if (!inimigo) return;

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
        if (!vez || !inimigo) return;

        if (vez === jogadorAtual.nome) {
            setVidaInimigo(v => Math.max(0, v - statsJogador.ataque));
            setVez(inimigo.nome);
        } else {
            setVidaJogador(v => Math.max(0, v - statsInimigo.ataque));
            setVez(jogadorAtual.nome);
        }
    }

    if (evento === "iten") {
        return (
            <ImageBackground
                source={bau}
                style={styles.containerIten}
                resizeMode="cover"
            >
                <View style={styles.containerIten2}>
                    <View style={styles.containerIten3}>
                        <Text style={styles.itenText}>
                            Role o dado para descobrir qual iten vai ganhar!
                        </Text>
                        {dado && (
                            <Text style={styles.itenText}>
                                Dado: {dado}
                            </Text>
                        )}
                        {iten && (
                            <Text style={styles.itenText}>
                                {iten}
                            </Text>
                        )}
                        {!dado && (
                            <TouchableOpacity style={styles.botao} onPress={rolarDado}>
                                <Text style={styles.itenTextBtn}>Rolar D20</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.itenTextBtn}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
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
        fontWeight: "bold",
    },
    containerIten: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerIten2: {
        backgroundColor: 'rgba(0,0,0,0.60)',
        width: "70%",
        height: "60%",
        padding: 30,
        borderRadius: 30,
        justifyContent: "space-between",
    },
    itenText: {
        color: "#fff",
        fontSize: 22,
        textAlign: "center",
    },
});