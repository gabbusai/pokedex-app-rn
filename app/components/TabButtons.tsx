import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SectionType } from '../services/types/Pokemon'
import { COLORS } from '../services/colors'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'



export type TabButtonProps = {
    sections: SectionType[],
    setSelectedTab: (index: number) => void,
    selectedTab: number,
    pokeColor: string,
    font: string,
}
export default function TabButtons({ sections, setSelectedTab, selectedTab, font, pokeColor} : TabButtonProps) {

    //set dimensions
    const [dimensions, setDimensions] = useState({ height: 40, width: 200});
    const buttonWidth = dimensions.width / sections.length;

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        })
    }

    

    const tabPositionX = useSharedValue(0);

    const handlePress = (index: number) => {
        setSelectedTab(index);
    }
    const onTabPress = (index: number) => {
        tabPositionX.value = withTiming(buttonWidth * index, {}, 
            () => {
                runOnJS(handlePress)(index);
            })
    }

    const animatedStyle = useAnimatedStyle(() => {
        return{
            transform: [
                {translateX: tabPositionX.value,}
            ]
        }
    })

  return (
    <View style={{ 
        backgroundColor: COLORS.light,
        borderRadius:20, 
        justifyContent:'center',
     }}>

    <Animated.View style={[animatedStyle,{
        position: 'absolute',
        top: 50,
        backgroundColor: pokeColor,
        borderRadius: 5,
        marginHorizontal: 10,
        height: dimensions.height -63,
        width: buttonWidth - 20,}]}
    />

<View style={{ 
                flexDirection:'row'
            }}
            onLayout={onTabbarLayout}
            >
            {
                sections.map((section, index) => {
                    const color = selectedTab === index ? pokeColor : COLORS.dark01
                    return(
                        <Pressable onPress={() => onTabPress(index)} key={index}
                        style={{ 
                            flex: 1,
                            paddingVertical: 20
                        }}>
                            <Text style={{ 
                                color: color ,
                                alignSelf: 'center',
                                fontSize: 18,
                                fontFamily: font
                                }}
                                >{section.title}</Text>
                        </Pressable>
                    )
                })
            }
            </View>


        

    </View>
  )
}

const styles = StyleSheet.create({})



/*

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

*/