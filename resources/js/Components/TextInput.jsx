import { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <motion.input
            whileFocus={{ scale: 1.1 }}
            {...props}
            type={type}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:hover:border-indigo-600 focus:ring-indigo-500 dark:hover:ring-indigo-600 rounded-md shadow-sm transition duration-150 ease-in-out' +
                className
            }
            ref={input}
        />
    );
});
