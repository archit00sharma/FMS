import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Select, InputLabel, FormHelperText, FormLabel, FormGroup, Grid, Checkbox, TextField, useTheme } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from '../../theme';
import { useContext } from 'react';
import UserContext from '../../context/Users/UserContext';
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { id } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const context = useContext(UserContext);
    const { getUserById, user, updateUserById } = context;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading state to true initially


            await getUserById(id);



            setLoading(false);
        };

        fetchData();
    }, [id]);




    if (loading) {
        return <div>Loading...</div>;
    }


    const buttonStyle = {
        marginTop: '16px',
        marginBottom: '50px',
        borderRadius: '8px',
        padding: '12px 24px',
        fontWeight: 'bold',
        backgroundColor: colors.greenAccent[500], // Use your predefined primary color
        color: colors.primary[900], // Use the predefined white color
    };


    const preventDisappearingStyle = {
        color: '#ffffff', // White color for the label
        fontWeight: 'bold', // Custom font weight for the label
    };

    const permissionsSchema = yup.object().shape({
        case: yup.array().of(yup.string()),
        member: yup.object().shape({
            read: yup.array().of(yup.string()),
            write: yup.array().of(yup.string()),
            update: yup.array().of(yup.string()),
            delete: yup.array().of(yup.string())
        })
    });

    const initialValues = {
        name: user.name,
        role: user.role,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
        permissions: {
            case: user.permissions.case,
            member: {
                read: user.permissions.member.read,
                write: user.permissions.member.write,
                update: user.permissions.member.update,
                delete: user.permissions.member.delete,
            },
        },
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required("Required"),
        role: yup.string().required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
        mobile: yup.string().required("Required"),
        password: yup.string().required("Required"),
        permissions: permissionsSchema
    });

    const handleFormSubmit = async (values) => {

        const id = user.id
        updateUserById(id, values)
        navigate("/viewAllUsers");
    };

    return (
        <Box m="20px">
            <Header title="EDIT USER" subtitle="Edit User Profile" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Name"
                                    name="name"
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="filled" error={touched.role && !!errors.role}>
                                    <InputLabel htmlFor="role">Role</InputLabel>
                                    <Select
                                        fullWidth
                                        variant="filled"
                                        native
                                        value={values.role}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'role',
                                            id: 'role',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value="manager">Manager</option>
                                        <option value="senior_supervisor">Senior Supervisor</option>
                                        <option value="supervisor">Supervisor</option>
                                        <option value="field_executive">Field Executive</option>
                                    </Select>
                                    {touched.role && errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    variant="filled"
                                    type="email"
                                    label="Email"
                                    name="email"
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Mobile"
                                    name="mobile"
                                    error={touched.mobile && !!errors.mobile}
                                    helperText={touched.mobile && errors.mobile}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Password"
                                    name="password"
                                    error={touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />
                            </Grid>
                            <br /> <br />  <br /><br /><br />
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" style={preventDisappearingStyle}>Permissions</FormLabel>
                                    <br /><br />
                                    <FormGroup>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormLabel component="legend" style={preventDisappearingStyle}>Case</FormLabel>
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.case"
                                                            type="checkbox"
                                                            value="read"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Read"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.case"
                                                            type="checkbox"
                                                            value="write"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Write"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.case"
                                                            type="checkbox"
                                                            value="update"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Update"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.case"
                                                            type="checkbox"
                                                            value="delete"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Delete"
                                                />
                                                <ErrorMessage name="permissions.case" component="div" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormLabel component="legend" style={preventDisappearingStyle}>Member Read</FormLabel>
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.read"
                                                            type="checkbox"
                                                            value="manager"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Manager"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.read"
                                                            type="checkbox"
                                                            value="senior_supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Senior Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.read"
                                                            type="checkbox"
                                                            value="supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.read"
                                                            type="checkbox"
                                                            value="field_executive"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Field Executive"
                                                />
                                                <ErrorMessage name="permissions.member.read" component="div" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormLabel component="legend" style={preventDisappearingStyle}>Member Write</FormLabel>
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.write"
                                                            type="checkbox"
                                                            value="manager"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Manager"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.write"
                                                            type="checkbox"
                                                            value="senior_supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Senior Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.write"
                                                            type="checkbox"
                                                            value="supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.write"
                                                            type="checkbox"
                                                            value="field_executive"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Field Executive"
                                                />
                                                <ErrorMessage name="permissions.member.write" component="div" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormLabel component="legend" style={preventDisappearingStyle}>Member Update</FormLabel>
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.update"
                                                            type="checkbox"
                                                            value="manager"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Manager"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.update"
                                                            type="checkbox"
                                                            value="senior_supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Senior Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.update"
                                                            type="checkbox"
                                                            value="supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.update"
                                                            type="checkbox"
                                                            value="field_executive"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Field Executive"
                                                />
                                                <ErrorMessage name="permissions.member.update" component="div" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormLabel component="legend" style={preventDisappearingStyle}>Member Delete</FormLabel>
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.delete"
                                                            type="checkbox"
                                                            value="manager"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Manager"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.delete"
                                                            type="checkbox"
                                                            value="senior_supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Senior Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.delete"
                                                            type="checkbox"
                                                            value="supervisor"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Supervisor"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            name="permissions.member.delete"
                                                            type="checkbox"
                                                            value="field_executive"
                                                            style={preventDisappearingStyle}
                                                        />
                                                    }
                                                    label="Field Executive"
                                                />
                                                <ErrorMessage name="permissions.member.delete" component="div" />
                                            </Grid>
                                        </Grid>
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <Box mt={2} display="flex" justifyContent="flex-end">
                                        <Button variant="contained" style={buttonStyle} type="submit">
                                            Edit User
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default EditUser