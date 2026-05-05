import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
    Alert
} from 'react-native';

export default function TelaJogadores() {

    const navigation = useNavigation();

    const [mostrarTutorial, setMostrarTutorial] = useState(false);

    const opcoes = [
        "Vila forte",
        "Vila agressiva",
        "Vila estrategista",
        "Vila medrosa"
    ];

    const cores = ["#482525", "#202F22", "#20242F", "#2E202F"];

    const [jogadores, setJogadores] = useState([
        { nome: "", tipo: "", aberto: false, cor: cores[0] },
        { nome: "", tipo: "", aberto: false, cor: cores[1] },
        { nome: "", tipo: "", aberto: false, cor: cores[2] },
        { nome: "", tipo: "", aberto: false, cor: cores[3] },
    ]);

    function toggleDropdown(index) {
        const novos = [...jogadores];
        novos[index].aberto = !novos[index].aberto;
        setJogadores(novos);
    }

    function selecionarOpcao(index, opcao) {
        const novos = [...jogadores];
        novos[index].tipo = opcao;
        novos[index].aberto = false;
        setJogadores(novos);
    }

    function atualizarNome(index, texto) {
        const novos = [...jogadores];
        novos[index].nome = texto;
        setJogadores(novos);
    }

    function iniciarJogo() {
        const incompleto = jogadores.some(j => j.nome === "" || j.tipo === "");

        if (incompleto) {
            Alert.alert("Erro", "Todos os jogadores precisam preencher nome e vila!");
            return;
        }

        navigation.navigate("Game", {
            jogadores: jogadores
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={styles.botaoTutorial}
                onPress={() => setMostrarTutorial(true)}
            >
                <Text style={styles.btnTutorial}>Tutorial</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.titulo}>Configurar Jogadores</Text>
                {jogadores.map((jogador, index) => (
                    <View key={index} style={[styles.card, { backgroundColor: jogador.cor }]}>
                        <Text style={styles.label}>Jogador {index + 1}</Text>
                        <TextInput
                            placeholder="Digite seu nome"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={jogador.nome}
                            onChangeText={(text) => atualizarNome(index, text)}
                        />
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => toggleDropdown(index)}
                        >
                            <Text>{jogador.tipo || "Escolher tipo de vila"}</Text>
                        </TouchableOpacity>
                        {jogador.aberto && (
                            <View style={styles.dropdown}>
                                {opcoes.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.item}
                                        onPress={() => selecionarOpcao(index, item)}
                                    >
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.botaoJogar} onPress={iniciarJogo}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Começar Jogo
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                visible={mostrarTutorial}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <View style={styles.modalCard}>
                            <Text style={styles.textoModal}>
                                Vila Forte
                            </Text>
                            <Text style={styles.textoVida}>
                                10 de vida
                            </Text>
                            <Text style={styles.textoAtaque}>
                                3 de ataque
                            </Text>
                        </View>
                        <View style={styles.modalCard}>
                            <Text style={styles.textoModal}>
                                Vila Agressiva
                            </Text>
                            <Text style={styles.textoVida}>
                                7 de vida
                            </Text>
                            <Text style={styles.textoAtaque}>
                                5 de ataque
                            </Text>
                        </View>
                        <View style={styles.modalCard}>
                            <Text style={styles.textoModal}>
                                Vila Estrategista
                            </Text>
                            <Text style={styles.textoVida}>
                                5 de vida
                            </Text>
                            <Text style={styles.textoAtaque}>
                                4 de ataque
                            </Text>
                            <Text style={styles.textoModal}>
                                1 item aleatório
                            </Text>
                        </View>
                        <View style={styles.modalCard}>
                            <Text style={styles.textoModal}>
                                Vila Medrosa
                            </Text>
                            <Text style={styles.textoVida}>
                                6 de vida
                            </Text>
                            <Text style={styles.textoAtaque}>
                                5 de ataque
                            </Text>
                            <Text style={styles.textoModal}>
                                1 item com + possibilidade de ser item ruim
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.botaoFechar}
                            onPress={() => setMostrarTutorial(false)}
                        >
                            <Text>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: "#121212"
    },
    titulo: {
        color: "#fff",
        fontSize: 22,
        marginBottom: 20,
    },
    card: {
        width: 250,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    label: {
        color: "#fff",
        marginBottom: 5,
        fontWeight: "bold"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 8,
        color: "#fff",
        marginBottom: 10,
    },
    botao: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#eee",
        alignItems: "center",
    },
    dropdown: {
        marginTop: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    botaoJogar: {
        marginTop: 20,
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 10,
    },
    botaoTutorial: {
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: "#ff0000",
        padding: 10,
        borderRadius: 8,
        zIndex: 10
    },
    btnTutorial: {
        color: "white",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
    },
    modalCard:{
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        margin: 10,
    },
    textoModal: {
        marginBottom: 20,
    },
    textoVida: {
        color: "red",
    },
    textoAtaque: {
        color: "blue",
    },
    botaoFechar: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    }
});