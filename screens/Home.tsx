import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import axios from "axios";
import LateralBar from "./LateralBar";
import { Button } from "react-native-paper";
const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
    const [livros, setLivros] = useState([]);
    const [assuntos, setAssuntos] = useState([]);
    const [livrosExibidos, setLivrosExibidos] = useState([]);
    const livrosPorPagina = 10; // Número de livros a serem exibidos por vez

    async function carregarLivros() {
        try {
            const response = await axios.get("https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi");
            const livrosFiltrados = response.data.filter(livro => (
                livro.titulo && livro.autorPrincipal && livro.imagem && livro.assuntos
            ));
            setLivros(livrosFiltrados);
            setLivrosExibidos(livrosFiltrados.slice(0, livrosPorPagina));

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

    const handleMostrarMais = () => {
        const novosLivrosExibidos = livros.slice(0, livrosExibidos.length + livrosPorPagina);
        setLivrosExibidos(novosLivrosExibidos);
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
<Text style={styles.tituloLivro}>
    {item.titulo.length > 20 ? `${item.titulo.substring(0, 20)}...` : item.titulo}
</Text>
                <Text style={styles.autorLivro}>{item.autorPrincipal}</Text>
            </View>
            
        </TouchableOpacity>
        
    );

    return (
        
        <View style={styles.container}>
    <View style={styles.sidebar}>
        <LateralBar navigation={navigation} routes={assuntos} />
    </View>
    <View style={styles.content}>
        <FlatList
            data={livrosExibidos}
            renderItem={renderLivro}
            keyExtractor={(livro) => livro.id.toString()}
            contentContainerStyle={styles.flatList}
            numColumns={6} 
        />

        {livrosExibidos.length < livros.length && (
 <Button mode="contained" onPress={handleMostrarMais}>
 Mostrar Mais
</Button>        )}
    </View>
</View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    sidebar: {
        
        backgroundColor: '',
       
    },
    content: {
        flex: 3,
        backgroundColor: 'black',
        padding: 10,
        width: '100%',
    },
    addButton: {
        marginVertical: 10,
        width: 10, 
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
        width: '100%', 
        margin: 5,
        backgroundColor: '',
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
        color: 'pink',
        
    },
    autorLivro: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'white',

    },
    
});
