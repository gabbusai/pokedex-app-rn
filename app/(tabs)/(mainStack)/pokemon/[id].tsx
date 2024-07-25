import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useIsPokemonFavorite, usePokemonSingle, usePokemonSpecies } from '../../../services/queries'
import { useFavoritesContext } from '../../../services/Favorites'
import { Pokemon, PokemonSpecies, SectionType } from '../../../services/types/Pokemon'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../services/colors'
import { useFonts } from 'expo-font'
import { Quantico_400Regular, Quantico_700Bold } from '@expo-google-fonts/quantico'
import { VT323_400Regular } from '@expo-google-fonts/vt323'
import PokeGeneral from '../../../components/PokeGeneral'
import PokeStats from '../../../components/PokeStats'
import BottomSheet from '@gorhom/bottom-sheet'
import PokeTypes from '../../../components/PokeTypes'
export default function PokemonDetails() {
  //font 
  const [fontsLoaded, error] = useFonts({
    JetBrainsMonoBold: require('../../../../assets/fonts/JetBrainsMonoBold.ttf'),
    JetBrainsMonoLight: require('../../../../assets/fonts/JetBrainsMonoLight.ttf'),
    manifold: require('../../../../assets/fonts/manifold.ttf'),
    Lepp: require('../../../../assets/fonts/Lepp.ttf'),
    DeleddaLight: require('../../../../assets/fonts/DeleddaLight.ttf'),
      Quantico_700Bold,
      Quantico_400Regular,
      VT323_400Regular,
  });
   

      //states for selected tab
      const sections: SectionType[] = ['General', 'Stats', 'Evolution'];
      const [selectedTab, setSelectedTab] = useState<SectionType>('General');

    //get id from link parameter
    const { id } = useLocalSearchParams()
    const pokeId = id?.toString();

    //get general pokemon details
    const {data: poke} = usePokemonSingle(pokeId);
    const pokemon = poke as Pokemon

    //get pokemon species details
    const {data: pokeSpecies} = usePokemonSpecies(pokeId);
    const pokemonSpecies = pokeSpecies as PokemonSpecies;


    //context stuff 
    const { favorites, addToFavorites, removeToFavorites } = useFavoritesContext();
     //bottom sheet stuff
    const snapPoints = useMemo(() => ['1%', '75%'], []);
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const bottomSheetCloser = () => bottomSheetRef.current?.close();
    const bottomSheetOpener = () => bottomSheetRef.current?.snapToIndex(1);
    const [isBSActive, setBSActive] = useState(false)
    const [currentType, setCurrentType] = useState<string>('');
    const bottomSheetHandler = (typeName: string) => {
      setBSActive(!isBSActive);
      if(isBSActive){
        setCurrentType(typeName)
        bottomSheetOpener();
      }
      else{
        bottomSheetCloser();
      }
    }
    
    //load the pokemon details and species first
    if(!pokemon || !pokemonSpecies || !fontsLoaded) {
        return <View style= {styles.mainCont}>
                  <Text>Loading...</Text>
              </View>
    }
    //after loading
    //const color = pokemon.types[0].type.name; //outputs something like grass or fire
    const pokeColor = COLORS[pokemon.types[0].type.name as keyof typeof COLORS] || 'white';
    const isFavorite = useIsPokemonFavorite(pokemon.id, favorites);

    //favorite handler
    const handleFavoritePress = () => {
      if (isFavorite) {
          removeToFavorites(pokemon);
      } else {
          addToFavorites(pokemon);
      };




  }

    //console.log(error);
  return (
    
    <View style = {{ ...styles.mainCont, backgroundColor: pokeColor }}>
      <Stack.Screen options={{ 
        headerTitle: '',
        headerStyle: {backgroundColor: pokeColor},
        headerTintColor: COLORS.light,
        headerShadowVisible: false,
        headerRight: () => (
          <Pressable onPress={handleFavoritePress}>
              <FontAwesome 
                  name={isFavorite ? 'heart' : 'heart-o'}
                  size={24}
                  color={COLORS.light}
                  style={{ marginRight: 10 }}
              />
          </Pressable>
      )
        }} />
        <View style={styles.cardCont}>
            <Text style={{ ...styles.mainText, fontFamily: 'VT323_400Regular' }}>{pokemon.name}</Text>
            <Text style={styles.pokeId}>#{pokemon.id}</Text>
            <View style={styles.typeCont}>
              {
                pokemon.types.map((type)=> {
                  return <Pressable key={type.type.name} style={styles.typeCard}
                          //open bottom drawer
                          onPress={(e) => bottomSheetHandler(type.type.name)}
                      >
                              <Text style={{ ...styles.typeText, color: pokeColor, fontFamily: 'JetBrainsMonoLight' }}>{type.type.name}</Text>
                        </Pressable>
                })
              }
            </View>
            <View pointerEvents="none">
              <Image style={styles.imgCont} source={{ uri: pokemon.sprites?.other.home.front_default }} />
            </View>
            
        </View>

        <View style={styles.bottomCard}>
          <View style={styles.sectionCont}>
            {
              sections.map((section) => 
                {
                return <Pressable key={section} style={styles.sectionTab}
                onPress={() => setSelectedTab(section)}
                > 
                  <Text style={{ ...styles.sectionText, 
                  borderBottomWidth: selectedTab == section ? 3 : 0,
                  borderColor: pokeColor,
                  color: selectedTab == section ?  pokeColor : COLORS.normal
                  }}>{section}</Text> 
                </Pressable>
              })
            }
          </View>

          <View>
            {
              selectedTab === 'General' &&
              <PokeGeneral pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>
            }
            {
              selectedTab === 'Stats' &&
              <PokeStats pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>
            }
            {
              selectedTab === 'Evolution' &&
              <Text>Evolution Tab</Text>
            }
          </View>
        </View>

        <BottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
            <PokeTypes typeName={currentType}/>
        </BottomSheet>

    </View>
  )
}

const styles = StyleSheet.create({
pokeId:{
  position: 'absolute',
  bottom: 10,
  left: 10,
  color: COLORS.light,
  fontSize: 27,
  fontFamily: 'JetBrainsMonoBold',
  //transform: [{ rotateZ: '45deg' }],

},
  mainCont: {
    flex: 1
},
cardCont: {
    height: 320,
    width: '95%',
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    paddingTop: 15,
    paddingHorizontal: 15,
    alignItems:'center',
    //zIndex: 2,
},
bottomCard: {
  //zIndex: 1,
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    padding: 15,
    paddingTop:25,
    elevation: 20,
    backgroundColor: COLORS.light
},
mainText:{
  fontSize: 45,
  textTransform: 'capitalize',
  color: COLORS.light,
  
},
typeCont: {
  width: '100%',
  flexDirection: 'row',
  justifyContent:'center',
  paddingVertical: 5,
},
typeCard: {
  height: 40,
  width: 'auto',
  padding: 5,
  paddingHorizontal: 15,
  backgroundColor: COLORS.light,
  borderRadius: 25,
  marginHorizontal: 5,
  color: COLORS.light,
  justifyContent: 'center',
  alignItems: 'center',
},
typeText: {
  fontSize: 15,
  textTransform: 'capitalize',
},
imgCont:{
height: 270,
aspectRatio: 1/1,
marginTop: -50,
},
sectionCont: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
},
sectionTab:{
  height: 40,
  borderColor: COLORS.darkBrown,
  aspectRatio: 26/9,
  justifyContent: 'center',
  alignItems: 'center',
},
sectionText:{
  color: COLORS.darkBrown,
  fontFamily: 'JetBrainsMonoBold',
  fontSize:19,
}
})