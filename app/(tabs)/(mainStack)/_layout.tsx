import { Stack } from "expo-router";


export default function  StackLayout(){
    return(
        <Stack>
            <Stack.Screen name='index' options={{ title: 'Pokedex'}} />
            <Stack.Screen name='pokemon/[id]' options={{ title: 'Pokedex' }} />
        </Stack>
    )
}