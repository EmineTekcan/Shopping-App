import { Dimensions, Modal, StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import colors from '../config/colors'

const AskForLoginModal = ({ modalVisible, onClickSignIn, onClickSignUp,onClose }) => {
    return (
        <Modal
            visible={modalVisible
            } transparent
        >
            <View style={styles.modalView}>
                <View style={styles.mainView} >
                    <TouchableOpacity 
                    onPress={onClose}
                    style={styles.close}
                    >
                        <Image style={{ width: 25, height: 25 }} source={require('../images/close.png')} />
                    </TouchableOpacity>
                    <View style={{marginTop:width*0.06}}>
                        <CustomButton
                            bg={colors.orange}
                            color={colors.light}
                            title="Sign In"
                            onClick={onClickSignIn}
                        />
                        <CustomButton
                            bg={colors.orange}
                            color={colors.light}
                            title="Sign Up"
                            onClick={onClickSignUp}
                        />
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default AskForLoginModal

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    modalView: {
        width: width,
        height: height,
        position: "absolute",
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: "center",
        alignItems: "center"
    },
    mainView: {
        backgroundColor: "#fff",
        width: "90%",
        height: height * 0.35,
        borderRadius: 10
    },
    close: {
        position: "absolute",
        right: 15,
        top: 10
    }
})