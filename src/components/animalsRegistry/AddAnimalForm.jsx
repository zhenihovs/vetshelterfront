import "../../style/Form.scss";
import { useState, useEffect } from "react";
// import useOrganizationService from "../../services/OrganizationService";
import useAnimalsService from "../../services/AnimalsService";
import useCategoriesService from "../../services/CategoriesService";
import useOrganizationService from "../../services/OrganizationService";
import useUsersService from "../../services/UsersService";


const AddAnimalForm = (props) => {
    
    const [pet_name, setPet_name] = useState('');
    const [category, setCategory] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('Не определено');
    const [birthdate, setBirthdate] = useState('');
    const [registration_date, setRegistration_date] = useState('');
    const [passport_num, setPassport_num] = useState('');
    const [identification_num, setIdentification_num] = useState('');
    const [chip_num, setChip_num] = useState('');
    const [vacination_date, setVacination_date] = useState('');
    const [vacination_date_end, setVacination_date_end] = useState('');
    const [deworming_date, setDeworming_date] = useState('');
    const [deworming_date_end, setDeworming_date_end] = useState('');
    const [owner_user, setOwner_user] = useState('');
    const [owner_company, setOwner_company] = useState('');
    const [categories, setCategories] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [users, setUsers] = useState([]);



    const {changeShowed, setAnimals, animals } = props;
    const {postAnimal} = useAnimalsService();


    
    const {getCategories} = useCategoriesService();
    const {getOrganizations} = useOrganizationService();
    const {getUsers} = useUsersService();

    useEffect(async()=>{
        const categoriesFromServer = await getCategories();
        setCategories(categoriesFromServer);
        const organizationsFromServer = await getOrganizations();
        setOrganizations(organizationsFromServer);
        const usersFromServer = await getUsers();
        setUsers(usersFromServer);
        // console.log(categories);
        
    }, []);

    const categoriesForSelect = renderCategories(categories);

    function renderCategories(arr) {
        return arr.map((item) => 
        {
            return (
            <option key={item.id} value={item.id}>{item.category_name}</option>
            )
        });
    }

    const organizationsForSelect = renderOrganizations(organizations);

    function renderOrganizations(arr) {
        return arr.map((item) => 
        {
            return (
            <option key={item.id} value={item.id}>{item.org_name}</option>
            )
        });
    }

    const usersForSelect = renderUsers(users);

    function renderUsers(arr) {
        return arr.map((item) => 
        {
            return (
            <option key={item.id} value={item.id}>{item.user_name}</option>
            )
        });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newAnimalData = {};

        formData.forEach((value, key) =>{
            newAnimalData[key] = value;
        })
        // console.log(newAnimalData);

        await postAnimal(newAnimalData)
        .then(newAnimal=>setAnimals([ ...animals, newAnimal]))
        .then(changeShowed(false));
    }

    const onModalClose = () => {
        changeShowed(false);
    }


    const chngPet_name = (e) => {
        setPet_name(e.target.value);
    }
    const chngCategory = (e) => {
        setCategory(e.target.value);
    }
    const chngBreed = (e) => {
        setBreed(e.target.value);
    }
    const chngGender = (e) => {
        setGender(e.target.value);
    }
    const chngBirthdate = (e) => {
        setBirthdate(e.target.value);
    }
    const chngRegistration_date = (e) => {
        setRegistration_date(e.target.value);
    }
    const chngPassport_num = (e) => {
        setPassport_num(e.target.value);
    }
    const chngIdentification_num = (e) => {
        setIdentification_num(e.target.value);
    }
    const chngChip_num = (e) => {
        setChip_num(e.target.value);
    }
    const chngVacination_date = (e) => {
        setVacination_date(e.target.value);
    }
    const chngVacination_date_end = (e) => {
        setVacination_date_end(e.target.value);
    }
    const chngDeworming_date = (e) => {
        setDeworming_date(e.target.value);
    }
    const chngDeworming_date_end = (e) => {
        setDeworming_date_end(e.target.value);
    }
    const chngOwner_user = (e) => {
        setOwner_user(e.target.value);
    }
    const chngOwner_company = (e) => {
        setOwner_company(e.target.value);
    }

   
    // const datept = "([1-9]|0[1-9]|[12][0-9]|3[01])\.([1-9]|0[1-9]|1[0-2])\.([0-9]{4})";

    return (
        <div className="modal">
            <div className="modal__dialog">
                <div className="modal__content">
                    <form onSubmit={onSubmit}>
                        <div onClick={onModalClose} data-close className="modal__close">х</div>
                        <div className="modal__title">Введите данные питомца</div>
                        <div className="modal__input__group">
                            <label htmlFor="pet_name">Кличка</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="pet_name" 
                                value={pet_name} 
                                onChange={chngPet_name} 
                                placeholder="" 
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="category">Вид</label>
                            <select 
                                className="modal__input"
                                type="text" 
                                name="category" 
                                value={category} 
                                onChange={chngCategory} 
                                placeholder="" 
                                required 
                            >
                                {categoriesForSelect}
                            </select>
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="breed">Порода</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="breed" 
                                value={breed} 
                                onChange={chngBreed} 
                                placeholder="" 
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="gender">Пол</label>
                            <select 
                                className="modal__input"
                                // type="text" 
                                name="gender" 
                                value={gender} 
                                onChange={chngGender} 
                                placeholder="" 
                                title=""
                                required 
                            >
                                <option value="Не определено">Не определено</option>
                                <option value="Мужской">Мужской</option>
                                <option value="Женский">Женский</option>
                            </select>
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="birthdate">Дата рождения</label>
                            <input 
                                className="modal__input"
                                type="date" 
                                name="birthdate" 
                                value={birthdate} 
                                onChange={chngBirthdate} 
                                placeholder="" 
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="registration_date">Дата регистрации</label>
                            <input 
                                className="modal__input"
                                type="date" 
                                name="registration_date"
                                value={registration_date} 
                                onChange={chngRegistration_date}
                                placeholder=""
                                title=""
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="passport_num">Паспорт</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="passport_num" 
                                value={passport_num} 
                                onChange={chngPassport_num} 
                                placeholder="" 
                                title=""
                                required 
                            />
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="identification_num">Идентификационный номер</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="identification_num" 
                                value={identification_num} 
                                onChange={chngIdentification_num} 
                                placeholder=""
                                title=""
                                required 
                            />
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="chip_num">Номер чипа</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="chip_num" 
                                value={chip_num} 
                                onChange={chngChip_num} 
                                placeholder=""
                                required 
                            />
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="vacination_date">Дата вакцинации</label>
                            <input 
                                className="modal__input"
                                type="date" 
                                name="vacination_date" 
                                value={vacination_date} 
                                onChange={chngVacination_date} 
                                placeholder=""
                                required 
                            />
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="vacination_date_end">Конец действия вакцинации</label>
                            <input 
                                className="modal__input"
                                type="date" 
                                name="vacination_date_end" 
                                value={vacination_date_end} 
                                onChange={chngVacination_date_end} 
                                placeholder="" 
                                title=""
                                required 
                            />
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="deworming_date">Дата дегельминтизации</label>
                            <input 
                                className="modal__input"
                                type="date" 
                                name="deworming_date" 
                                value={deworming_date} 
                                onChange={chngDeworming_date} 
                                placeholder="" 
                                required 
                            />
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="deworming_date_end">Конец действия дегельминтизации</label>
                            <input 
                                className="modal__input"
                                type="date" 
                                name="deworming_date_end" 
                                value={deworming_date_end} 
                                onChange={chngDeworming_date_end} 
                                placeholder=""
                                title=""
                                required 
                            />
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="owner_user">Частное лицо</label>
                            <select 
                                className="modal__input"
                                type="text" 
                                name="owner_user" 
                                value={owner_user} 
                                onChange={chngOwner_user} 
                                placeholder=""
                            > 
                                <option value=""></option>
                                {usersForSelect}
                            </select>
                        </div>
                        <div className="modal__input__group">
                            <label htmlFor="owner_company">Организация</label>
                            <select 
                                className="modal__input"
                                type="text" 
                                name="owner_company" 
                                value={owner_company} 
                                onChange={chngOwner_company} 
                                placeholder=""
                            >
                                <option value=""></option>
                                {organizationsForSelect}
                            </select>
                        </div>
                        
                        
                        
                        <button type="submit" className="btn">Добавить</button>
                        
                    </form>
                </div>
            </div>
        </div>

    )
}


export default AddAnimalForm;