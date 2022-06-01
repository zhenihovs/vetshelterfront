import "../../style/Form.scss";
import { useState } from "react";
import useCategoriesService from "../../services/CategoriesService";


const AddCategoryForm = (props) => {
    const [category_name, setCategory_name] = useState('');


    const {changeShowed, setCategories, categories } = props;
    const {postCategory} = useCategoriesService();

    const onSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newCategory = {};

        formData.forEach((value, key) =>{
            newCategory[key] = value;
        })

        await postCategory(newCategory)
        .then(newCategory=>setCategories([ ...categories, newCategory]))
        .then(changeShowed(false));
    }

    const onModalClose = () => {
        changeShowed(false);
    }

    const chngorg_name = (e) => {
        setCategory_name(e.target.value);
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

                        <button type="submit" className="btn">Добавить</button>
                        
                    </form>
                </div>
            </div>
        </div>

    )
}


export default AddCategoryForm;