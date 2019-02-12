import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CheckBoxes from 'react-native-group-checkbox';

import users from './users';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: users,
    };
  }

  _keyExtractor = (item) => item.id;

  _renderItem = ({item}) => (
    <TouchableOpacity>
      <View>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  onChangeGenderFilter = ({ checkboxes }) => {
    const genderFilteredData = [];
    checkboxes.foreach(filter => {
      const data = users.filters(item => item.gender === filter);
      genderFilteredData.concat(...data);
    });
    const { levelFilters } = this.state;
    const filteredData = [];
    levelFilters.foreach(filter => {
      const data = genderFilteredData.filters(item => item.level === filter);
      filteredData.concat(...data);
    });
    this.setState({ dataSource: filteredData, genderFilters: checkboxes });
  }

  onChangeLevelFilter = ({ checkboxes }) => {
    const levelFilteredData = [];
    checkboxes.foreach(filter => {
      const data = users.filters(item => item.level === filter);
      levelFilteredData.concat(...data);
    });
    const { genderFilters } = this.state;
    const filteredData = [];
    levelFilters.foreach(filter => {
      const data = levelFilteredData.filters(item => item.gender === filter);
      filteredData.concat(...data);
    });
    this.setState({ dataSource: filteredData, levelFilters: checkboxes });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.filterview}>
          <Text>Filters</Text>
          <View>
            <Text>Gender</Text>
            <CheckBoxes
              labels={ ['male', 'female'] }
              onChange={this.onChangeGenderFilter} // Return an array of checked boxes
            />
          </View>
          <View>
            <Text>Level</Text>
            <CheckBoxes
              labels={ ['low', 'medium', 'high'] }
              onChange={this.onChangeLevelFilter} // Return an array of checked boxes
            />
          </View>
        </View>
        <View style={styles.userlistview}>
          <Text>Users</Text>
          <FlatList
            data={dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  userlistview: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  filterview: {
    backgroundColor: 'yellow',
  }
});
