import React, { useState, useEffect } from "react";

const SearchBox = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        props.sendQueryToParent(searchQuery);
    }, [searchQuery]);

    return (
        <div className="flex items-center bg-[#2A2A2A] rounded-full pl-6 pr-4 py-2 w-full max-w-sm">
            <input
                type="text"
                placeholder="search . . ."
                className="bg-transparent bg-[#2A2A2A] outline-none placeholder-gray-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-[#ffffff] rounded-full p-2  ml-2" onClick={() => props.sendQueryToParent(searchQuery)}>
                <img src="./search.png" alt="search"/>
            </button>
        </div>
    );
};

export default SearchBox;
