import { ListRenderItemInfo } from 'react-native';

import { FONT } from '../../utils/fonts';

import { useUser } from '../../context';

import { ListStyled, TextStyled, ViewStyled } from '../../config/Nativewind';

type MessageProps = {
  author: string;
  text: string;
};

interface ListMessagesProps {}

export const ListMessages = ({}: ListMessagesProps) => {
  const { name, messages } = useUser();

  return (
    <ListStyled
      data={messages}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: ListRenderItemInfo<MessageProps>) => (
        <ViewStyled
          className={`flex flex-row w-80 h-auto ${
            item.author == name ? 'bg-white self-end' : 'bg-black self-start'
          } p-2 rounded-md mb-8`}
        >
          <ViewStyled className='flex flex-col items-center justify-center w-[28%]'>
            <ViewStyled className='border-[2px] border-[#9841c6] rounded-full bg-transparent w-[40px] h-[40px] flex flex-col items-center justify-center'>
              <TextStyled
                style={{
                  fontFamily: FONT.ROBOTO_REGULAR,
                }}
                className='text-[#9841c6] text-[20px]'
              >
                {item.author.charAt(0)}
              </TextStyled>
            </ViewStyled>
            <TextStyled
              style={{
                fontFamily: FONT.ROBOTO_BOLD,
              }}
              className='text-[#9841c6] text-[10px]'
            >
              {item.author}
            </TextStyled>
          </ViewStyled>
          <ViewStyled className='ml-5 w-[68%]'>
            <TextStyled
              style={{
                fontFamily: FONT.ROBOTO_MEDIUM,
              }}
              className={`${
                item.author == name ? 'text-black' : 'text-white'
              } text-[10px] leading-[14px] text-start pt-2`}
            >
              {item.text}
            </TextStyled>
          </ViewStyled>
        </ViewStyled>
      )}
      keyExtractor={(item, index) => String(index)}
      className='flex flex-col flex-1 bg-[#141414] pt-8 mx-5 mb-5'
    />
  );
};
