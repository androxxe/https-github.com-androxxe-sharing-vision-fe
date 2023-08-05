import { useEffect, useRef } from "react";

export default function useComponentDidMount(): boolean {
  const ref = useRef();
  useEffect(() => {
    // @ts-ignore
    ref.current = true;
  }, []);

  return ref.current ? true : false;
}
