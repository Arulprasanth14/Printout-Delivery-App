import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

type Order = {
  id: number;
  user_id: number;
  order_type: string;
  status: string;
  total_amount: string;
  number_of_items: number;
  created_at: string;
  updated_at: string;
};

export default function OrdersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromPage = params.from;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://10.16.49.220:5000/api/orders/');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = orders
    .reduce((sum, order) => sum + parseFloat(order.total_amount), 0)
    .toFixed(2);
  const totalOrders = orders.length;

  const handleBack = () => {
    if (fromPage === 'home') {
      router.replace('/User_Home');
    } else if (fromPage === 'profile') {
      router.replace('/user_edit_profile'); 
    }else {
      router.replace('/User_Home'); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => handleBack()}>
          <Image source={require('../../assets/images/Back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Orders</Text>
      </View>

      {/* Content */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#37546a" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ScrollView>
      )}

      {/* Total Frame */}
      <View style={styles.totalFrame}>
        <Text style={styles.totalText}>Total Orders: {totalOrders}</Text>
        <Text style={styles.totalText}>Total Amount: ${totalAmount}</Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}

const OrderCard = ({ order }: { order: Order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'order_created':
        return '#FFC107'; // Yellow
      case 'owner_accepted_order':
        return '#2196F3'; // Blue
      case 'payment_waiting':
        return '#FF5722'; // Orange
      case 'printing_in_process':
        return '#4CAF50'; // Green
      default:
        return '#9E9E9E'; // Grey
    }
  };

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>Order #{order.id}</Text>
        <Text style={styles.orderDate}>{new Date(order.created_at).toLocaleDateString()}</Text>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.detailText}>{order.number_of_items} items</Text>
        <Text style={styles.detailText}>${order.total_amount}</Text>
      </View>

      <View style={[styles.statusContainer, { backgroundColor: getStatusColor(order.status) }]}>
        <Text style={styles.statusText}>{order.status.replace(/_/g, ' ')}</Text>
      </View>
    </View>
  );
};

const BottomNavigation = () => {
  const router = useRouter();

  const handleProfileNavigate = () => {
    router.push({ pathname: '/user_edit_profile', params: { from: 'order' } });
  };
  

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push("/User_Home")}>
        <Image source={require('../../assets/images/nav_Home.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Image source={require('../../assets/images/cur_Shopping Cart.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => handleProfileNavigate()}>
        <Image source={require('../../assets/images/nav_User.png')} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 120,
  },
  totalFrame: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    backgroundColor: '#FBFBFB',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eaeff2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a3440',
  },
  header: {
    width: width,
    height: height * 0.25,
    backgroundColor: '#37546a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  headerText: {
    fontSize: 48,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
  },
  orderCard: {
    width: width * 0.9,
    backgroundColor: '#fbfbfb',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a3440',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textTransform: 'capitalize',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    paddingVertical: 1,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eaeff2',
    elevation: 10,
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    width: 35,
    height: 35,
  },
});
