import React, { useState, useRef, useEffect } from 'react';

function ImageView() {
    // State example
    const [count, setCount] = useState(0);

    // Ref example
    const inputRef = useRef<HTMLInputElement>(null);

    // Effect example
    useEffect(() => {
        // Code to run on component mount or update
        console.log('Component mounted or updated');

        // Code to run on component unmount
        return () => {
            console.log('Component unmounted');
        };
    }, []);

    return (
        <div>
            <h1>ImageView Component</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <input ref={inputRef} type="text" />
        </div>
    );
}

export default ImageView;