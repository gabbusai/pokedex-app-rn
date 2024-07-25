import { View, Text, FlatList, Pressable, Image , StyleSheet} from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { useFavoritesContext } from '../services/Favorites'
const favScreen = () => {
    const { favorites } = useFavoritesContext();
    
    if(favorites.length === 0){
        return(
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Stack.Screen options={{ headerShown: true, }}/>
                <Text>No favorite pokemon found.</Text>
            </View>
        )
    }

    
  return (
    
    <View >
        <Stack.Screen options={{ headerShown: true, }}/>
        <FlatList
        style={styles.flat}
        data={favorites}
        numColumns={2}
        contentContainerStyle={{ gap: 30 }}
        columnWrapperStyle={{ gap: 40 }}
        renderItem={({ item : pokemon }) => (
            <Pressable onPress={() => router.push(`/pokemon/${pokemon.pokemon.id}`)}
            style={styles.pokemonCard}>
            <View>
                <Text style={styles.textOne }>{pokemon.pokemon.name}</Text> 
            </View>
            
            <Image  source={{ uri: pokemon.pokemon.sprites?.front_default }}
                    style={{ height: 100, aspectRatio: 4/3,}}
            />
            
            </Pressable>
        )}
        keyExtractor={(item) => item.pokemon.name.toString() || Math.random().toString(36).substr(2, 9)}
        />

    </View>
    )
}

const styles = StyleSheet.create({
    flat: {
        marginHorizontal: 20,
    },
    pokemonCard: {
        backgroundColor: '#2c2c2c',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
    textOne: {
        color: '#2c2c2c',
        fontWeight: 'light',
        fontSize: 15,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 25,
        textTransform: 'capitalize'
    }
});



export default favScreen