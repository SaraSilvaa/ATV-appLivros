import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function ViewLivro({ route }) {
  const { id } = route.params;
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    fetchLivro();
  }, []);

  const fetchLivro = async () => {
    try {
      const response = await axios.get(`https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi/${id}`);
      setLivro(response.data);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {livro && (
        <>
          <Image source={{ uri: `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${livro.imagem}` }}
 style={styles.imagem} />
          <View style={styles.infoContainer}>
      

            <Text style={styles.titulo}>{livro.titulo}</Text>
            <Text style={styles.autor}>Autor: {livro.autorPrincipal}</Text>
            <Text style={styles.editora}>Editora: {livro.editora}</Text>
            <Text style={styles.ano}>Ano: {livro.ano}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  imagem: {
    width: 300,
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  
  autor: {
    fontSize: 18,
    marginBottom: 5,
  },
  editora: {
    fontSize: 18,
    marginBottom: 5,
  },
  imagemLivro: {
    aspectRatio: 3 / 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
},
  ano: {
    fontSize: 18,
    marginBottom: 5,
  },
});
