import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, {useEffect, useState} from "react";
import {FaCar} from "react-icons/fa";
import {Flex} from "src/utils/styledComponents/home/Flex";
import backgroundImage from "src/assets/img/LoginBackground.jpg";
import {
    AVATAR,
    BACKGROUND_IMAGE_WRAPPER,
    BOX,
    BUTTON,
    CONTAINER,
    ERROR,
    FLEX,
    LINK_TO_REGISTRATION_PAGE,
    LOGIN,
    TEXT_FIELD,
    TYPOGRAPHY
} from "src/utils/constants/dataTestIds";
import {userLoginSchema} from "src/utils/helpers/schemes";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUser, fetchUserDataRequest} from "src/utils/redux/usersReducer";
import {EMPTY_STRING, UserLogin} from "src/utils/constants/constants";
import {RootState} from "src/utils/redux/store";
import Loading from "src/components/Loading";
import {LinkToAuthorisationPage} from "src/utils/styledComponents/login/LinkToAuthorisationPage";

const Login = () => {

    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>(EMPTY_STRING);
    const [password, setPassword] = useState<string>(EMPTY_STRING);

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

    // Handlers
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        try {
            const userLogin: UserLogin = await userLoginSchema.validate(formJson);
            dispatch(authenticateUser(userLogin));
            navigate("/home");
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
        <Flex data-testid={LOGIN}>
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
                    <Typography data-testid={TYPOGRAPHY} component="h1" variant="h5">Login</Typography>
                    <Box data-testid={BOX} component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            autoFocus required margin="normal" fullWidth variant="standard"
                            type="text" name="username" label="Username" value={username} data-testid={TEXT_FIELD}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            autoFocus required margin="normal" fullWidth variant="standard"
                            type="password" name="password" label="Password" value={password} data-testid={TEXT_FIELD}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit" fullWidth variant="contained" data-testid={BUTTON}
                            sx={{marginTop: 3, marginButton: 2, backgroundColor: "#0033ff"}}
                        >
                            Login
                        </Button>
                        <Flex data-testid={FLEX} style={{justifyContent: "flex-end"}}>
                            <LinkToAuthorisationPage
                                data-testid={LINK_TO_REGISTRATION_PAGE}
                                href="/register"
                                variant="body2"
                                sx={{color: "#0025ff", textDecoration: "none"}}
                            >
                                Don't have an account?
                            </LinkToAuthorisationPage>
                        </Flex>
                    </Box>
                </Box>
            </Container>
        </Flex>
    );
}

export default Login;
