import { useRef, useEffect } from "react";
import { useGlobalState } from "../state";

export function useSplashScreen() {
  const [,setLoading] = useGlobalState('loading')
  
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }, []);
  }