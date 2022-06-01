import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

import logo from "../../resourses/logo.png";

import './AppHeader.scss';

const AppHeader = () => {
    const {isAuth, signOut} =  useAuth();
    const navigate = useNavigate();


    const resetUser = () => {
        signOut(()=> navigate('/', {replace: true}))
    }

    return (
        <header className="app__header">

            <div className="app__logoTitle">
                <Link to="/">
                    <div className="app__logo">
                        <img src={logo} alt="clinicLogo"/>
                    </div>

                    <h1 className="app__title"> 
                        <span>Помоги другу</span>
                        ВетПриют
                    </h1>
                </Link>
            </div>
            
            

            <nav className="app__menu"> 
                <ul>
                    <li><Link to="/">Главная</Link></li>
                    {!isAuth ? <li><Link to="/pets">Реестр животных</Link></li> : null}
                    {!isAuth ? <li><Link to="/orgs">Организации</Link></li> : null}
                    {isAuth ? <li><Link to="/animals">Реестр животных</Link></li> : null}
                    {isAuth ? <li><Link to="/organizations">Реестр организаций</Link></li> : null}
                    {isAuth ? <li><Link to="/categories">Реестр видов</Link></li> : null}
                    {!isAuth ? <li><Link to="/diagram">Диаграммы</Link></li> : null}
                    {!isAuth ? <li><Link to="/login">Авторизация</Link></li> : <li><button className="btn__exit" onClick={resetUser}>Выход</button></li>}
                    
                </ul>
            </nav>

        </header>
    )
}

export default AppHeader;