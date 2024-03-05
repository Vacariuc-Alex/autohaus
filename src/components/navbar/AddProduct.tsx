import Button from "@mui/material/Button";
import {BUTTON, DIALOG} from "src/utils/constants/dataTestIds";
import React, {useEffect, useState} from "react";
import {AUTHENTICATED_USER, ONE, Product} from "src/utils/constants/constants";
import FormDialog from "src/components/navbar/FormDialog";
import useAxios from "src/utils/hooks/useAxios";
import {FAILED_REQUEST, FEATURE_BLOCKED, PRODUCT_ADDED_SUCCESSFULLY} from "src/utils/constants/alertMessages";
import {useNavigate} from "react-router-dom";
import {getItemFromLocalStorageWithExpiration} from "src/utils/helpers/sessionStorageWithExpiration";

type AddProductProps = {
    initialData: Product[] | undefined;
}

const AddProduct = ((props: AddProductProps) => {

    // Destructure
    const {initialData} = props;

    // Globals
    const authenticatedUser = getItemFromLocalStorageWithExpiration(AUTHENTICATED_USER);

    // Hooks
    const navigate = useNavigate();
    const {response, error, executeHttpRequest} = useAxios();
    const [isDialogShown, setIsDialogShown] = useState<boolean>(false);
    const [nextIdAfterLatest, setNextIdAfterLatest] = useState<string>(ONE);

    useEffect(() => {
        if (response) {
            alert(PRODUCT_ADDED_SUCCESSFULLY);
            window.location.reload();
        } else if (error) {
            alert(`${FAILED_REQUEST} ${error}`);
            window.location.reload();
        }
    }, [response, error]);

    // Handlers
    const handleCloseDialog = () => {
        setIsDialogShown(false);
    }

    const handleFormSubmit = async (e: Product) => {
        executeHttpRequest({
            url: "/products",
            method: "post",
            body: {
                id: `${nextIdAfterLatest}`,
                company: e.company,
                model: e.model,
                year: e.year,
                vin: e.vin,
                color: e.color,
                price: e.price,
                owner: authenticatedUser.value,
                images: e.images
            }
        });
    }

    const handleOnAddProductButtonClick = () => {
        if (!authenticatedUser) {
            // Redirect to login if user is not authenticated
            navigate("/login");
            return;
        }

        if (!initialData) {
            // Show dialog if user is authenticated and there's no initial data
            setIsDialogShown(true);
            return;
        }

        const latestId = parseInt(initialData[initialData.length - 1]?.id);
        if (isNaN(latestId)) {
            // Show an alert if there's an issue with the id
            alert(FEATURE_BLOCKED);
            return;
        }

        // Set the next id after the latest id
        setNextIdAfterLatest(String(latestId + 1));
        setIsDialogShown(true);
    }

    // Render
    return (
        <>
            <Button
                data-testid={BUTTON}
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
                onClick={handleOnAddProductButtonClick}
            >
                Add Product
            </Button>
            {isDialogShown &&
                <FormDialog
                    data-testid={DIALOG}
                    action="ADD"
                    closeDialog={handleCloseDialog}
                    formSubmission={handleFormSubmit}
                />
            }
        </>
    );
});

export default AddProduct;
