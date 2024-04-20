import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import io from 'socket.io-client';

import keys from '../config/keys/index.json';

interface MessageProps {
  author: string;
  text: string;
}

interface UserContextProps {
  name: string;
  room: string;
  messages: MessageProps[];
  connectRoom: (valueName: string, valueRoom: string) => void;
  sendMessage: (message: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

const socket = io(`${keys.SERVER_URL}`);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const connectRoom = (valueName: string, valueRoom: string) => {
    setName(valueName);
    setRoom(valueRoom);
    socket.emit('join room', valueRoom);
  };

  const sendMessage = (message: string) => {
    socket.emit('message', { room, message, author: name });
  };

  const logout = () => {
    setName('');
    setRoom('');
  };

  return (
    <UserContext.Provider
      value={{
        name,
        connectRoom,
        logout,
        room,
        sendMessage,
        messages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
