import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const App = () => {
  const [splash, setsplash] = useState(true);
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPlace();
    return () => {};
  }, []);

  const fetchPlace = () => {
    const menuItems = [
      {id: '1', Place: 'Kallara'},
      {id: '2', Place: 'Pangode'},
      {id: '3', Place: 'Bharathannoor'},
      {id: '4', Place: 'Palode'},
      {id: '5', Place: 'Chithara'},
      {id: '6', Place: 'Pazhavila'},
      {id: '7', Place: 'Kummil'},
      {id: '8', Place: 'Kadakka'},
      {id: '9', Place: 'Nedumangadu'},
      {id: '10', Place: 'Kochalummodu'},
      {id: '11', Place: 'Palvali'},
      {id: '12', Place: 'Karate'},
    ];
    setfilterdData(menuItems);
    setmasterData(menuItems);
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.Place
          ? item.Place.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(masterData);
      setSearch(text);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setsplash(false);
    }, 2500);
  }, []);
  const ItemView = ({item}) => {
    return (
      <View
        style={{
          height: height * 0.1,
          width: width * 0.94,
          backgroundColor: '#F56E27',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff'}}>
          {item.id}
          {'. '}
          {item.Place}
        </Text>
      </View>
    );
  };
  if (splash) {
    return (
      <SafeAreaView>
        <View>
          <View
            style={{
              height: height,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F56E27',
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25}}>
              Search App
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View>
          <TextInput
            value={search}
            placeholder="search here"
            underlineColorAndroid="transparent"
            style={styles.textInputStyle}
            onChangeText={text => {
              searchFilter(text);
            }}
          />
          <FlatList
            data={filterdData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white',
  },
});

export default App;
