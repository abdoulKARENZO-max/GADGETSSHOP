import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import { PRODUCTS } from "../../../assets/products";
import { ProductListItem } from "../components/product-list-item";
import { ListHeader } from "../components/list-header";

const Home = () => {
  const Container = Platform.OS === "web" ?   ScrollView  : SafeAreaView;

  return (
    <Container style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => (
          <View>
            <ProductListItem product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        scrollEnabled={false}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
  },
});
