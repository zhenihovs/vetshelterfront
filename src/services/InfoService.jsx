import Server from  './Server';

const useInfoService = () => {

    const getPets = async (event) => {
        let res = await fetch( `${Server}/info/pets`);

        if (!res.ok){
            throw new Error(`Could not fetch http://localhost:5000/organizations/, status: ${res.status}`)
        }
        return await res.json();
    };

    const getOrgs = async (event) => {
        let res = await fetch( `${Server}/info/orgs`);

        if (!res.ok){
            throw new Error(`Could not fetch http://localhost:5000/organizations/, status: ${res.status}`)
        }
        return await res.json();
    };
    
    return {getPets, getOrgs}
}

export default useInfoService;