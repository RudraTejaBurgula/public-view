import React, { useState, useEffect } from 'react'
import Axios from 'axios';
function List() {
    const [list, setList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:5000/details').then((response) => {
            setList(response.data)
        })
    }, [])
    return (
        <div>
            <div className='display'>
                {list.map((user) => {
                    return (
                        <div>
                            <h1>{user.doctor}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List