
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Encabezado from './src/componentes/encabezado';
import Display from './src/componentes/display';

const App = () => {
  return (
    <View>
      <Encabezado tituloEncabezado={'Reloj Mundial'} />
      <Display ciudad={'Bogotá'} hora={'12:36 pm'} fecha={'3 de Julio'} />
    </View>
  );
};

AppRegistry.registerComponent('reloj', () => App);
