import { useState, useEffect } from "react";
import useInfoService from "../../services/InfoService";
import { CSVLink } from "react-csv";


import "../../style/MainContent.scss";


const OrgsRegistry = () => {
    const [orgs, setOrgs] = useState([]);
    const {getOrgs} = useInfoService();
    


    useEffect(()=> {
        onRequest();
    }, []);

    const onRequest = () => {
        getOrgs().then(onOrgsLoaded) ;
    }

    const onOrgsLoaded = (newOrgs) => {
        setOrgs(newOrgs);
    }

    const items = renderItems(orgs);

    function renderItems(arr) {
        return arr.map((item, i) => 
        {
            return (
                <tr key={item.id}><td>{item.org_name}</td><td>{item.country + ", " + item.address}</td><td>{item.phone}</td><td>{item.email}</td><td>{item.pets_count}</td><td>{item.cats_count}</td><td>{item.dogs_count}</td></tr>
            )
        });

    }
    return (
        
        <div className="orgsContent">
            <div className="buttons">
                <div className="buttons__crud">

                </div>
               <CSVLink className="btn_dwnl" data={orgs} separator={";"}  filename={"Организации.csv"}><i className="fa-solid fa-file-csv"></i></CSVLink>
            </div>


            <table className="table" id="animalTable">
                <tbody>
                    <tr className="tableHeader"><th>Организация</th><th>Адрес</th><th>Телефон</th><th>Почта</th><th>Общее <br/> количество животных</th><th>Количество кошек</th><th>Количество собак</th></tr>
                    {items}
                   
                </tbody>
            </table>

        </div>
    )
 }
 
 export default OrgsRegistry;

