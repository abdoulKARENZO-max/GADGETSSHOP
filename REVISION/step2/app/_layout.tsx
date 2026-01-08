import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(shop)"
        options={{ headerShown: false, title: "Shop" }}
      />
      <Stack.Screen
        name="categories"
        options={{ headerShown: false, title: "Categories" }}
      />
      <Stack.Screen
        name="product"
        options={{ headerShown: false, title: "Product" }}
      />
      {/* the cart must be on modal that is why we use presentation:modal */}
      <Stack.Screen
        name="cart"
        options={{ presentation: "modal", title: "Shopping Cart" }}
      />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
