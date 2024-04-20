import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import {
  ImageStyled,
  ScrollViewStyled,
  TextStyled,
  TouchableWithoutFeedbackStyled,
  ViewStyled,
} from '../src/config/Nativewind';

import { FONT } from '../src/utils/fonts';

import { Form } from '../src/components/Form';

export default function JoinRoom() {
  const [showImage, setShowImage] = useState<boolean>(true);

  useEffect(() => {
    const event1 = Keyboard.addListener('keyboardDidShow', () => {
      setShowImage(false);
    });
    const event2 = Keyboard.addListener('keyboardDidHide', () => {
      setShowImage(true);
    });
    return () => {
      event1.remove();
      event2.remove();
    };
  }, [Keyboard]);

  return (
    <ScrollViewStyled className='flex-1 bg-[#141414]'>
      <TouchableWithoutFeedbackStyled
        onPress={Keyboard.dismiss}
        className='flex-1 bg-[#141414]'
      >
        <ViewStyled className='flex flex-col flex-1 bg-[#141414] items-center pt-20'>
          {showImage ? (
            <ImageStyled
              source={require('../assets/TalkRoom.png')}
              className='w-96 h-96'
            />
          ) : null}
          <TextStyled
            style={{
              fontFamily: FONT.ROBOTO_BLACK,
            }}
            className='text-white text-[18px]'
          >
            Entre na Sala
          </TextStyled>
          <ViewStyled className='mt-10'>
            <Form joinRoom />
          </ViewStyled>
        </ViewStyled>
      </TouchableWithoutFeedbackStyled>
    </ScrollViewStyled>
  );
}
