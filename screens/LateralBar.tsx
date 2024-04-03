import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const LateralBar = ({ navigation, routes }) => {

  

    return (
        <View style={styles.container}>
            <Button style={styles.buttonAdd} icon="book-plus" mode="contained" onPress={() => navigation.navigate('AddLivroScreen')}>
                Adicionar Livro
            </Button>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 10,
        backgroundColor: '#F7F7F7',
    },
    button: {
        marginBottom: 10,
        backgroundColor: '#AAB7B8',
    },
    buttonAdd: {
        marginBottom: 10,
    },
  
});

export default LateralBar;
