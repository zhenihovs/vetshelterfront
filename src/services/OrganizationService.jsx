import Server from  './Server';

const useOrganizationService = () => {

    const getOrganizations = async (event) => {
        let res = await fetch( `${Server}/organizations/`, {
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


    const deleteOrganization =  async (idOrg) => {
        
        const id = {
            id: idOrg
        };

        await fetch(`${Server}/organizations/`, 
            {
                method: "DELETE", 
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(id)
            }
        );
    };

    

    const postOrganization = async (data) => {
        const res = await fetch(`${Server}/organizations/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    };

    const putOrganization = async (data) => {
        const res = await fetch(`${Server}/organizations/`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    };
    
    return {getOrganizations, deleteOrganization, postOrganization, putOrganization}
}

export default useOrganizationService;