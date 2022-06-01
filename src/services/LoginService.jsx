import Server from  './Server';

const useLoginService = () => {

    
    const postLogin = async (data) => {
        const res = await fetch(`${Server}/auth/login/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!res.ok) throw new Error(await res.json().then(data=>data.message));
        
        return await res.json();
    };

    const getAuth = async (token) => {
        const res = await fetch(`${Server}/auth/auth/`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!res.ok) throw new Error(await res.json().then(data=>data.message));
        return await res.json();
    };
    
    return {postLogin, getAuth}
}

export default useLoginService;