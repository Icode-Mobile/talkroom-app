import { useRouter } from 'expo-router';

import {
  ButtonStyled,
  ImageStyled,
  TextStyled,
  ViewStyled,
} from '../src/config/Nativewind';

import { FONT } from '../src/utils/fonts';

export default function App() {
  const { navigate } = useRouter();

  return (
    <ViewStyled className='flex flex-col flex-1 bg-[#141414] items-center justify-center'>
      <ImageStyled
        source={require('../assets/TalkRoom.png')}
        className='w-96 h-96'
      />
      <ViewStyled className='mt-10'>
        <ButtonStyled
          onPress={() => navigate('create-room')}
          className='bg-white w-80 h-16 rounded-md flex flex-col items-center justify-center'
        >
          <TextStyled
            style={{
              fontFamily: FONT.ROBOTO_MEDIUM,
            }}
            className='text-zinc-800 text-[18px]'
          >
            Criar uma sala
          </TextStyled>
        </ButtonStyled>
        <ButtonStyled
          onPress={() => navigate('[join-room]')}
          className='bg-transparent border border-white mt-4 w-80 h-16 rounded-md flex flex-col items-center justify-center'
        >
          <TextStyled
            style={{
              fontFamily: FONT.ROBOTO_MEDIUM,
            }}
            className='text-white text-[18px]'
          >
            Entrar na sala
          </TextStyled>
        </ButtonStyled>
      </ViewStyled>
    </ViewStyled>
  );
}
