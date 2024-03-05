import Button from "@mui/material/Button";
import {BUTTON} from "src/utils/constants/dataTestIds";
import React from "react";
import {useNavigate} from "react-router-dom";

const Pages = () => {

    const pages = ["Home", "News", "Wishlist"];
    const navigate = useNavigate();

    const handleOnPageClick = (page: string) => {
        navigate(`/${page.toLowerCase()}`);
    }

    return (
        <>
            {pages.map((page) => (
                <Button
                    data-testid={BUTTON}
                    key={page}
                    sx={{
                        margin: 2,
                        color: "white",
                        display: "block",
                        letterSpacing: ".05rem",
                        "&:hover": {
                            backgroundColor: "#39a96f",
                            outline: "none"
                        }
                    }}
                    onClick={() => handleOnPageClick(page)}
                >
                    {page}
                </Button>
            ))
            }
        </>
    );
};

export default Pages;
