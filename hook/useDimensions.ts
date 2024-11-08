import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';


const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function useDimensions() {
    const [dimensions, setDimensions] = useState({
       window: windowDimensions,
       screen: screenDimensions,
     });
     const isMobile = 
   
     useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window, screen}) => {
            setDimensions({window, screen});
          },
        );
        return () => subscription?.remove();
      });

    return {dimensions}

}