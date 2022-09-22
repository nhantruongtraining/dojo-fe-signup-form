import React, { useState, useEffect } from 'react';
import userService from '../services/UserService';
import { Link, useSearchParams } from 'react-router-dom';
import PopUpModal from '../shared/PopUpModal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [param] = useSearchParams();
    const newUserCreated = param.get("created");
    const [popupDisplay, setPopupDisplay] = useState(Boolean(newUserCreated));
    console.log(popupDisplay);
    console.log(newUserCreated);

    const init = () => {
        userService.getAll("/users").then(response => {
            console.log(response.data)
            setUsers(response.data)
            setTotalUser(response.data.length)
        })
    }


    useEffect(() => {
        init();
        setTimeout(() => {
            setPopupDisplay(false);
        }, 5000)
    }, []);

    return (
        <div className='container mt-2'>
            <PopUpModal
                open={popupDisplay}
                handleClose={() => { setPopupDisplay(!popupDisplay) }}
                title="Sign up successfully"
                content={`${newUserCreated} is created successfully`}
            />

            <div className='d-flex justify-content-end mt-2'>
                <Link to={"/signup"} >
                    <button className='btn btn-primary px-3'>Sign up</button>
                </Link>
            </div>

            <h1 className='text-center'>List of users</h1>
            <hr></hr>
            <p className='text-center'>Total users: {totalUser}</p>
            <div>
                <table className='table table-striped table-hover' >
                    <thead>
                        <tr>
                            <th scope='col'>No.</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>Email address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.sort((a, b) => {
                            let fa = a.username.toLowerCase();
                            let fb = b.username.toLowerCase();
                            if (fa < fb) {
                                return -1;
                            }
                            if (fa > fb) {
                                return 1;
                            }
                            return 0;
                        }).map((user, index) => {
                            console.log(index);
                            return (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        })

                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UserList;