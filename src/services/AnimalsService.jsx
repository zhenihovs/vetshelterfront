import Server from  './Server';

const useAnimalsService = () => {

    const getAnimals = async (event) => {
        let res = await fetch( `${Server}/animals/`, {
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


    const deleteAnimal =  async (idOrg) => {
        
        const id = {
            id: idOrg
        };

        await fetch(`${Server}/animals/`, 
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

    

    const postAnimal = async (data) => {
        const res = await fetch(`${Server}/animals/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    };

    const putAnimal = async (data) => {
        const res = await fetch(`${Server}/animals/`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    };
    
    return {getAnimals, deleteAnimal, postAnimal, putAnimal}
}

export default useAnimalsService;