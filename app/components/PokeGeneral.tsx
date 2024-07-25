import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Pokemon, PokemonSpecies } from '../services/types/Pokemon'
import { COLORS } from '../services/colors'
type PokeProps = {
    pokemon: Pokemon,
    pokemonSpecies: PokemonSpecies
}
const PokeGeneral = ({ 
        pokemon,
        pokemonSpecies
    } : PokeProps) => {
    
    //cleaning the text (ty chat gpt <3)
    const cleanedText = pokemonSpecies.flavor_text_entries[2].flavor_text.replace(/\n/g, ' ').replace(/\\/g, '');
return (
        <View style={styles.generalTabCont}>
        <Text style={styles.flavorText}>{cleanedText}</Text>
            <View style={styles.secondarySection}>
                <Text style={styles.secondarySectionText}>
                    {pokemonSpecies.generation.name.toUpperCase()}  |    
                    {`  ${pokemonSpecies.pokedex_numbers[1].pokedex.name}`}
                </Text>

                <View style={styles.vitalsCont}>
                    <Text style={styles.vitalsText}>
                        {`Height:   ${pokemon.height}`}
                    </Text>

                    <Text style={styles.vitalsText}>
                        {`Weight:   ${pokemon.weight}`}
                    </Text>
                </View>


            </View>
        </View>
    )
}

export default PokeGeneral

const styles = StyleSheet.create({
    generalTabCont: {
        width: '100%',
        aspectRatio: 9/16,
    },
    flavorText: {
        color: COLORS.semiDark,
        fontSize: 15,
        width: '100%',
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'manifold',
        textTransform: 'capitalize',
    },
    secondarySection:{

    },
    secondarySectionText: {
        color: COLORS.semiDark,
        fontSize: 15,
        width: '100%',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'JetBrainsMonoBold',
    },
    vitalsCont:{
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 10,
        marginBottom: 10,

    },
    vitalsText:{
        fontFamily: 'JetBrainsMonoLight',
        color: COLORS.semiDark,
        fontSize: 15,
    }
})