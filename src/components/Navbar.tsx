import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {FaCar} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const pages = ['Home', 'News', 'Wishlist'];

function ResponsiveAppBar() {

    const navigate = useNavigate();

    const handleOnClick = (page: string) => {
        navigate(`/${page.toLowerCase()}`);
    }

    return (
        <AppBar data-testid="app-bar" position="fixed" sx={{backgroundColor: "#2e8b5a"}}>
            <Container
                data-testid="container"
                maxWidth="xl"
                sx={{padding: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0}, marginLeft: "105px"}}
            >
                <Toolbar data-testid="toolbar" disableGutters>
                    <FaCar
                        data-testid="fa-car-icon"
                        style={{display: 'flex', marginRight: 30, transform: "scale(1.5)"}}
                    />
                    <Typography
                        data-testid="typography"
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 7,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'default'
                        }}
                    >
                        Autohaus
                    </Typography>
                    <Box data-testid="box" sx={{flexGrow: 1, display: 'flex'}}>
                        {pages.map((page) => (
                            <Button
                                data-testid="button"
                                key={page}
                                sx={{
                                    margin: 2,
                                    color: 'white',
                                    display: 'block',
                                    letterSpacing: '.05rem',
                                    '&:hover': {
                                        backgroundColor: '#39a96f',
                                        outline: 'none'
                                    }
                                }}
                                onClick={() => handleOnClick(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
