import { useState, useEffect } from "react";

import useAnimalsService from "../../services/AnimalsService";
import AddAnimalForm from "./AddAnimalForm";
import ChangeAnimalForm from "./ChangeAnimalForm";

import useAuth from "../../hook/useAuth";
import { CSVLink } from "react-csv";


import "../../style/MainContent.scss";



const AnimalsRegistry = () => {
    
    const {getAnimals, deleteAnimal} = useAnimalsService();
    const [animals, setAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [addFormShowed, setAddFormShowed] = useState(false);
    const [changeFormShowed, setChangeFormShowed] = useState(false);
    const {role, isAuth} =  useAuth();

  
    useEffect(()=> {
        onRequest();
    }, []);

    const onRequest = () => {
        getAnimals().then(onOrganizationsLoaded) ;
    }

    const onOrganizationsLoaded = (newAnimals) => {
        setAnimals(newAnimals);
    }

   

    const onTRClick = (id) => {
        if(selectedAnimal === id) {
            setSelectedAnimal(null);
        }
        else{
            setSelectedAnimal(id);
        }
        
    }

    const onDeleteBtnClick =  () => {
        if(selectedAnimal){
            deleteAnimal(selectedAnimal).then(onRequest);
            onTRClick(selectedAnimal);
        }
       
    }

    const onAddBtnClick = () => {
        setAddFormShowed(true);
    }

    const onChangeBtnClick = () => {
        if(selectedAnimal){
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
      
           
    const items = renderItems(animals);

    function renderItems(arr) {
        return arr.map((item, i) => 
        {
            let trClasses = "";
            if (selectedAnimal === item.id){
                trClasses += "selected";
            }
            return (
                <tr onClick={() => onTRClick(item.id)} className={trClasses} key={item.id}><td>{item.pet_name}</td><td>{item.category_name}</td><td>{item.breed}</td><td>{item.gender}</td><td>{item.birthdate.slice(0,10)}</td><td>{item.registration_date.slice(0,10)}</td><td>{item.passport_num}</td><td>{item.identification_num}</td><td>{item.chip_num}</td><td>{item.vacination_date.slice(0,10)}</td><td>{item.vacination_date_end.slice(0,10)}</td><td>{item.deworming_date.slice(0,10)}</td><td>{item.deworming_date_end.slice(0,10)}</td><td>{item.user_name}</td><td>{item.org_name}</td></tr>
            )
        });

    }

    // console.log(items)
  
    const addForm =  addFormShowed ? <AddAnimalForm animals={animals} setAnimals={setAnimals} changeShowed={setAddFormShowed} /> : null;
    const changeForm =  changeFormShowed && selectedAnimal ? <ChangeAnimalForm currentAnimal={animals.filter(animal=>animal.id===selectedAnimal)} id={selectedAnimal}  setAnimals={setAnimals} changeShowed={setChangeFormShowed}/> : null;
    const disabled = selectedAnimal? false: true;
    return (
        
        <div className="organizationsContent">
            <div className="buttons">
                <div className="buttons__crud">
                    {isAuth&&role==="Veterinarian" ? <button onClick={onAddBtnClick}>Добавить</button> : null }
                    {isAuth&&role==="Veterinarian" ?<button disabled={disabled} onClick={onChangeBtnClick}>Изменить</button> :null}
                    {isAuth&&role==="Veterinarian" ?<button disabled={disabled} onClick={onDeleteBtnClick}>Удалить</button>:null}
                </div>
               {isAuth ? <CSVLink className="btn_dwnl" data={animals} separator={";"}  filename={"Организации.csv"}><i className="fa-solid fa-file-csv"></i></CSVLink>: null }
              
            </div>


            <table className="table" id="organizationsTable">
                <tbody>
                    <tr className="tableHeader"><th>Кличка</th><th>Вид</th><th>Порода</th><th>Пол</th><th>Дата рождения</th><th>Дата Регистрации</th><th>Паспорт</th><th>Идентификационный номер</th><th>Номер чипа</th><th>Дата вакцинации</th><th>Конец действия вакцинации</th><th>Дата дегельминтизации</th><th>Конец действия дегельминтизации</th><th>Частное лицо</th><th>Организация</th></tr>
                    {items}
                   
                </tbody>
            </table>

            {addForm}
            {changeForm}
           
        </div>
    )
}
 
export default AnimalsRegistry;

