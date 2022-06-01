import { useState, useEffect } from "react";
import useInfoService from "../../services/InfoService";
import { CSVLink } from "react-csv";


import "../../style/MainContent.scss";



const PetsRegistry = () => {
    const [pets, setPets] = useState([]);
    const {getPets} = useInfoService();


    useEffect(()=> {
        onRequest();
    }, []);

    const onRequest = () => {
        getPets().then(onPetsLoaded) ;
    }

    const onPetsLoaded = (newPets) => {
        setPets(newPets);
    }

    const items = renderItems(pets);

    function renderItems(arr) {
        return arr.map((item, i) => 
        {
            let trClasses = "";

            return (
                <tr className={trClasses} key={item.id}><td>{item.pet_name}</td><td>{item.category_name}</td><td>{item.breed}</td><td>{item.gender}</td><td>{item.birthdate.slice(0,10)}</td><td>{item.org_name}</td><td>{item.country +", "+ item.address}</td><td>{item.phone}</td></tr>
            )
        });

    }
    return (
        
        <div className="petsContent">
            <div className="buttons">
                <div className="buttons__crud">
                    {/* {isAuth&&role==="ADMIN" ? <button onClick={onAddBtnClick}>Добавить</button> : null }
                    {isAuth&&role==="ADMIN" ? <button disabled={disabled} onClick={onChangeBtnClick}>Изменить</button> :null}
                    {isAuth&&role==="ADMIN" ? <button disabled={disabled} onClick={onDeleteBtnClick}>Удалить</button>:null} */}
                </div>
               <CSVLink className="btn_dwnl" data={pets} separator={";"}  filename={"Питомцы.csv"}><i className="fa-solid fa-file-csv"></i></CSVLink>
              
            </div>


            <table className="table" id="animalTable">
                <tbody>
                    <tr className="tableHeader"><th>Кличка</th><th>Вид</th><th>Порода</th><th>Пол</th><th>Дата рождения</th><th>Название организации</th><th>Адрес</th><th>Телефон</th></tr>
                    {items}
                   
                </tbody>
            </table>

            {/* {addForm} */}
            {/* {changeForm} */}
           
        </div>
    )
 }
 
 export default PetsRegistry;

