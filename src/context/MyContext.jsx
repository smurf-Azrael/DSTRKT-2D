// MyContext.tsx
import { createContext } from 'react';

const defaultContext = {
    openDribble: null,
    openNav: false,
    isEnd: false,
    updateDribble: (newData) => { },
    updateNav: (newData) => { },
    updateEnd: (newData) => { }
};

const MyContext = createContext(defaultContext);

export default MyContext;