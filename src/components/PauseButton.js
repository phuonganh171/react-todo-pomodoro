import React from 'react';
import { AiFillPauseCircle } from 'react-icons/ai';

function PauseButton(props) {
    return ( 
        <button {...props}>
            <AiFillPauseCircle size="50px" 
            cursor="pointer"
            color='#161a2b'/>
        </button>
     );
}

export default PauseButton;