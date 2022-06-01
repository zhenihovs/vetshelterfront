import "../../style/Form.scss";
import { useState } from "react";
import useCategoriesService from "../../services/CategoriesService";

const ChangeCategoryForm = (props) => {

    const {
        changeShowed, 
        setCategories,
        currentCategory,
        id } = props;
    const { putCategory} = useCategoriesService();


    const [category_name, setCategory_name] = useState(currentCategory[0].category_name);
  


    const onModalClose = () => {
        changeShowed(false);
    }

    const chngorg_name = (e) => {
        setCategory_name(e.target.value);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newCategoryData = {"id": id};

        formData.forEach((value, key) =>{
            newCategoryData[key] = value;
        })

        await putCategory(newCategoryData)
        .then(updatedCategory=> setCategories(categories=> (categories.map(item=>{
                if (item.id === updatedCategory.id){
                    return updatedCategory;
                }
                return item;
            }))))
        .then(changeShowed(false));

    }

   
    return (
        <div className="modal">
            <div className="modal__dialog">
                <div className="modal__content">
                    <form onSubmit={onSubmit}>
                        <div onClick={onModalClose} data-close className="modal__close">х</div>
                        <div className="modal__title">Введите данные организации</div>
                        <div className="modal__input__group">
                            <label htmlFor="category_name">Название</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="category_name" 
                                value={category_name} 
                                onChange={chngorg_name} 
                                placeholder="" 
                                required 
                            />
                        </div>

                        <button type="submit" className="btn">Изменить</button>
                    </form>
                </div>
            </div>
        </div>

    )
}


export default ChangeCategoryForm;