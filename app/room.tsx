import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { useUser } from '../src/context';

import { FormMessage } from '../src/components/FormMessage';
import { Header } from '../src/components/Header';
import { ListMessages } from '../src/components/ListMessages';

export default function Room() {
  const { back } = useRouter();
  const { logout } = useUser();

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'Sair da sala?',
          'Você tem certeza que deseja sair da sala?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => {},
            },
            {
              text: 'Sair',
              onPress: () => {
                logout();
                back();
              },
            },
          ]
        );
        return true;
      }
    );
    return () => backhandler.remove();
  }, [BackHandler]);

  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
        backgroundColor: '#141414',
      }}
      onPress={Keyboard.dismiss}
    >
      <>
        <Header />
        <ListMessages />
        <FormMessage />
      </>
    </TouchableWithoutFeedback>
  );
}
