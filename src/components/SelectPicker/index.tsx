import RNPickerSelect from 'react-native-picker-select';

export const SelectPicker = () => {
    return (
        <RNPickerSelect
            onValueChange={(itemValue) => console.log(itemValue)}
            items={[
                { label: 'Artes', value: 'Artes'},
                { label: 'Biologia', value: 'Biologia'},
                { label: 'Ciências', value: 'Ciências'},
                { label: 'Educação Física', value: 'Educação Física'},
                { label: 'Física', value: 'Física'},
                { label: 'Geografia', value: 'Geografia'},
                { label: 'História', value: 'História'},
                { label: 'Matemática', value: 'Matemática'},
                { label: 'Português', value: 'Português'},
                { label: 'Química', value: 'Química'},
            ]}
        />
    );
};