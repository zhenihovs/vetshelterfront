import "../../style/Form.scss";
import { useState } from "react";
import useOrganizationService from "../../services/OrganizationService";

const ChangeOrganizationForm = (props) => {

    const {
        changeShowed, 
        setOrganizations,
        currentOrganization,
        id } = props;
    const { putOrganization} = useOrganizationService();


    const [org_name, setOrg_name] = useState(currentOrganization[0].org_name);
    const [country, setcountry] = useState(currentOrganization[0].country);
    const [address, setaddress] = useState(currentOrganization[0].address);
    const [inn, setinn] = useState(currentOrganization[0].inn);
    const [kpp, setkpp] = useState(currentOrganization[0].kpp);
    const [phone, setphone] = useState(currentOrganization[0].phone);
    const [email, setemail] = useState(currentOrganization[0].email);


    const onModalClose = () => {
        changeShowed(false);
    }

    const chngorg_name = (e) => {
        setOrg_name(e.target.value);
    }
    const chngcountry = (e) => {
        setcountry(e.target.value);
    }
    const chngaddress = (e) => {
        setaddress(e.target.value);
    }
    const chnginn = (e) => {
        setinn(e.target.value);
    }
    const chngkpp = (e) => {
        setkpp(e.target.value);
    }
    const chngphone = (e) => {
        setphone(e.target.value);
    }
    const chngemail = (e) => {
        setemail(e.target.value);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newOrgData = {"id": id};

        formData.forEach((value, key) =>{
            newOrgData[key] = value;
        })

        await putOrganization(newOrgData)
        .then(updatedOrg=> setOrganizations(organizations=> (organizations.map(item=>{
                if (item.id === updatedOrg.id){
                    return updatedOrg;
                }
                return item;
            }))))
        .then(changeShowed(false));

    }

   

    const phonePattern = "((8|\\+7)[0-9]{10}|(8|\\+7) [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}|(8|\\+7)-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2})";
    const innPattern = "[0-9]{10}";
    const kppPattern = "[0-9]{9}";
    const emailPattern = "[A-Za-z0-9]+@[A-Za-z0-9]+\\.[A-Za-z0-9]+";
   

    return (
        <div className="modal">
            <div className="modal__dialog">
                <div className="modal__content">
                    <form onSubmit={onSubmit}>
                        <div onClick={onModalClose} data-close className="modal__close">х</div>
                        <div className="modal__title">Введите данные организации</div>
                        <div className="modal__input__group">
                            <label htmlFor="org_name">Название</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="org_name" 
                                value={org_name} 
                                onChange={chngorg_name} 
                                placeholder="" 
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="country">Страна</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="country" 
                                value={country} 
                                onChange={chngcountry} 
                                placeholder="" 
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="address">Адрес</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="address" 
                                value={address} 
                                onChange={chngaddress} 
                                placeholder="" 
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="inn">ИНН</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="inn" 
                                value={inn} 
                                onChange={chnginn} 
                                placeholder="Формат: 0000000000" 
                                pattern={innPattern}
                                title="Доступные форматы: 0000000000"
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="kpp">КПП</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="kpp" 
                                value={kpp} 
                                onChange={chngkpp} 
                                placeholder="Формат: 000000000"  
                                pattern={kppPattern}
                                title="Доступные форматы: 000000000"
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="phone">Телефон</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="phone"
                                value={phone} 
                                onChange={chngphone}
                                placeholder="Формат: +70000000000" 
                                pattern={phonePattern}
                                title="Доступные форматы: +70000000000; +7 000 000 00 00; +7-000-000-00-00;"
                                required 
                            />
                        </div>

                        <div className="modal__input__group">
                            <label htmlFor="email">Почта</label>
                            <input 
                                className="modal__input"
                                type="text" 
                                name="email" 
                                value={email} 
                                onChange={chngemail} 
                                placeholder="Формат: _@_._" 
                                pattern={emailPattern}
                                title="Доступные форматы: _@_._"
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


export default ChangeOrganizationForm;