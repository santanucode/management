import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import "./styles.scss";
import  { ScaleLoader  } from 'react-spinners';
const Loader = () => {
    return (
        // <Box sx={{ display: 'flex' }}>
        //     <CircularProgress />
        // </Box>
        <div className="loader-container">
            {/* <svg className="spinner" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg> */}
       <ScaleLoader  className="spinner" color="#fff" />
        </div>
    );
}

export default Loader;
