import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

import styles from "./Styles";
import colors from '../../colors'

export default function ModalWarningFood(props) {

    const [show, setShow] = useState(props.show);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            onRequestClose={() => props.navigation.goBack()} //Back de android
        >
            <View style={styles.modalFilter}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>¡Cuidado!</Text>
                    <Text style={styles.description}>
                        Dada la patología informada, se recomiendo no ingerir {props.msg}.
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={() => setShow(false)}>
                        <Text style={styles.buttonText}>Seguir leyendo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
