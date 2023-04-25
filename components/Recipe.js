import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

const Recipe = ({ route }) => {
  const { recipe } = route.params;

  return (
    <>
      <View style={styles.recipe_container}>
        {/* <Text>{`${recipe.strInstructions}`}</Text> */}
        <Text style={styles.recipe_title}>Instructions</Text>
        <Text style={styles.recipe}>{recipe.strInstructions}</Text>
      </View>
    </>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  recipe_container: {
    width: 340,
    height: 500,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
  },
  recipe_title: {
    margin: 20,
    fontSize: 20,
  },
});
