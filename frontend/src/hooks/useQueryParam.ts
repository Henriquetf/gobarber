import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useQueryParam(name: string): string | null {
  const location = useLocation();

  const queryString = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return params.get(name);
  }, [location.search, name]);

  return queryString;
}
