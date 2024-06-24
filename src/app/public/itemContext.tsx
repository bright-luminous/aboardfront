import { createContext } from 'react';

export const ItemContext = createContext({
    itemObj: {},
    setItemObj: (language: string) => {}
});

export const OurPostContext = createContext({
    ourPostState: false,
    setOurPostState: (language: boolean) => {}
});