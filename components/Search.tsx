import { Feather } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import { View, Text } from './Themed';

export default function Search() {
  return (
    <View style={styles.container}>
      <Feather name='search' size={16} color={Colors.black} />
      <View style={styles.search}>
        <Text style={styles.searchText}>Search...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1
  },
  searchText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
    marginBottom: 5,
    color: Colors.grey
  }
});