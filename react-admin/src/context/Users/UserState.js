import UserContext from './UserContext';
import { useState } from "react";
import { showToast } from '../../components/Toast';


const UserState = (props) => {
    const host = "http://localhost:5000"
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})


    const getAllUsers = async () => {
        const token = localStorage.getItem('cmb_token')
        const response = await fetch(`${host}/v1/user/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });

        const responseData = await response.json();

        setUsers(responseData.data.users)

    }

    const createUser = async (data) => {
        const token = localStorage.getItem('cmb_token')
        const response = await fetch(`${host}/v1/user/user`, {
            method: 'POST',
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });


        const user = await response.json();
        if (user.statusCode === 200) {
            showToast('Users created successfully', 'success');
        } else {
            showToast(`${user.error}`, 'error');
        }


    }

    const getUserById = async (id) => {
        const token = localStorage.getItem('cmb_token')
        const response = await fetch(`${host}/v1/user/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });

        const responseData = await response.json();
        setUser(responseData.data.user)
    }

    const updateUserById = async (id, data) => {
        const token = localStorage.getItem('cmb_token')

        const response = await fetch(`${host}/v1/user/user/${id}`, {
            method: 'PUT',
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const user = await response.json();
        if (user.statusCode === 200) {
            showToast('User updated successfully', 'success');
        } else {
            showToast(`${user.error}`, 'error');
        }


    }

    const deleteUserById = async (id) => {
        const token = localStorage.getItem('cmb_token')

        const response = await fetch(`${host}/v1/user/user/${id}`, {
            method: 'DELETE',
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });

        const user = await response.json();
        if (user.statusCode === 200) {

            const updatedUsers = users.filter((user) => user._id.$oid !== id);
            setUsers(updatedUsers);

            showToast('User Deleted successfully', 'success');
        } else {
            showToast(`${user.error}`, 'error');
        }


    }



    return (
        <UserContext.Provider value={{ getAllUsers, createUser, getUserById, updateUserById, deleteUserById, users, user }}>
            {props.children}
        </UserContext.Provider>
    )
}



export default UserState;