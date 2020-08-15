import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

import styles from './styles';

import TeacherItem from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';


function TeacherList() {
    const [areFiltersVisible, setAreFiltersVisible] = useState(false);

    function handleToogleFiltersVisible() {
        setAreFiltersVisible(!areFiltersVisible);
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToogleFiltersVisible}>
                        <Feather name="filter" size={20} color="#04d361" />
                        {/* <Text style={styles.filter}>Filtar por dia, hora e matéria</Text> */}
                    </BorderlessButton>)}> 
                    {/* <KeyboardAvoidingView
                        behavior={
                            Platform.OS === 'ios'
                            ? 'padding'
                            : 'height'
                            || 'android'
                            ? 'padding'
                            : 'height'
                        }
                    >
                        <TouchableWithoutFeedback onPress={}>

                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView> */}
                { areFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Qual matéria?'
                            placeholderTextColor= "#c1bccc"
                        />
                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Qual dia?'
                                    placeholderTextColor= "#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Qual horário?'
                                    placeholderTextColor= "#c1bccc"
                                />
                            </View>

                        </View>

                        <RectButton style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                        
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle= {{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                <TeacherItem/>
                <TeacherItem/>
                <TeacherItem/>
                <TeacherItem/>
            </ScrollView>
        </View>
    );
}

export default TeacherList;