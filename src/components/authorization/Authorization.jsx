import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useLoginService from "../../services/LoginService";
import useAuth from "../../hook/useAuth";


import './Authorization.scss';

const Authorization = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const {postLogin} = useLoginService();

    const onSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newLoginData = {};

        formData.forEach((value, key) =>{
            newLoginData[key] = value;
        })

        await postLogin(newLoginData)
        .then(data => 
            signIn(data.token, data.user.role, ()=> navigate(fromPage, {replace: true})))
        .catch((e)=>{
            alert(e.message);
        });
    }

    const chngLogin = (e) => {
        setLogin(e.target.value);
    }
    const chngPassword = (e) => {
        setPassword(e.target.value);
    }

    return ( 
        <div className="login__dialog">
            <div className="login__content">
                <div className="authorizationForm">
                    <form onSubmit={onSubmit}>  
                        <div className="login__input__group">
                            <label htmlFor="login">Логин</label>
                            <input type="text" value={login} onChange={chngLogin}  name="user_login" placeholder="" className="login__input" ></input>
                        </div>
                        <div className="login__input__group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" value={password} onChange={chngPassword} name="user_password" placeholder="" className="login__input" ></input>
                        </div>
                        <button type="submit" className="btn">Войти</button>
                    </form>
                </div>  
            </div>  
    </div> 
    )
}

export default Authorization;