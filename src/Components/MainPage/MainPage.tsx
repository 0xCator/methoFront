import React, { useState, useRef, useEffect } from 'react';

function MainPage() {
    // State example
    const [count, setCount] = useState(0);

    // Ref example
    const inputRef = useRef<HTMLInputElement>(null);

    // Effect example
    useEffect(() => {
        // Code to run on component mount or when count changes
        console.log('Component mounted or count changed');
        
        // Cleanup function (optional)
        return () => {
            console.log('Component unmounted');
        };
    }, [count]);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <input ref={inputRef} type="text" />
        </div>
    );
}

export default MainPage;