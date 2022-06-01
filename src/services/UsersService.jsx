import Server from  './Server';

const useUsersService = () => {

    const getUsers = async (event) => {
        let res = await fetch( `${Server}/users/`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!res.ok){
            throw new Error(`Could not fetch http://localhost:5000/organizations/, status: ${res.status}`)
        }
        return await res.json();
    };

    return {getUsers}
}

export default useUsersService;