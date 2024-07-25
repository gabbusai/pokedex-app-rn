import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pokemon, PokemonSpecies, PokeType } from '../services/types/Pokemon'
import { useSinglePokemonType } from '../services/queries';
import { COLORS } from '../services/colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';


type PokeTypeProps ={
    typeName: string;
}
export default function PokeTypes({typeName}: PokeTypeProps) {
    const { data : type } = useSinglePokemonType(typeName);
    //COLORS[pokemon.data?.types[0].type.name as keyof typeof COLORS] || 'white'

    if(!type){
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <View style={styles.mainCont}>
        
        <View style={{ backgroundColor: COLORS[typeName as keyof typeof COLORS] || 'white', ...styles.mainTypeCard}}>
            <Text style={styles.mainTypeText}>{type?.name}</Text>
        </View>


        <Text style={{ fontSize: 22, textAlign:'center' }}>Weak Against:</Text>
        <FlatList 
        data={type?.damage_relations?.half_damage_to}
        numColumns={4}
        style={{ width: '100%', }}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={
            ({item: type}) => {
                return <View key={type.name} style={{...styles.typeCard, backgroundColor: COLORS[type.name as keyof typeof COLORS] || 'white' }}> 
                        <Text style={{ fontFamily: 'Lepp', textTransform:'uppercase', color: COLORS.light }}>{type.name}</Text>
                </View>
            }
        }
        />

        <Text style={{ fontSize: 22, textAlign:'center' }}>Strong Against:</Text>
                <FlatList 
                data={type?.damage_relations?.double_damage_to}
                numColumns={4}
                style={{ width: '100%', }}
                contentContainerStyle={{ gap: 10 }}
                columnWrapperStyle={{ gap: 5 }}
                renderItem={
                    ({item: type}) => {
                        return <View key={type.name} style={{...styles.typeCard, backgroundColor: COLORS[type.name as keyof typeof COLORS] || 'white' }}> 
                                <Text style={{ fontFamily: 'Lepp', textTransform:'uppercase', color: COLORS.light }}>{type.name}</Text>
                        </View>
                    }
                }
                />

        </View>
    )
    }

const styles = StyleSheet.create({
mainCont:{
    flex: 1,
    alignItems: 'center'
},
mainTypeCard:{
    marginVertical: 20,
    width: 180,
    aspectRatio: 16/9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: COLORS.gray01,
    borderWidth: 4,
},
mainTypeText:{
    color: COLORS.light,
    fontSize: 25,
    fontFamily: 'manifold',
    textTransform: 'uppercase'
},
typeCard:{
    width: 90,
    aspectRatio: 16/9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: COLORS.gray01,
    backgroundColor: COLORS.gray02,
}
})