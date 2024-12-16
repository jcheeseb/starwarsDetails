import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Planets from './Planets';
import PlanetDetail from './PlanetDetail';
import Films from './Films';
import FilmDetail from './FilmDetail';
import Spaceships from './Spaceships';
import SpaceshipDetail from './SpaceshipDetail';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Planets">
        <Stack.Screen name="Planets" component={Planets} />
        <Stack.Screen name="PlanetDetail" component={PlanetDetail} />
        <Stack.Screen name="Films" component={Films} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
        <Stack.Screen name="Spaceships" component={Spaceships} />
        <Stack.Screen name="SpaceshipDetail" component={SpaceshipDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
