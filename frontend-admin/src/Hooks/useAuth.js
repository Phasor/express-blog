
export default function useAuth(){
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

    // helper function that checks if a user is an Admin
    const checkIsAdmin = async (myToken) => {
        try{
                const response = await fetch(`${API_URL}/post/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': myToken
                    }
                })
                // console.log(`response status: ${response.status}`)
                if(response.status === 200){
                    return true
                } else {
                    return false
                }
            } catch(err){
                console.log(err)
            }
    }
   
    const token = localStorage.getItem('token')   
    if(token){ //logged in, check they are an admin
        return checkIsAdmin(token)
    } else{ //not logged in
        return false
    }
}
