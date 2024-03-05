import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Avatar, IconButton, Menu, Tooltip, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {getItemFromLocalStorageWithExpiration} from "src/utils/helpers/sessionStorageWithExpiration";
import {AUTHENTICATED_USER, EMPTY_STRING, userAvatarOptions} from "src/utils/constants/constants";
import defaultAvatar from "src/assets/img/Avatar.png";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "src/utils/redux/usersReducer";
import {useDispatch} from "react-redux";
import {AVATAR, AVATAR_MENU, ICON_BUTTON, MENU_ITEM, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

const AvatarMenu = () => {

    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const [imageError, setImageError] = useState<boolean>(false);

    // Globals
    let options = [userAvatarOptions.wishlist];
    const isAuthenticated = !!getItemFromLocalStorageWithExpiration(AUTHENTICATED_USER);
    const getAuthenticatedUser = () => {
        if (isAuthenticated) {
            options.push(userAvatarOptions.logout);
            return getItemFromLocalStorageWithExpiration(AUTHENTICATED_USER);
        }
        options.push(userAvatarOptions.login);
        return null;
    }
    const authenticatedUser = getAuthenticatedUser();
    const avatarImageSource = (authenticatedUser && authenticatedUser.value.avatar && !imageError)
        ? authenticatedUser.value.avatar
        : defaultAvatar;

    // Handlers
    const handleOpenAvatar = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleCloseAvatar = () => {
        setAnchorElement(null);
    };

    const handleMenuItemClick = (option: string) => {
        switch (option) {
            case "Wishlist" :
                navigate("/wishlist");
                break;
            case "Login" :
                navigate("/login");
                break;
            case "Logout" :
                dispatch(logoutUser());
                navigate("/login");
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Box
            data-testid={AVATAR_MENU}
            sx={{
                position: "absolute",
                left: "87.5vw",
                right: "12.5vw",
                "@media screen and (min-width: 1900px)": {
                    left: "89.5vw",
                    right: "10.5vw"
                }
            }}
        >
            <Tooltip title={EMPTY_STRING}>
                <IconButton data-testid={ICON_BUTTON} onClick={handleOpenAvatar}>
                    <Avatar
                        data-testid={AVATAR}
                        src={(imageError) ? defaultAvatar : avatarImageSource}
                        alt="Avatar"
                        sx={{
                            backgroundColor: "#ddd",
                            scale: "1.1",
                            "& img": {
                                scale: "1.2",
                            },
                        }}
                        onError={handleImageError}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{marginTop: "50px"}}
                anchorEl={anchorElement}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                disableScrollLock
                open={!!anchorElement}
                onClose={handleCloseAvatar}
            >
                {options.map((option) => (
                    <MenuItem data-testid={MENU_ITEM} key={option} onClick={() => handleMenuItemClick(option)}>
                        <Typography data-testid={TYPOGRAPHY} textAlign="center">{option}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default AvatarMenu;
