import { ObjectEncodingOptions } from 'fs';
import { createContext } from 'react';

export const ItemContext = createContext({
    itemObj: {},
    setItemObj: (language: string) => {}
});

export const OurPostContext = createContext({
    ourPostState: false,
    setOurPostState: (language: boolean) => {}
});

export const DetailPostContext = createContext({
    detailPost: {},
    setDetailPost: (language: object) => {}
});

export const UserLoginContext = createContext({
    userLoginState: false,
    setUserLoginState: (language: boolean) => {}
});