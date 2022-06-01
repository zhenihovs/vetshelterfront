import { useState, useEffect } from "react";

import useOrganizationService from "../../services/OrganizationService";
import AddOrganizationForm from "./AddOrganizationForm";
import ChangeOrganizationForm from "./ChangeOrganizationForm";
import useAuth from "../../hook/useAuth";
import { CSVLink } from "react-csv";


import "../../style/MainContent.scss";



const OrganizationsRegistry = () => {
    
    const {getOrganizations, deleteOrganization} = useOrganizationService();
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [addFormShowed, setAddFormShowed] = useState(false);
    const [changeFormShowed, setChangeFormShowed] = useState(false);
    const {role, isAuth} =  useAuth();

  
    useEffect(()=> {
        onRequest();
    }, []);

    const onRequest = () => {
        // console.log('getORG');
        getOrganizations().then(onOrganizationsLoaded) ;
    }

    const onOrganizationsLoaded = (newOrganizations) => {
        setOrganizations(newOrganizations);
    }

   

    const onTRClick = (id) => {
        if(selectedOrg === id) {
            setSelectedOrg(null);
        }
        else{
            setSelectedOrg(id);
        }
        
    }

    const onDeleteBtnClick =  () => {
        if(selectedOrg){
            deleteOrganization(selectedOrg).then(onRequest);
            onTRClick(selectedOrg);
        }
       
    }

    const onAddBtnClick = () => {
        setAddFormShowed(true);
    }

    const onChangeBtnClick = () => {
        if(selectedOrg){
            setChangeFormShowed(true);
        }
       
    }

    // const headers = [
    //     { label: "id", key: "id" },
    //     { label: "org_name", key: "org_name" },
    //     { label: "country", key: "country" },
    //     { label: "address", key: "address" },
    //     { label: "inn", key: "inn" },
    //     { label: "kpp", key: "kpp" },
    //     { label: "phone", key: "phone" },
    //     { label: "email", key: "email" }
    //   ];
      
           
    const items = renderItems(organizations);

    function renderItems(arr) {
        return arr.map((item, i) => 
        {
            let trClasses = "";
            if (selectedOrg === item.id){
                trClasses += "selected";
            }

            return (
                <tr onClick={() => onTRClick(item.id)} className={trClasses} key={item.id}><td>{item.org_name}</td><td>{item.country}</td><td>{item.address}</td><td>{item.inn}</td><td>{item.kpp}</td><td>{item.phone}</td><td>{item.email}</td></tr>
            )
        });

    }
  
    const addForm =  addFormShowed ? <AddOrganizationForm organizations={organizations} setOrganizations={setOrganizations} changeShowed={setAddFormShowed} /> : null;
    const changeForm =  changeFormShowed && selectedOrg ? <ChangeOrganizationForm currentOrganization={organizations.filter(org=>org.id===selectedOrg)} id={selectedOrg} /* organizations={organizations} */ setOrganizations={setOrganizations} changeShowed={setChangeFormShowed}/> : null;
    const disabled = selectedOrg? false: true;
    return (
        
        <div className="organizationsContent">
            <div className="buttons">
                <div className="buttons__crud">
                    {isAuth&&role==="ADMIN" ? <button onClick={onAddBtnClick}>Добавить</button> : null }
                    {isAuth&&role==="ADMIN" ?<button disabled={disabled} onClick={onChangeBtnClick}>Изменить</button> :null}
                    {isAuth&&role==="ADMIN" ?<button disabled={disabled} onClick={onDeleteBtnClick}>Удалить</button>:null}
                </div>
               {isAuth ? <CSVLink className="btn_dwnl" data={organizations} separator={";"}  filename={"Организации.csv"}><i className="fa-solid fa-file-csv"></i></CSVLink>: null }
              
            </div>


            <table className="table" id="organizationsTable">
                <tbody>
                    <tr className="tableHeader"><th>Название</th><th>Страна</th><th>Адрес</th><th>ИНН</th><th>КПП</th><th>Телефон</th><th>Почта</th></tr>
                    {items}
                   
                </tbody>
            </table>

            {addForm}
            {changeForm}
           
        </div>
    )
}
 
export default OrganizationsRegistry;

