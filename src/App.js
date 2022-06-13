

// import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/user';

// import Layout from './components/layout'
import LoginComponent from './components/login'
import RegisterComponent from './components/register'
import UserComplainComponent from './components/user-complain'
import ComplainComponent from './components/admin-complain'
import ProfileComponent from './components/profile'
import DetailProductComponent from './components/detail-product'
import EditComponent from './components/edit-product'
import CategoryComponent from './components/category'
import ListComponent from './components/product'
import EditCategoryComponent from './components/edit-category'
import HomeComponent from './components/home'
import AddCategoryComponent from './components/add-category'
import AddProductComponent from './components/add-product'
import "bootstrap/dist/css/bootstrap.min.css";


import { API, setAuthToken } from './config/api';

if (localStorage.token) {
    setAuthToken(localStorage.token)
}


function App() {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    // console.clear();
    console.log(state);
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        // Redirect Auth
        if (state.isLogin === false) {
            navigate('/login');
        } else {
            if (state.user.status === 'admin') {
                navigate('/product');
            } else if (state.user.status === 'customer') {
                navigate('/');
            }
        }
    }, [state]);

    const checkUser = async () => {
        try {
            const response = await API.get('/check-auth');
            if (response.status === 404) {
                return dispatch({
                    type: 'AUTH_ERROR',
                });
            }

            let payload = response.data.data.user;
            payload.token = localStorage.token;

            dispatch({
                type: 'USER_SUCCESS',
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.token) {
            checkUser();
        }
    }, []);

    return (
        <Routes>
            {/* <Route index element={<Layout />} /> */}
            <Route path="login" element={<LoginComponent />} />
            <Route path="register" element={<RegisterComponent />} />
            <Route path="user-complain" element={<UserComplainComponent />} />
            <Route path="admin-complain" element={<ComplainComponent />} />
            <Route path="profile" element={<ProfileComponent />} />
            <Route path="detail/:id" element={<DetailProductComponent />} />
            <Route path="edit-product/:id" element={<EditComponent />} />
            <Route path="edit-category/:id" element={<EditCategoryComponent />} />
            <Route path="category" element={<CategoryComponent />} />
            <Route path="product" element={<ListComponent />} />
            <Route path="add" element={<AddCategoryComponent />} />
            <Route path="addProduct" element={<AddProductComponent />} />
            <Route path="/" element={<HomeComponent />} />
        </Routes>
    );
}

export default App;
