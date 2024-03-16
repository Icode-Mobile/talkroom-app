import { TextStyled, ViewStyled } from '../src/config/Nativewind';

export default function Room() {
  return (
    <ViewStyled className='flex flex-col flex-1 bg-[#141414] items-center justify-center'>
      <TextStyled className='text-white'>SALA</TextStyled>
    </ViewStyled>
  );
}
