import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList() {
    const [areFiltersVisible, setAreFiltersVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });


    function handleToogleFiltersVisible() {
        setAreFiltersVisible(!areFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        console.log(response.data);
        setAreFiltersVisible(false);
        setTeachers(response.data);
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
                   
                { areFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        
                        <Picker
                            style={styles.pickerComponent}
                            selectedValue={subject}
                            onValueChange={(itemValue) => setSubject(itemValue)}
                        >
                            <Picker.Item label="Selecione" value="" />
                            <Picker.Item label="Artes" value="Artes" />
                            <Picker.Item label="Biologia" value="Biologia" />
                            <Picker.Item label="Ciências" value="Ciências" />
                            <Picker.Item label="Educação Física" value="Educação Física" />
                            <Picker.Item label="Física" value="Física" />
                            <Picker.Item label="Geografia" value="Geografia" />
                            <Picker.Item label="História" value="História" />
                            <Picker.Item label="Matemática" value="Matemática" />
                            <Picker.Item label="Português" value="Português" />
                            <Picker.Item label="Química" value="Química" />
                        </Picker>
                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                
                                <Picker
                                    style={styles.pickerComponent}
                                    selectedValue={week_day}
                                    onValueChange={(itemValue) => setWeek_day(itemValue)}
                                >  
                                    <Picker.Item label="Selecione" value="" />
                                    <Picker.Item value="0" label="Domingo"  />
                                    <Picker.Item value="1" label="Segunda-feira"  />
                                    <Picker.Item value="2" label="Terça-feira"  />
                                    <Picker.Item value="3" label="Quarta-feira"  />
                                    <Picker.Item value="4" label="Quínta-feira"  />
                                    <Picker.Item value="5" label="Sexta-feira"  />
                                    <Picker.Item value="6" label="Sábado"  />
                                </Picker>
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    style={styles.input}
                                    placeholder='(ex.: 8:00)'
                                    placeholderTextColor= "#c1bccc"
                                />
                            </View>

                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
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
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)} 
                        />);
                })}
                
            </ScrollView>
        </View>
    );
}

export default TeacherList;