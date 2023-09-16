

import { useEffect, useState } from 'react';
import { darkModeStore } from '../stores/store';
import { IconsReact } from './IconsReact';


export const DarkModeInput = () => {
    const [iconActive, setIconActive] = useState({sun: null, moon: null })
   
    useEffect(() => {
        setIconActive({sun: darkModeStore.value ? false : true, moon: darkModeStore.value ? true : false })
    
    
    }, [])
    
    const darkmode = () => {
        if (darkModeStore.value) {
            
            darkModeStore.set(false);
            setIconActive({sun: true, moon: false })
           
                
            } else {
                
                darkModeStore.set(true);
                setIconActive({sun: false, moon: true })
              
           
        }
    };


  return (
    <div className="scale-[.2]">
    <input
        className="w-0 h-0 hidden peer mierda"
        type="checkbox"
        id="darkmodeinput"
        onChange={darkmode}
    />
    <label
        className="duration-300 w-[500px] h-[200px] relative block bg-[#ebebeb] rounded-[200px] shadow-[inset_0px_5px_15px_rgba(0,0,0,0.4),inset_0px_-5px_15px_rgba(255,255,255,0.4)] cursor-pointer after:duration-300 after:w-[180px] after:h-[180px] after:absolute after:top-[10px] after:left-[10px] after:bg-gradient-to-b after:from-[#ffcc89] after:to-[#d8860b] after:rounded-[180px] after:shadow-[0px_5px_10px_rgba(0,0,0,0.2)] peer-checked:bg-[#242424] after:peer-checked:left-[490px] after:peer-checked:translate-x-[-100%] after:peer-checked:bg-gradient-to-b after:peer-checked:from-[#777] after:peer-checked:to-[#3a3a3a] after:active:w-[260px]"
           htmlFor='darkmodeinput'
        >
        <IconsReact

            css={` absolute w-[120px] top-[40px] z-50 left-[340px] duration-300 ${iconActive.sun ? 'fill-[#7e7e7e]' : 'fill-[#fff]'}`}
            name="moon"
        />
        <IconsReact
            css={` absolute w-[120px] top-[40px] z-50 left-[40px] duration-300 ${iconActive.moon ? 'fill-[#7e7e7e]' : 'fill-[#fff]'}`}
            name="sun"
        />
    </label>
</div>
  )
}
    
    

