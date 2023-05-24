import { Home } from 'pages/app/home';
import { HomeComponent } from 'pages/app/home/container/HomeContainer';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/home' element={<HomeComponent />} />
            <Route path='*' element={<div>Not Found</div>} />
        </Routes>
    );
}

export default AppRouter;
