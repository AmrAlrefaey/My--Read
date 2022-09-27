import React, { useState, useEffect } from 'react'
import * as BooksAPI from '..//BooksAPI'

import { useDebounce } from 'use-debounce';


export default function useQuery(query) {

    const [searchBooks, setSearchBooks] = useState([]);
    const [value] = useDebounce(query, 500);

    useEffect(() => {

        let isActive = true;
        if (value) {
            BooksAPI.search(value).then(data => {
                if (data.error) {
                    setSearchBooks([])
                } else {
                    if (isActive) {
                        setSearchBooks(data);
                    }
                }
            })
        }

        return () => {
            isActive = false;
            setSearchBooks([])
        }

    }, [value])


    return [searchBooks, setSearchBooks];

}