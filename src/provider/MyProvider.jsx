import React, { useState, ReactNode } from 'react';
import MyContext from '../context/MyContext';

const MyProvider = ({ children }) => {
    const [openDribble, setOpenDribble] = useState(null);
    const [openNav, setOpenNav] = useState(false);
    const [isEnd, setEnd] = useState(false);

    const updateDribble = (newData) => {
        setOpenDribble(newData);
    };

    const updateNav = (newData) => {
        setOpenNav(newData);
    };

    const updateEnd = (newData) => {
        setEnd(newData);
    };

    return (
        <MyContext.Provider value={{ openDribble, openNav, isEnd, updateDribble, updateNav, updateEnd }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider