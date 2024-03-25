import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
    const [dados, setDados] = useState([]);

    async function getData() {
        try {
            const Response = await axios.get("https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi");
            setDados(Response.data);
        } catch (error) {
            console.log("Falha ao carregar livros: " + error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const renderLivro = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ViewLivroScreen', { id: item.id })}>
            <View style={styles.livroContainer}>
                <Image
                    source={{ uri: `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${item.imagem}` }}
                    style={styles.imagemLivro}
                    resizeMode="cover"
                />
                <View style={styles.infoLivro}>
                    
                    <Text style={styles.tituloLivro}>{item.titulo}</Text>
                    <Text style={styles.autorLivro}>{item.autorPrincipal}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={() => navigation.navigate('AddLivroScreen')} style={styles.addButton}>
                Adicionar Livro
            </Button>
            <FlatList
                data={dados}
                renderItem={renderLivro}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatList}
                numColumns={5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F6',
        padding: 10,
        width: '100%',
    },
    addButton: {
        marginVertical: 10,
    },
    flatList: {
  
    },
    livroContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: 'F5F5F6',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
        width: (windowWidth / 5) - 20, 
        height: 150,
    },
    imagemLivro: {
        flex: 1,
        borderRadius: 10,
    },
    infoLivro: {
        padding: 5,
    },
    tituloLivro: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    autorLivro: {
        fontSize: 10,
        textAlign: 'center',
    },
});
