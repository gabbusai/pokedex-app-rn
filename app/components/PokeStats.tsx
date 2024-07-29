import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pokemon, PokemonSpecies } from '../services/types/Pokemon'
import { usePokemonType } from '../services/queries'
import { COLORS } from '../services/colors'
import { MotiView } from 'moti'


type pokeProps = {
    pokemon: Pokemon,
    pokemonSpecies: PokemonSpecies, 
}

const PokeStats = ({pokemon, pokemonSpecies} : pokeProps) => {
const typesList = pokemon.types.map(type => type.type.name)
const types = usePokemonType(typesList)
  return (
    <View style={styles.statsTabCont}>
      <Text style={styles.baseStatTitle}>BASE STATS</Text>
        <View style={styles.statsCont}>
            <FlatList 
            data={pokemon.stats}
            numColumns={1}
            contentContainerStyle={{ gap: 0 }}
            renderItem={({item: stat, index}) => (
                <View key={stat.stat.name} style={styles.statsCard}> 
                    <Text style={{ ...styles.statCardText, width: 110, textAlign: 'right'}}>
                        {stat.stat.name.replace(`special`, 'Sp')}:
                    </Text>

                    <MotiView 
                    style={{marginRight: 20 , ...styles.statsBar}}
                    from={{ width: 0, backgroundColor: COLORS.darkBrown }}
                    animate={{ width:stat.base_stat * 0.81, backgroundColor: COLORS.gray02 }}
                    transition={{ type: 'spring', duration: stat.base_stat * 90}}/>
                    <Text style={{ ...styles.statCardText }}>
                        {stat.base_stat}
                    </Text>

                    
            </View>
            )}
            />
        </View>

        <Text style={styles.baseStatTitle}>ABILITIES</Text>
        <View style={styles.statsCont}>
            <FlatList 
            data={pokemon.abilities}
            numColumns={2}
            contentContainerStyle={{ gap: 0 }}
            columnWrapperStyle={{ gap: 30 }}
            renderItem={({item: ability}) => (
                <View key={ability.ability.name} style={styles.statsCard}> 
                    <Text style={styles.statCardText}>
                        {ability.ability.name}
                    </Text>

                    <Text style={{ ...styles.statCardText }}>
                        {ability.is_hidden? '(H)' : ''}
                    </Text>
            </View>
            )}
            />
        </View>

    </View>
  )
}

export default PokeStats

const styles = StyleSheet.create({
    statsTabCont:{
        width: '100%',
        aspectRatio: 9/16,
        padding: 10,
        alignItems:'center'
    },
    baseStatTitle:{
        textAlign: 'center',
        fontFamily: 'manifold',
        fontSize: 18,
    },
    statsCont:{
        width: '100%',
        justifyContent:'center'
    },
    statsCard:{
        width: '50%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 25,
        justifyContent:'flex-start',
    },
    statCardText:{
        color: COLORS.dark01,
        fontFamily: 'JetBrainsMonoBold',
        fontSize: 15,
        textTransform: 'capitalize',
        borderRadius: 25,
        paddingRight: 5,
        paddingLeft: 0,
    },
    statsBar:{
        height: 7,
        //backgroundColor: COLORS.gray02,
        borderRadius: 5,
        marginVertical: 9,
    },
    abilityCont:{

    }

})