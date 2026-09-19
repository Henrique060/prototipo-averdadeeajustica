import { useState, useEffect } from 'react';
import './GoTop.css';
import { MdKeyboardArrowUp } from "react-icons/md";


const GoTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Function to check scroll position
        const toggleVisibility = () => {
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup function to remove listener when component unmounts
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button 
            className={`goTop ${isVisible ? 'show' : 'hide'}`} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Go to top"
        >
        <MdKeyboardArrowUp />

        </button>
    );
};

export default GoTop;