import { useEffect } from "react";
import {  Route, Routes,  useNavigate  } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import NewsList from "../newsList/NewsList";
import AppFooter from "../appFooter/AppFooter";
import PetsRegistry from "../infoRegistries/PetsRegistry";
import OrgsRegistry from "../infoRegistries/OrgsRegistry";
import OrganizationsRegistry from "../organizationsRegistry/OrganizationsRegistry";
import AnimalsRegistry from "../animalsRegistry/AnimalsRegistry";
import CategoriesRegistry from "../categoriesRegistry/CategoriesRegistry";
import Authorization from "../authorization/Authorization";
import BarChart from "../diagrams/OrgsDiagram";
import RequireAuth from "../../hoc/RequireAuth";
import useAuth from "../../hook/useAuth";
import useLoginService from "../../services/LoginService"

const App = () => {

    const {signIn} = useAuth();
    const {getAuth} = useLoginService();
    const navigate = useNavigate();


    useEffect( async()=>{
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token){
            await getAuth(token)
            .then(async(data) =>await signIn(data.token, data.user.role, ()=> navigate("/", {replace: true})))            
            .catch((e)=>{
                console.log(e);
            });
        }
       
    }, [])


    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<NewsList/>}/>
                    <Route path="/pets" element={<PetsRegistry/>}/>
                    <Route path ="/orgs" element={<OrgsRegistry/>}/>
                    <Route path="/organizations" element={
                        <RequireAuth>
                            <OrganizationsRegistry/>
                        </RequireAuth>
                    }/>
                    <Route path="/animals" element={
                        <RequireAuth>
                            <AnimalsRegistry/>
                        </RequireAuth>
                    }/>
                    <Route path="/categories" element={
                        <RequireAuth>
                            <CategoriesRegistry/>
                        </RequireAuth>
                    }/>
                    <Route path="/diagram" element={<BarChart/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                </Routes>
            </main>
            <AppFooter/>
        </div>
    )
}

export default App;