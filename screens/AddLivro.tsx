import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const AddLivro = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [autorPrincipal, setAutorPrincipal] = useState('');
  const [editora, setEditora] = useState('');
  const [imagem, setImagem] = useState('');
  const [assuntos, setAssuntos] = useState('');
  const [error, setError] = useState('');

  const addLivro = async () => {
    if (!titulo || !autorPrincipal || !editora || !assuntos) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await axios.post('https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi', { titulo, ano, autorPrincipal, editora, imagem, assuntos });
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insira as informações do livro:</Text>
      <View style={styles.Card}>
      <TextInput
        style={styles.input}
        placeholder="Título *"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Autor *"
        value={autorPrincipal}
        onChangeText={setAutorPrincipal}
      />
      <TextInput
        style={styles.input}
        placeholder="Editora *"
        value={editora}
        onChangeText={setEditora}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={imagem}
        onChangeText={setImagem}
      />
      <TextInput
        style={styles.input}
        placeholder="Assuntos *"
        value={assuntos}
        onChangeText={setAssuntos}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Adicionar Livro" onPress={addLivro} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  Card: {
      flex: 1,
      padding: '10%',
      backgroundColor: '',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white'

  },
  error: {
    color: 'orange',
    marginBottom: 10,
  },
});

export default AddLivro;
