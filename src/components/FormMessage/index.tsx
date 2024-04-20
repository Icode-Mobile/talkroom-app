import { PaperPlaneTilt } from 'phosphor-react-native';
import { useState } from 'react';

import { useUser } from '../../context';

import {
  ButtonStyled,
  TextInputStyled,
  ViewStyled,
} from '../../config/Nativewind';

import { FONT } from '../../utils/fonts';

interface FormMessageProps {}

export const FormMessage = ({}: FormMessageProps) => {
  const [message, setMessage] = useState<string>('');
  const { sendMessage } = useUser();

  return (
    <ViewStyled className='flex flex-row items-center justify-between bg-black w-full h-[60px] px-4'>
      <TextInputStyled
        placeholder='Digite uma mensagem...'
        placeholderTextColor={'#9841c6'}
        cursorColor={'#fff'}
        onChangeText={(t) => setMessage(t)}
        value={message}
        className='bg-[#212121] w-[90%] h-12 rounded-xl pl-2 text-white text-[13px]'
        style={{
          fontFamily: FONT.ROBOTO_MEDIUM,
        }}
      />
      <ButtonStyled
        activeOpacity={0.8}
        disabled={!message}
        onPress={() => {
          sendMessage(message);
          setMessage('');
        }}
      >
        <PaperPlaneTilt
          size={28}
          color={message ? '#fff' : '#bbb'}
          weight='regular'
        />
      </ButtonStyled>
    </ViewStyled>
  );
};
