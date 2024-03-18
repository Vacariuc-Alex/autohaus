import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import {
    deleteItemFromLocalStorage,
    getItemFromLocalStorageWithExpiration,
    setItemInLocalStorageWithExpiration
} from "src/utils/helpers/sessionStorageWithExpiration";
import {AUTHENTICATED_USER, DEFAULT_EXPIRATION_PERIOD} from "src/utils/constants/constants";
import AvatarMenu from "src/components/navbar/AvatarMenu";
import {AVATAR, AVATAR_MENU, ICON_BUTTON, MENU, MENU_ITEM, TYPOGRAPHY} from "src/utils/constants/dataTestIds";
import {Provider} from "react-redux";
import {initialState, stubUser} from "src/utils/constants/testConstants";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import productsReducer from "src/utils/redux/productsReducer";
import usersReducer from "src/utils/redux/usersReducer";
import wishListReducer from "src/utils/redux/wishListReducer";
import {configureStore} from "@reduxjs/toolkit";

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}));

// Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        usersStore: usersReducer,
        productsStore: productsReducer,
        userSelectionStore: userSelectionReducer
    },
    preloadedState: initialState,
});

describe("AvatarMenu component", () => {
    beforeEach(() => {
        setItemInLocalStorageWithExpiration(AUTHENTICATED_USER, stubUser, DEFAULT_EXPIRATION_PERIOD);
    });

    afterEach(() => {
        cleanup();
        deleteItemFromLocalStorage(AUTHENTICATED_USER);
    });

    describe("Should render AvatarMenu component", () => {
        test("When user is authenticated and clicks on Logout option", () => {
            render(
                <Provider store={mockStore}>
                    <AvatarMenu/>
                </Provider>
            );
            const avatarMenu = screen.getByTestId(AVATAR_MENU);
            const iconButton = within(avatarMenu).getByTestId(ICON_BUTTON);
            const avatar = within(iconButton).getByTestId(AVATAR);

            fireEvent.click(iconButton);
            const menu = screen.getByRole(MENU);
            const menuItems = within(menu).getAllByTestId(MENU_ITEM);
            const typographies = within(menu).getAllByTestId(TYPOGRAPHY);

            expect(avatarMenu).toBeInTheDocument();
            expect(iconButton).toBeInTheDocument();
            expect(avatar).toBeInTheDocument();
            expect(menu).toBeInTheDocument();
            expect(menuItems.length).toEqual(2);
            expect(typographies.length).toEqual(2);
            expect(typographies[0].textContent).toBe("Wishlist");
            expect(typographies[1].textContent).toBe("Logout");

            fireEvent.click(menuItems[1]);
            expect(getItemFromLocalStorageWithExpiration(AUTHENTICATED_USER)).toBeNull();
            expect(mockedNavigate).toHaveBeenCalledWith("/login");
        });

        test("When user is not authenticated and clicks on Login  option", () => {
            deleteItemFromLocalStorage(AUTHENTICATED_USER);
            render(
                <Provider store={mockStore}>
                    <AvatarMenu/>
                </Provider>
            );
            const avatarMenu = screen.getByTestId(AVATAR_MENU);
            const iconButton = within(avatarMenu).getByTestId(ICON_BUTTON);
            const avatar = within(iconButton).getByTestId(AVATAR);

            fireEvent.click(iconButton);
            const menu = screen.getByRole(MENU);
            const menuItems = within(menu).getAllByTestId(MENU_ITEM);
            const typographies = within(menu).getAllByTestId(TYPOGRAPHY);

            expect(avatarMenu).toBeInTheDocument();
            expect(iconButton).toBeInTheDocument();
            expect(avatar).toBeInTheDocument();
            expect(menu).toBeInTheDocument();
            expect(menuItems.length).toEqual(2);
            expect(typographies.length).toEqual(2);
            expect(typographies[0].textContent).toBe("Wishlist");
            expect(typographies[1].textContent).toBe("Login");

            fireEvent.click(menuItems[1]);
            expect(mockedNavigate).toHaveBeenCalledWith("/login");
        });

        test("When user is authenticated and clicks on Wishlist option", () => {
            render(
                <Provider store={mockStore}>
                    <AvatarMenu/>
                </Provider>
            );
            const avatarMenu = screen.getByTestId(AVATAR_MENU);
            const iconButton = within(avatarMenu).getByTestId(ICON_BUTTON);
            const avatar = within(iconButton).getByTestId(AVATAR);

            fireEvent.click(iconButton);
            const menu = screen.getByRole(MENU);
            const menuItems = within(menu).getAllByTestId(MENU_ITEM);
            const typographies = within(menu).getAllByTestId(TYPOGRAPHY);

            expect(avatarMenu).toBeInTheDocument();
            expect(iconButton).toBeInTheDocument();
            expect(avatar).toBeInTheDocument();
            expect(menu).toBeInTheDocument();
            expect(menuItems.length).toEqual(2);
            expect(typographies.length).toEqual(2);
            expect(typographies[0].textContent).toBe("Wishlist");
            expect(typographies[1].textContent).toBe("Logout");

            fireEvent.click(menuItems[0]);
            expect(mockedNavigate).toHaveBeenCalledWith("/wishlist");
        });
    });

    test("Should display default avatar in case an error occurs while loading the avatar", () => {
        deleteItemFromLocalStorage(AUTHENTICATED_USER);
        render(
            <Provider store={mockStore}>
                <AvatarMenu/>
            </Provider>
        );
        const avatarMenu = screen.getByTestId(AVATAR_MENU);
        const iconButton = within(avatarMenu).getByTestId(ICON_BUTTON);
        const avatar = within(iconButton).getByTestId(AVATAR);
        const image = within(avatar).getByRole("img");

        fireEvent.error(image);
        expect(image).toHaveProperty("src");
    });
});
