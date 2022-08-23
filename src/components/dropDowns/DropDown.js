import React, { } from 'react';
import { motion } from 'framer-motion';

const DropDown = ({ children, toggleDd }) => {

    const handleToggle = () => {
        toggleDd && toggleDd(false);
    };

    const pageAnime = {
        hidden: {
            opacity: 0,
            y: '-10px',
            transition: {
                duration: 0.3
            }
        },
        visible: { 
            opacity: 1,
          y: 0,
          transition: { duration: 0.3 }
        },
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={pageAnime}
        >
            { children }
            <button onClick={handleToggle} className={`cursor-default z-20 bg-transparent fixed inset-0 w-full h-full `}></button>
        </motion.div>
    )
}

export default DropDown
