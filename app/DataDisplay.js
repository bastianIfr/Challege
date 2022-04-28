import React,{ useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator, FlatList } from "react-native";


const DataDisplay = () => {
    const dataURL="https://amiiboapi.com/api/amiibo/?type=card"
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(dataURL)
            .then((response) => response.json())
            .then((json) => setData(json.amiibo))
            .catch((error) => alert(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            {isLoading ? (<ActivityIndicator />) : 
                (<FlatList
                    data={data}
                    keyExtractor={({id}, index) => id}
                    renderItem={({item}) => (
                        <Text>{item.name}</Text>
                    )}
                />
                )}
        </View>
    );


    
}

export default DataDisplay;