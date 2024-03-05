import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import InfoCard from "src/components/InfoCard";
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer, {addItem, removeItem} from "src/utils/redux/wishListReducer";
import {Provider} from "react-redux";
import {initialState} from "src/utils/constants/testConstants";
import productsReducer from "src/utils/redux/productsReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import {
    CARD,
    CARD_ACTION_AREA,
    CARD_CONTENT,
    CARD_MEDIA,
    CHECKBOX,
    FAVOURITE_AREA,
    IO_IOS_HEART,
    IO_IOS_HEART_EMPTY,
    TYPOGRAPHY
} from "src/utils/constants/dataTestIds";
import usersReducer from "src/utils/redux/usersReducer";

//Globals
const mockProduct = initialState.productsStore.responseData[0];
window.open = jest.fn();

//Test data
const infoCardContent: [number, string][] = [[0, "WAZ 2106, Red, 1986"], [1, "250 $"], [2, "JTDZN3EU4E3035524"]];

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

describe("InfoCard component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render InfoCard component", () => {
        render(
            <Provider store={mockStore}>
                <InfoCard productProps={mockProduct}/>
            </Provider>
        );
        const card = screen.getByTestId(CARD);
        const cardActionArea = screen.getByTestId(CARD_ACTION_AREA);
        const favouriteArea = screen.getByTestId(FAVOURITE_AREA);
        const checkbox = screen.getByTestId(CHECKBOX);
        const cardMedia = screen.getByTestId(CARD_MEDIA);
        const cardContent = screen.getByTestId(CARD_CONTENT);
        const typographies = screen.getAllByTestId(TYPOGRAPHY);

        expect(card).toBeInTheDocument();
        expect(cardActionArea).toBeInTheDocument();
        expect(favouriteArea).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(cardMedia).toBeInTheDocument();
        expect(cardContent).toBeInTheDocument();
        expect(typographies.length).toBe(3);
        typographies.forEach((e) => {
            expect(e).toBeInTheDocument();
        });
    });

    test("Should open a new page when item is clicked", () => {
        render(
            <Provider store={mockStore}>
                <InfoCard productProps={mockProduct}/>
            </Provider>
        );

        const card = screen.getByTestId(CARD);
        const cardActionArea = within(card).getByTestId(CARD_ACTION_AREA);
        const cardMedia = within(cardActionArea).getByTestId(CARD_MEDIA);

        fireEvent.click(cardMedia);
        expect(window.open).toHaveBeenCalledWith("/product/MQ==", "_blank");

    });

    test("Should display default image in case an error occurs while loading the image", () => {
        render(
            <Provider store={mockStore}>
                <InfoCard productProps={mockProduct}/>
            </Provider>
        );

        const card = screen.getByTestId(CARD);
        const cardActionArea = within(card).getByTestId(CARD_ACTION_AREA);
        const cardMedia = within(cardActionArea).getByTestId(CARD_MEDIA);

        fireEvent.error(cardMedia);
        expect(cardMedia).toHaveAttribute("src");
    });

    test.each(infoCardContent)("Should be displayed correct product information", (index, text) => {
        render(
            <Provider store={mockStore}>
                <InfoCard productProps={mockProduct}/>
            </Provider>
        );
        const typographies = screen.getAllByTestId(TYPOGRAPHY);
        expect(typographies[index]).toHaveTextContent(text);
    });

    describe("Given the mockProduct is not included in wishList", () => {
        test("Should display favourite area when mouseEnter and hide when mouseLeave", () => {
            render(
                <Provider store={mockStore}>
                    <InfoCard productProps={mockProduct}/>
                </Provider>
            );
            const card = screen.getByTestId(CARD);
            const favouriteArea = screen.getByTestId(FAVOURITE_AREA);
            const ioIosHeartEmpty = screen.getByTestId(IO_IOS_HEART_EMPTY);

            expect(ioIosHeartEmpty).toBeInTheDocument();
            expect(favouriteArea).toHaveStyle({opacity: 0});

            fireEvent.mouseEnter(card);
            expect(favouriteArea).toHaveStyle({opacity: 1});

            fireEvent.mouseLeave(card);
            expect(favouriteArea).toHaveStyle({opacity: 0});
        });

        test("Should display checked heart icon when is clicked and remain checked when mouseLeave", () => {
            render(
                <Provider store={mockStore}>
                    <InfoCard productProps={mockProduct}/>
                </Provider>
            );
            const card = screen.getByTestId(CARD);
            //Used getByRole the checkbox is automatically generated by MUI, and it doesn't have testId
            const checkbox = screen.getByRole(CHECKBOX);
            const favouriteArea = screen.getByTestId(FAVOURITE_AREA);
            const ioIosHeartEmpty = screen.getByTestId(IO_IOS_HEART_EMPTY);

            fireEvent.click(checkbox);
            const ioIosHeart = screen.getByTestId(IO_IOS_HEART);
            expect(ioIosHeart).toBeInTheDocument();

            fireEvent.mouseLeave(card);
            expect(favouriteArea).toHaveStyle({opacity: 1});
            expect(ioIosHeart).toBeInTheDocument();
            expect(ioIosHeartEmpty).not.toBeInTheDocument();
        });
    });

    describe("Given the mockProduct is included in wishList", () => {
        test("Should permanent display checked heart if redux store contains element's id and hide when isUnchecked", () => {
            mockStore.dispatch(addItem("1"));
            expect(mockStore.getState().wishListStore.ids).toEqual(["1"]);

            render(
                <Provider store={mockStore}>
                    <InfoCard productProps={mockProduct}/>
                </Provider>
            );
            //Used getByRole the checkbox is automatically generated by MUI, and it doesn't have testId
            const checkbox = screen.getByRole(CHECKBOX);
            const favouriteArea = screen.getByTestId(FAVOURITE_AREA);
            const ioIosHeart = screen.getByTestId(IO_IOS_HEART);

            expect(ioIosHeart).toBeInTheDocument();
            expect(favouriteArea).toHaveStyle({opacity: 1});

            fireEvent.click(checkbox);
            const ioIosHeartEmpty = screen.getByTestId(IO_IOS_HEART_EMPTY);
            expect(ioIosHeartEmpty).toBeInTheDocument();
            expect(favouriteArea).toHaveStyle({opacity: 0});
            expect(ioIosHeart).not.toBeInTheDocument();

            mockStore.dispatch(removeItem("1"));
            expect(mockStore.getState().wishListStore.ids).toEqual([]);
        });
    });
});
