import {
  StyleSheet,
  Text,
  View,
  Button,
  SectionList,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect, useState, useRef } from "react";

function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const boxContent = useRef();

  const apiKey = "454841219fcb4d07a42b0444b28bdebb";
  // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`

  async function getMeals() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast"
      );
      const data = await response.json();
      setData(data.meals);
      setLoading(false);
      console.log(data);

      if (!response.ok) {
        throw new Error(`HTTP status error ${response.status}`);
      }
    } catch (err) {
      if (err) throw err;
    }
  }

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.title}>
            <Text style={styles.title_text}>pabulu</Text>
          </View>
          <View style={styles.option_content}>
            <Button style={styles.option_button} title="Indian" />
            <Button style={styles.option_button} title="Chinese" />
            <Button style={styles.option_button} title="Snacks" />
          </View>
          <Text style={styles.option_title}>Popular</Text>
          <ScrollView style={styles.container}>
            <FlatList
              ref={boxContent}
              data={data}
              renderItem={({ item }) => (
                <View style={styles.card_container}>
                  <Image
                    style={styles.card_image}
                    source={{ uri: `${item.strMealThumb}` }}
                  />
                  <Text style={styles.card_title}>{item.strMeal}</Text>
                  <TouchableOpacity
                    title="recipe"
                    color={"orange"}
                    style={styles.card_button}
                    onPress={() => {
                      navigation.navigate("Recipe", { recipe: item.idMeal });
                    }}
                  >
                    <Text style={styles.card_button_text}>Recipe</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const colors = {
  orange: {
    color: "#dc8434",
  },
  fadegrey: {
    color: "#F6F6F7",
  },
  darkgrey: "#414147",
};

const styles = StyleSheet.create({
  card_container: {
    backgroundColor: "white",
    width: 340,
    height: 270,
    margin: 30,
    borderRadius: 10,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { wdith: 10, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  card_image: {
    width: "100%",
    height: 200,
    margin: "auto",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  card_title: {
    fontWeight: "bold",
    fontSize: 20,
    flexDirection: "row",
  },

  card_button: {
    backgroundColor: "orange",
    width: 100,
    height: 40,
    padding: 5,
    borderRadius: 20,
    marginLeft: 230,
    marginTop: -0,
  },
  card_button_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.fadegrey.color,
    marginTop: 20,
    width: 450,
    height: 900,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 90,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
  },
  title_text: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
  option_content: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    textAlign: "center",
  },
  option_button: {
    backgroundColor: "red",
  },
  option_title: {
    fontSize: 20,
    marginTop: 20,
    margin: 10,
  },
});

export default HomeScreen;
