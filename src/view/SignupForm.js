import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import UserService from '../services/UserService';

const SignupForm = () => {
    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setErrors
    } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            const user = {
                userName: values.username,
                email: values.email,
                password: values.password,
                matchingPassword: values.confirmPassword
            }
            console.log(user);
            UserService.create(user)
                .then(response => {
                    console.log(response);
                    if (response.status === 201) {
                        navigate(`/?created=${values.username}`);
                    }
                }).catch((err) => {
                    console.log(err.response.data.message);
                    const message = err.response.data.message;
                    if (message === "Existed user") {
                        setErrors({
                            username: message
                        })
                    } else if (message === "Existed email") {
                        setErrors({
                            email: message
                        })
                    } else if (message === "Invalid Password") {
                        setErrors({
                            password: "password must contains at least one digit , one uppercase , one lowercase , at least 10 characters"
                        })
                    }
                })
        },





        validationSchema: yup.object().shape({
            username: yup.string()
                .required("username must not be blank")
                .min(2, "username must be longer than 2 characters ")
                .max(39, "username must be less than 39 characters")
                .matches(/^[a-zA-Z0-9]+[-_.]?[a-zA-Z0-9]+/, "username must be alphanumeric and only has one dot/hyphen/underscore in the middle of user name "),

            email: yup.string()
                .required("email must not be blank")
                .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "wrong email format"),

            password: yup.string()
                .required("password must not be blank")
                // .matches(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "password must contains at least one digit , one uppercase , one lowercase , at least 10 characters"),
                .min(10, "password must have at least 10 characters"),
            confirmPassword: yup.string()
                .required("confirm password must not be blank")
                .oneOf([yup.ref('password'), null], 'Passwords must match')
        }),

    });


    return (
        <div className='container mt-5'>
            <h2 className='text-center'>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>

                    <input
                        className='form-control'
                        id="username"
                        name="username"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}

                    />

                    <div style={{ color: "red" }}>
                        {errors.username && touched.username ? (<p>{errors.username}</p>) : <> </>}
                    </div>

                </div>



                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className='form-control'
                        id="email"
                        name="email"
                        type="text"
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}

                    />

                    <div style={{ color: "red" }}>
                        {errors.email && touched.email ? (<p>{errors.email}</p>) : <> </>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className='form-control'
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}

                    />
                    <div style={{ color: "red" }}>
                        {errors.password && touched.password ? (<p>{errors.password}</p>) : <> </>}
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        className='form-control'
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        onBlur={handleBlur}

                    />

                    <div style={{ color: "red" }}>
                        {errors.confirmPassword && touched.confirmPassword ? (<p>{errors.confirmPassword}</p>) : <> </>}
                    </div>
                </div>



                <button
                    className='btn btn-primary'
                    type="submit">Submit</button>
            </form>
        </div>



    )
}
export default SignupForm;
