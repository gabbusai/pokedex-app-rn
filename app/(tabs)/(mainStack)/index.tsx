import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usePokemonDetails, usePokemonNames } from '../../services/queries';
import { router, Stack } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../services/colors';
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';

export default function index() {
  const pokemonNames = usePokemonNames();
  // Flatten the array of arrays
const flattenedPages = pokemonNames.data?.pages?.flat();
const [search, setSearch] = useState('');
const pokemonList = usePokemonDetails(flattenedPages);
useEffect(() => {
  if (search!== '') {
    pokemonNames.fetchNextPage();
  }
}, [search]);

const filteredPokemonList = pokemonList.filter((pokemon) => {
  const pokemonName = pokemon.data?.name.toLowerCase();
  const searchQuery = search.toLowerCase();
  return pokemonName?.includes(searchQuery);
});

if(!pokemonNames){
  return(
    <Skeleton />
  )
}
//const pokeColor = COLORS[pokemon.types[0].type.name as keyof typeof COLORS] || 'white';


  return (
    <View>
      <Stack.Screen 
      options={{ 
        headerSearchBarOptions: {
          placeholder: 'Search Pokemon',
          onChangeText: (event) =>{ setSearch(event.nativeEvent.text);},
        }
       }}/>
      <FlatList
        style={styles.flat}
        data={filteredPokemonList}
        numColumns={2}
        contentContainerStyle={{ gap: 30 }}
        columnWrapperStyle={{ gap: 40 }}
        renderItem={({ item : pokemon }) => (
          
            <Pressable onPress={() => router.push(`/pokemon/${pokemon.data?.id}`)}
            style={{ ...styles.pokemonCard, backgroundColor: COLORS[pokemon.data?.types[0].type.name as keyof typeof COLORS] || 'white' }}>
            {pokemon.isFetching ? 
            <Skeleton
            show
            radius="round"
            backgroundColor={COLORS.light}
            transition={{ 
              type: 'timing',
              duration: 2000,
             }}
            >
              <View  style={{ height: 120, width: 120}}/>
            </Skeleton> 
            :
            <View>
            <View>
              <Text style={styles.textOne }>{pokemon.data?.name}</Text> 
            </View>
            
            <Image  source={{ uri: pokemon.data?.sprites?.front_default }}
                    style={{ height: 100, aspectRatio: 4/3,}}
            />
            </View>
          }
            </Pressable>
          )}
          keyExtractor={(item) => `${item.data?.name}_${item.data?.id}` && Math.random().toString()}
          onEndReached={() => {pokemonNames.fetchNextPage()}}
          ListFooterComponent={() => (
            pokemonNames.isLoading ? (
              <View style={{alignItems: 'center' }}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : null)}
      />

    </View>
  );
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