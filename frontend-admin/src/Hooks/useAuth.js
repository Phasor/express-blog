
export default function useAuth(){
    return localStorage.getItem('token') ?  true :  false
}

