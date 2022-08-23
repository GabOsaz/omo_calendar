import React from 'react';
import { motion } from 'framer-motion';

const WhiteCard = ({ children }) => {

    return (
        <motion.div 
            className='bg-white myShadow rounded'
        >
            { children }
        </motion.div>
    )
}

export default WhiteCard
