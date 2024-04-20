import { useRouter } from 'expo-router';
import { ShareNetwork, SignOut } from 'phosphor-react-native';
import { Alert, Share } from 'react-native';

import { useUser } from '../../context';

import {
  ButtonStyled,
  ImageStyled,
  TextStyled,
  ViewStyled,
} from '../../config/Nativewind';

import { FONT } from '../../utils/fonts';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const { room, logout } = useUser();
  const { back } = useRouter();

  const share = async () => {
    try {
      await Share.share({
        message: 'https://your-domain.com.br/join-room?room=' + room,
        url: 'https://your-domain.com.br/join-room?room=' + room,
        title: room,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Sair da sala?', 'Você tem certeza que deseja sair da sala?', [
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
    ]);
  };

  return (
    <ViewStyled className='bg-black flex flex-row items-center justify-between'>
      <ViewStyled className='flex flex-row items-center mt-6 ml-2'>
        <ImageStyled
          className='w-14 h-14'
          source={require('../../../assets/TalkRoom-Icon.png')}
        />
        <TextStyled
          style={{
            fontFamily: FONT.ROBOTO_BLACK,
          }}
          className='text-[#9841c6] ml-2 text-[18px]'
        >
          {room}
        </TextStyled>
      </ViewStyled>
      <ViewStyled className='flex flex-row items-center mt-6 mr-2'>
        <ButtonStyled onPress={share} className='mx-[10px]' activeOpacity={0.8}>
          <ShareNetwork size={24} color='white' weight='regular' />
        </ButtonStyled>
        <ButtonStyled onPress={handleLogout} activeOpacity={0.8}>
          <SignOut size={24} color='white' weight='regular' />
        </ButtonStyled>
      </ViewStyled>
    </ViewStyled>
  );
};
