import React from "react";

export default function useStickyState(defaultValue, key, callback) {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
        if (callback) callback(value);
    }, [key, value]);
    
    return [value, setValue];
}