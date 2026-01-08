import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, Stack } from "expo-router";
/* import { format } from "date-fns"; */
import { ORDERS } from "../../../../assets/orders";
import { Order, OrderStatus } from "../../../../assets/types/order";

/* import { Tables } from '../../../types/database.types';
import { getMyOrders } from '../../../api/api'; */

/* This line creates a TypeScript object that maps order status values from your data to display text:
 */

const statusDisplayText:Record<OrderStatus,string>={
Pending:'Pending',
Completed:'Completed',
Shipped:'Shipped',
InTransit:'In Transit',

}

/*  a f WİT ListRenderItem type for renderİtem on FlatList
 */
const renderItem: ListRenderItem<Order> = ({ item }) => (
  // link to every order details ([slug.tsx]) after pressing to any order
  <Link href={`/orders/${item.slug}`} asChild>
    <Pressable style={styles.orderContainer}>
      {/* first view for order conatiner
       */}
      <View style={styles.orderContent}>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderItem}>{item.slug}</Text>
          <Text style={styles.orderDetails}>{item.details}</Text>
          <Text style={styles.orderDate}>
            {item.date}
          </Text>
        </View>
              {/* 2 view for order statusBadge
       */}
        <View  /* we have array here styles[`statusBadge_${item.status}`] bcs in styleSheet we have it as type */
          style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}
        >
          <Text style={styles.statusText}>{statusDisplayText[item.status]}</Text>
        </View>
      </View>
    </Pressable>
  </Link>
);

const Orders = () => {
   /* const { data: orders, error, isLoading } = getMyOrders();

  if (isLoading) return <ActivityIndicator />;

  if (error || !orders) return <Text>Error: {error?.message}</Text>;

  if (!orders.length) 
    return (
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          textAlign: "center",
          padding: 10,
        }}
      >
        No orders created yet
      </Text>
    );
 */
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id.toString()}
/*         bring the renderItem f that we defined above 
 */        renderItem={renderItem}
      />
    </View>
  );
};

export default Orders;

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDetails: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  statusBadge_Pending: {
    backgroundColor: "#ffcc00",
  },
  statusBadge_Completed: {
    backgroundColor: "#4caf50",
  },
  statusBadge_Shipped: {
    backgroundColor: "#2196f3",
  },
  statusBadge_InTransit: {
    backgroundColor: "#ff9800",
  },
});
