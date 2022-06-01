import Server from  './Server';

const useCategoriesService = () => {

    const getCategories = async (event) => {
        let res = await fetch( `${Server}/categories/`, {
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


    const deleteCategory =  async (idOrg) => {
        
        const id = {
            id: idOrg
        };

        await fetch(`${Server}/categories/`, 
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

    

    const postCategory = async (data) => {
        const res = await fetch(`${Server}/categories/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    };

    const putCategory = async (data) => {
        const res = await fetch(`${Server}/categories/`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    };
    
    return {getCategories, deleteCategory, postCategory, putCategory}
}

export default useCategoriesService;