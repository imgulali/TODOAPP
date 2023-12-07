import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Tasks = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 18,
    marginRight: 20,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
  square: {
    width: 28,
    height: 28,
    backgroundColor: "#55bcf6",
    borderRadius: 4,
    opacity: 0.4,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontSize: 17,
  },
  circular: {
    width: 22,
    height: 22,
    borderColor: '#55bcf6',
    borderWidth: 2,
    borderRadius: 20,
  },
});

export default Tasks;
