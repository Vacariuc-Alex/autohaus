import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/utils/redux/store";
import {DEFAULT_ROLE, EMPTY_STRING, ONE, User, UserLogin} from "src/utils/constants/constants";
import {Flex} from "src/utils/styledComponents/home/Flex";
import backgroundImage from "src/assets/img/RegisterBackground.jpg";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {FaCar} from "react-icons/fa";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
    AVATAR,
    BACKGROUND_IMAGE_WRAPPER,
    BOX,
    BUTTON,
    CONTAINER,
    ERROR,
    FLEX,
    LINK_TO_LOGIN_PAGE,
    REGISTER,
    TEXT_FIELD,
    TYPOGRAPHY
} from "src/utils/constants/dataTestIds";
import Button from "@mui/material/Button";
import {LinkToAuthorisationPage} from "src/utils/styledComponents/login/LinkToAuthorisationPage";
import {userRegistrationSchema} from "src/utils/helpers/schemes";
import {authenticateUser, fetchUserDataRequest} from "src/utils/redux/usersReducer";
import Loading from "src/components/Loading";
import {encryptText} from "src/utils/helpers/encryption";
import useAxios from "src/utils/hooks/useAxios";
import {USER_REGISTER_FAILED} from "src/utils/constants/alertMessages";
import {DUPLICATED_EMAIL, DUPLICATED_USERNAME, UNEXPECTED_SERVER_ERROR} from "src/utils/constants/errorMessages";

const Register = () => {

    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {response, error, executeHttpRequest} = useAxios();
    const [username, setUsername] = useState<string>(EMPTY_STRING);
    const [email, setEmail] = useState<string>(EMPTY_STRING);
    const [password, setPassword] = useState<string>(EMPTY_STRING);
    const [avatar, setAvatar] = useState<string | undefined>();

    // Redux hooks
    const selector = useSelector((state: RootState) => state.usersStore);
    const {
        responseData: userResponseData,
        error: userError,
        loading: userLoading,
        isRequestExecuted: isUserRequestExecuted
    } = selector;

    // useEffect hook
    //fetches user data from backend
    useEffect(() => {
        //To avoid fetching each time useNavigate is triggered
        if (!isUserRequestExecuted && userResponseData.length === 0) {
            dispatch(fetchUserDataRequest());
        }
    }, [isUserRequestExecuted]);

    // after execution of post request, informs the user if registration succeed or failed
    useEffect(() => {
        if (response) {
            dispatch(fetchUserDataRequest());
        } else if (error) {
            alert(`${USER_REGISTER_FAILED} ${error}`);
        }
    }, [response, error]);

    // Handlers
    const nextIdAfterLatest = () => {
        if (userResponseData && userResponseData.length > 0) {
            const latestId = parseInt(userResponseData[userResponseData.length - 1].id);
            if (!isNaN(latestId)) {
                return String(latestId + 1);
            }
            throw new Error(UNEXPECTED_SERVER_ERROR);
        }
        return ONE;
    }

    const validateUserIsNotDuplicated = (user: User) => {
        userResponseData.forEach((e) => {
            switch (true) {
                case e.username === user.username:
                    throw new Error(DUPLICATED_USERNAME);
                case e.email === user.email:
                    throw new Error(DUPLICATED_EMAIL);
            }
        });
    }

    const saveUser = async (e: User) => {
        executeHttpRequest({
            url: "/users",
            method: "post",
            body: {
                id: e.id,
                username: e.username,
                email: e.email,
                password: e.password,
                role: e.role,
                avatar: e.avatar
            }
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        try {
            //from form input, will validate data, then create userRegister object in db and save in case unique
            //after creation will log in and forward to home page
            //timeout is used because it's async
            const {username, email, password, avatar} = await userRegistrationSchema.validate(formJson);
            const userRegister: User = {
                id: nextIdAfterLatest(),
                username: username,
                email: email,
                password: encryptText(password),
                role: DEFAULT_ROLE,
                avatar: avatar
            };
            const userLogin: UserLogin = {
                username: username,
                password: password,
            };

            validateUserIsNotDuplicated(userRegister);
            await saveUser(userRegister);

            setTimeout(() => {
                dispatch(authenticateUser(userLogin));
                navigate("/home");
            }, 100)
        } catch (error: any) {
            alert(error.message);
        }
    };

    //Pre-executed render block
    if (userError) {
        return (
            <h1 data-testid={ERROR}>Error: {`${userError}`}</h1>
        );
    } else if (userLoading) {
        return (
            <Loading data-testid={BOX}/>
        );
    }

    // Render
    return (
        <Flex data-testid={REGISTER}>
            <Flex data-testid={BACKGROUND_IMAGE_WRAPPER} style={{width: "65vw", height: "100vh", overflow: "hidden"}}>
                <img src={backgroundImage} alt="BackgroundImage" style={{width: "100%", height: "100%"}}/>
            </Flex>
            <Container data-testid={CONTAINER} component="main" maxWidth="xs">
                <Box
                    data-testid={BOX}
                    sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}
                >
                    <Avatar data-testid={AVATAR} sx={{margin: 3, scale: "1.5", backgroundColor: "#2e8b5a"}}>
                        <FaCar/>
                    </Avatar>
                    <Typography data-testid={TYPOGRAPHY} component="h1" variant="h5">Register</Typography>
                    <Box data-testid={BOX} component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            autoFocus required margin="normal" fullWidth variant="standard"
                            type="text" name="username" label="Username" value={username} data-testid={TEXT_FIELD}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            autoFocus required margin="normal" fullWidth variant="standard"
                            type="text" name="email" label="Email" value={email} data-testid={TEXT_FIELD}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            autoFocus required margin="normal" fullWidth variant="standard"
                            type="password" name="password" label="Password" value={password} data-testid={TEXT_FIELD}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            autoFocus margin="dense" fullWidth variant="standard"
                            type="url" name="avatar" label="Avatar URL" value={avatar} data-testid={TEXT_FIELD}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Button
                            type="submit" fullWidth variant="contained" data-testid={BUTTON}
                            sx={{marginTop: 3, marginButton: 2, backgroundColor: "#0033ff"}}
                        >
                            Register
                        </Button>
                        <Flex data-testid={FLEX} style={{justifyContent: "flex-end"}}>
                            <LinkToAuthorisationPage
                                data-testid={LINK_TO_LOGIN_PAGE}
                                href="/login"
                                variant="body2"
                                sx={{color: "#0025ff", textDecoration: "none"}}
                            >
                                Already have an account?
                            </LinkToAuthorisationPage>
                        </Flex>
                    </Box>
                </Box>
            </Container>
        </Flex>
    );
}

export default Register;
