// app/(tabs)/entry_page.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function EntryPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/user_registration');
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/PrintFlyers_logo_2_2.png')}
          style={styles.logoTop}
        />
      </View>
      <Image
        source={require('../../assets/images/PrintFlyers_logo_3.png')}
        style={styles.logoBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoTop: {
    width: 125,
    height: 124,
    resizeMode: 'contain',
  },
  logoBottom: {
    width: 256,
    height: 62,
    resizeMode: 'contain',
    marginTop: 16,
  },
});
