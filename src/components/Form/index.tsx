import * as Linking from 'expo-linking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  ButtonStyled,
  TextInputStyled,
  TextStyled,
  ViewStyled,
} from '../../config/Nativewind';

import { ActivityIndicator, Alert } from 'react-native';
import { FONT } from '../../utils/fonts';

import { useUser } from '../../context';

interface FormProps {
  joinRoom: boolean;
}

export const Form = ({ joinRoom }: FormProps) => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [roomDefault, setRoomDefault] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { navigate } = useRouter();
  const { connectRoom } = useUser();
  const url = Linking.useURL();
  const params = useLocalSearchParams<{ room: string }>();

  const handleJoinRoom = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let nameRoom = room ? room : params.room?.replaceAll('-', ' ');
    if (name && nameRoom) {
      connectRoom(name, nameRoom);
      navigate('room');
    } else {
      Alert.alert(
        'Campos Inválidos',
        'Campos obrigatórios não podem estar incompletos!'
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log('DEEP LINKING', url);
  }, [url]);

  useEffect(() => {
    if (params.room) {
      setRoomDefault(params.room?.replaceAll('-', ' '));
    }
  }, [params]);

  return (
    <ViewStyled className='flex w-full'>
      <TextInputStyled
        placeholder='Seu Nome'
        placeholderTextColor={'#d8d8d8'}
        cursorColor={'#fff'}
        onChangeText={(t) => setName(t)}
        value={name}
        style={{
          fontFamily: FONT.ROBOTO_REGULAR,
        }}
        className='w-80 h-16 pl-4 rounded-md bg-[#222222] text-zinc-300'
      />
      {joinRoom ? (
        <ViewStyled className='mt-4'>
          <TextInputStyled
            placeholder='Código da sala'
            placeholderTextColor={'#d8d8d8'}
            cursorColor={'#fff'}
            onChangeText={(t) => setRoom(t)}
            value={room ? room : roomDefault}
            style={{
              fontFamily: FONT.ROBOTO_REGULAR,
            }}
            className='w-80 h-16 pl-4 rounded-md bg-[#222222] text-zinc-300'
          />
          <ButtonStyled
            onPress={handleJoinRoom}
            className='bg-white w-52 h-12 flex flex-col items-center justify-center self-center mt-4 rounded-xl'
          >
            {loading ? (
              <ActivityIndicator size={'small'} color={'#222'} />
            ) : (
              <TextStyled
                style={{
                  fontFamily: FONT.ROBOTO_BOLD,
                }}
                className='text-black text-[15px]'
              >
                ENTRAR
              </TextStyled>
            )}
          </ButtonStyled>
        </ViewStyled>
      ) : (
        <ViewStyled className='mt-4'>
          <TextInputStyled
            placeholder='Nome da sala'
            placeholderTextColor={'#d8d8d8'}
            cursorColor={'#fff'}
            onChangeText={(t) => setRoom(t)}
            value={room}
            style={{
              fontFamily: FONT.ROBOTO_REGULAR,
            }}
            className='w-80 h-16 pl-4 rounded-md bg-[#222222] text-zinc-300'
          />
          <ButtonStyled
            onPress={handleJoinRoom}
            className='bg-white w-52 h-12 flex flex-col items-center justify-center self-center mt-4 rounded-xl'
          >
            {loading ? (
              <ActivityIndicator size={'small'} color={'#222'} />
            ) : (
              <TextStyled
                style={{
                  fontFamily: FONT.ROBOTO_BOLD,
                }}
                className='text-black text-[15px]'
              >
                CRIAR
              </TextStyled>
            )}
          </ButtonStyled>
        </ViewStyled>
      )}
    </ViewStyled>
  );
};
