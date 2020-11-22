import React from 'react';
import { Text, View } from 'react-native';

const Encabezado = (props) => {
    const { viewStyle, textStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>Menú</Text>
            <Text style={textStyle}>{props.tituloEncabezado}</Text>
            <Text style={textStyle}>Nuevo</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        paddingTop: 20,
        backgroundColor: '#666',
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 6
    },
    textStyle: {
        color: '#fff'
    }
};

export default Encabezado;
