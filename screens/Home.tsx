import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import axios from "axios";
import LateralBar from "./LateralBar";

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
    const [livros, setLivros] = useState([]);
    const [assuntos, setAssuntos] = useState([]);

    async function carregarLivros() {
        try {
            const response = await axios.get("https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi");
            const livrosFiltrados = response.data.filter(livro => (
                livro.titulo && livro.autorPrincipal && livro.imagem && livro.assuntos
            ));
            setLivros(livrosFiltrados);

            const assuntos = livrosFiltrados.map(livro => livro.assuntos);
            const uniqueAssuntos = [...new Set(assuntos)];
            setAssuntos(uniqueAssuntos.map((assunto, index) => ({ key: index.toString(), name: assunto })));
        } catch (error) {
            console.log("Falha ao carregar livros: " + error);
        }
    }

    useEffect(() => {
        carregarLivros();
    }, []);

    const agruparPorAssunto = (livros) => {
        const livrosPorAssunto = {};
        livros.forEach(livro => {
            if (!livrosPorAssunto[livro.assuntos]) {
                livrosPorAssunto[livro.assuntos] = [];
            }
            livrosPorAssunto[livro.assuntos].push(livro);
        });
        return livrosPorAssunto;
    };

    const renderGrupoLivros = ({ item }) => {
        return (
            <View style={styles.grupoLivros}>
                <View style={styles.faixaAssunto}>
                    <Text style={styles.tituloAssunto}>{item.assunto}</Text>
                </View>
                <FlatList
                    data={item.livros}
                    renderItem={renderLivro}
                    keyExtractor={(livro) => livro.id.toString()}
                    numColumns={5}
                />
            </View>
        );
    };

    const renderLivro = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ViewLivroScreen', { id: item.id })}>
            <View style={styles.livroContainer}>
                <Image
                    source={{ uri: `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${item.imagem}` }}
                    style={styles.imagemLivro}
                    resizeMode="cover"
                />
                <Text style={styles.tituloLivro}>{item.titulo}</Text>
                <Text style={styles.autorLivro}>{item.autorPrincipal}</Text>
            </View>
        </TouchableOpacity>
    );

    const livrosAgrupados = agruparPorAssunto(livros);
    const gruposLivros = Object.keys(livrosAgrupados).map(assunto => ({
        assunto,
        livros: livrosAgrupados[assunto],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <LateralBar navigation={navigation} routes={assuntos} />
            </View>
            <View style={styles.content}>
                
                <FlatList
                    data={gruposLivros}
                    renderItem={renderGrupoLivros}
                    keyExtractor={(item) => item.assunto}
                    contentContainerStyle={styles.flatList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        flex: 1,
        backgroundColor: '#F5F5F6',
        paddingTop: 20,
        paddingLeft: 10,
    },
    content: {
        flex: 3,
        backgroundColor: '#F5F5F6',
        padding: 10,
    },
    addButton: {
        marginVertical: 10,
    },
    flatList: {
        flexGrow: 1,
    },
    grupoLivros: {
        flexDirection: 'column',
    },
    faixaAssunto: {
        paddingVertical: 8,
        borderRadius: 5,
        marginBottom: 10,
    },
    tituloAssunto: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        flexWrap: 'wrap',
        color: 'grey'
    },
    livroContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 9,
    },
    imagemLivro: {
        width: windowWidth * 0.15,
        aspectRatio: 3 / 4,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tituloLivro: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingTop: 5,
        textAlign: 'center',
    },
    autorLivro: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingBottom: 5,
        textAlign: 'center',
    },
});
