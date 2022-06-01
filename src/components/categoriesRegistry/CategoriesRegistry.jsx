import { useState, useEffect } from "react";

import useCategoriesService from "../../services/CategoriesService";
import AddCategoryForm from "./AddCategoryForm";
import ChangeCategoryForm from "./ChangeCategoryForm";
import useAuth from "../../hook/useAuth";
import { CSVLink } from "react-csv";


import "../../style/MainContent.scss";
import "./CategoriesRegistry.scss";



const CategoriesRegistry = () => {
    
    const {getCategories, deleteCategory} = useCategoriesService();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [addFormShowed, setAddFormShowed] = useState(false);
    const [changeFormShowed, setChangeFormShowed] = useState(false);
    const {role, isAuth} =  useAuth();

  
    useEffect(()=> {
        onRequest();
    }, []);

    const onRequest = () => {
        // console.log('getORG');
        getCategories().then(onOrganizationsLoaded) ;
    }

    const onOrganizationsLoaded = (newOrganizations) => {
        setCategories(newOrganizations);
    }

   

    const onTRClick = (id) => {
        if(selectedCategory === id) {
            setSelectedCategory(null);
        }
        else{
            setSelectedCategory(id);
        }
        
    }

    const onDeleteBtnClick =  () => {
        if(selectedCategory){
            deleteCategory(selectedCategory).then(onRequest);
            onTRClick(selectedCategory);
        }
       
    }

    const onAddBtnClick = () => {
        setAddFormShowed(true);
    }

    const onChangeBtnClick = () => {
        if(selectedCategory){
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
      
           
    const items = renderItems(categories);

    function renderItems(arr) {
        return arr.map((item, i) => 
        {
            let trClasses = "";
            if (selectedCategory === item.id){
                trClasses += "selected";
            }

            return (
                <tr onClick={() => onTRClick(item.id)} className={trClasses} key={item.id}><td>{i+1}</td><td>{item.category_name}</td></tr>
            )
        });

    }
  
    const addForm =  addFormShowed ? <AddCategoryForm categories={categories} setCategories={setCategories} changeShowed={setAddFormShowed} /> : null;
    const changeForm =  changeFormShowed && selectedCategory ? <ChangeCategoryForm currentCategory={categories.filter(category=>category.id===selectedCategory)} id={selectedCategory}  setCategories={setCategories} changeShowed={setChangeFormShowed}/> : null;
    const disabled = selectedCategory? false: true;
    return (
        
        <div className="organizationsContent">
            <div className="buttons">
                <div className="buttons__crud">
                    {isAuth&&role==="Veterinarian" ? <button onClick={onAddBtnClick}>Добавить</button> : null }
                    {isAuth&&role==="Veterinarian" ?<button disabled={disabled} onClick={onChangeBtnClick}>Изменить</button> :null}
                    {isAuth&&role==="Veterinarian" ?<button disabled={disabled} onClick={onDeleteBtnClick}>Удалить</button>:null}
                </div>
               {isAuth ? <CSVLink className="btn_dwnl" data={categories} separator={";"}  filename={"Организации.csv"}><i className="fa-solid fa-file-csv"></i></CSVLink>: null }
              
            </div>


            <table className="categoryTable" id="organizationsTable">
                <tbody>
                    <tr className="tableHeader"><th>Номер</th><th>Вид животного (категория)</th></tr>
                    {items}
                   
                </tbody>
            </table>

            {addForm}
            {changeForm}
           
        </div>
    )
}
 
export default CategoriesRegistry;

