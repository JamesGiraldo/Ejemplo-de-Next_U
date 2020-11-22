import React from 'react';
import { Text, View } from 'react-native';

const Display = (props) => {
    const { contenedorExterior, 
            contenedorCiudad, 
            contenedorHoraFecha, 
            ciudadTexto, 
            horaTexto, 
            fechaTexto } = styles;
    return (
        <View style={contenedorExterior}>
            <View>
                <View style={contenedorCiudad}>
                    <Text style={ciudadTexto}>{props.ciudad}</Text>
                </View>
                <View style={contenedorHoraFecha}>
                    <Text style={horaTexto}>{props.hora}</Text>
                </View>
                <View style={contenedorHoraFecha}>
                    <Text style={fechaTexto}>{props.fecha}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = {
    contenedorExterior: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contenedorCiudad: {
        alignItems: 'flex-start'
    },
    contenedorHoraFecha: {
        alignItems: 'center'
    },
    ciudadTexto: {
        fontSize: 13
    },
    horaTexto: {
        fontSize: 50
    },
    fechaTexto: {
        fontSize: 30
    }
};

export default Display;

