import { useLocation } from 'react-router-dom';

// HOOK FROM REACT TRAINING: https://reactrouter.com/web/example/query-parameters
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default useQuery;
