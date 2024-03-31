import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const LateralBar = ({ navigation, routes }) => {
    const [searchText, setSearchText] = useState(""); 
    const [filteredRoutes, setFilteredRoutes] = useState(routes); 

    const filterRoutes = (text) => {
        setSearchText(text);
        const filtered = routes.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredRoutes(filtered);
    };

    return (
        <View style={styles.container}>
            <Button style={styles.buttonAdd} icon="book-plus" mode="contained" onPress={() => navigation.navigate('AddLivroScreen')}>
                Adicionar Livro
            </Button>
            <TextInput
                style={styles.searchBar}
                label="Pesquisar Assunto"
                mode="outlined"
                value={searchText}
                onChangeText={filterRoutes}
            />
            <FlatList
                data={filteredRoutes}
                renderItem={({ item }) => (
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Assunto', { assunto: item.name })}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                    >
                        {item.name}
                    </Button>
                )}
                keyExtractor={(item) => item.key}
            />
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
    buttonLabel: {
        fontSize: 12,
        color: '#34495E',
        fontWeight: 'bold',
    },
    searchBar: {
        marginBottom: 10,
    },
});

export default LateralBar;
