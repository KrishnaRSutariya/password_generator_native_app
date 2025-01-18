import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const { height } = Dimensions.get('window');

const PasswordGenerator = () => {

    const initialValues = {
        lowerCase: false,
        upperCase: false,
        numbers: false,
        symbols: false
    }

    const [isLoading, setIsLoading] = useState(false);
    const [number, setNumber] = useState(null);
    const [checkBox, setCheckbox] = useState(initialValues);
    const [password, setPassword] = useState(null);

    const handleSubmit = () => {
        setIsLoading(true);
        setPassword(null);
        if (!number || !Object.values(checkBox).some((value) => value)) return;

        let characters = '';
        if (checkBox.lowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (checkBox.upperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (checkBox.numbers) characters += '0123456789';
        if (checkBox.symbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let password = '';
        for (let i = 0; i < number; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(password);
        setIsLoading(false);
    }

    const handleReset = () => {
        setIsLoading(false);
        setNumber(null);
        setCheckbox(initialValues);
        setPassword(null);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Password Generator</Text>

            <View style={[styles.inputContainer]}>

                {/* Length */}
                <View style={styles.formFields}>
                    <Text style={styles.inputHeadingText}>Password Length</Text>
                    <TextInput
                        style={styles.inputNumber}
                        value={number}
                        onChangeText={(text) => setNumber(Number(text))}
                        placeholder="Ex. 8"
                        placeholderTextColor="#fff"
                    />
                </View>
                {isLoading && !number && <Text style={styles.errorText}>Please enter a number for password length</Text>}

                {/* Lowercase */}
                <View style={styles.formFields}>
                    <Text style={styles.inputHeadingText}>Including Lowercase Letters</Text>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                checkBox.lowerCase ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#FF6347' },
                            ]}
                            onPress={() => setCheckbox({ ...checkBox, lowerCase: !checkBox.lowerCase })}
                        />
                    </View>
                </View>

                {/* Uppercase */}
                <View style={styles.formFields}>
                    <Text style={styles.inputHeadingText}>Including Uppercase Letters</Text>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                checkBox.upperCase ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#FF6347' },
                            ]}
                            onPress={() => setCheckbox({ ...checkBox, upperCase: !checkBox.upperCase })}
                        />
                    </View>
                </View>

                {/* Numbers */}
                <View style={styles.formFields}>
                    <Text style={styles.inputHeadingText}>Including Numbers</Text>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                checkBox.numbers ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#FF6347' },
                            ]}
                            onPress={() => setCheckbox({ ...checkBox, numbers: !checkBox.numbers })}
                        />
                    </View>
                </View>

                {/* Symbols */}
                <View style={styles.formFields}>
                    <Text style={styles.inputHeadingText}>Including Symbols</Text>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                checkBox.symbols ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#FF6347' },
                            ]}
                            onPress={() => setCheckbox({ ...checkBox, symbols: !checkBox.symbols })}
                        />
                    </View>
                </View>
                {isLoading && !Object.values(checkBox).some((value) => value) && <Text style={styles.errorText}>Please select at least one option</Text>}

                <View style={[styles.formFields, { justifyContent: 'space-around' }]}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={[styles.buttonContainer, { backgroundColor: "#3498db" }]}>
                            <Text style={[styles.buttonText]}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReset}>
                        <View style={[styles.buttonContainer, { backgroundColor: "#95a5a6" }]}>
                            <Text style={[styles.buttonText]}>Reset</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {
                    password && (
                        <View style={[styles.outputScreen]}>
                            <View>
                                <Text style={[styles.buttonText, styles.fontSmall]}>Your Password: </Text>
                                <Text selectable={true} style={[styles.buttonText, styles.fontLarge]}>{password}</Text>
                            </View>
                        </View>
                    )
                }

            </View>
        </View>
    )
}

export default PasswordGenerator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: height - 40,
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 5
    },
    headingText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
        paddingVertical: 5
    },
    inputContainer: {
        paddingTop: 20,
    },
    inputHeadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
    },
    formFields: {
        marginVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputNumber: {
        width: 100,
        height: 50,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        fontSize: 20,
        color: 'white'
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-center',
        alignItems: 'center',
        margin: 20,
        paddingHorizontal: 25,
        paddingVertical: 13,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    outputScreen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },
    fontSmall: {
        color: 'black',
        fontSize: 15,
        marginBottom: 10,
    },
    fontLarge: {
        color: 'black',
        fontSize: 30,
    }

})