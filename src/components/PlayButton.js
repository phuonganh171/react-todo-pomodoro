import React from 'react';
import {AiFillPlayCircle} from 'react-icons/ai'

 function PlayButton(props) {
    return ( 
        <button  {...props}>
            <AiFillPlayCircle size="50px" 
            cursor="pointer"
            color='#161a2b'
          />
        </button>
     );
 }
 
 export default PlayButton;