import Button from "@mui/material/Button";
import {BUTTON, DIALOG} from "src/utils/constants/dataTestIds";
import React, {useEffect, useState} from "react";
import {Product} from "src/utils/constants/constants";
import FormDialog from "src/components/navbar/FormDialog";
import useAxios from "src/utils/hooks/useAxios";
import {FAILED_REQUEST, FEATURE_BLOCKED, PRODUCT_ADDED_SUCCESSFULLY} from "src/utils/constants/alertMessages";

type AddProductProps = {
    initialData: Product[] | undefined;
}

const AddProduct = ((props: AddProductProps) => {

    // Destructure
    const {initialData} = props;

    // Hooks
    const {response, error, executeHttpRequest} = useAxios();
    const [isDialogShown, setIsDialogShown] = useState<boolean>(false);
    const [nextIdAfterLatest, setNextIdAfterLatest] = useState<string>("1");

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
                images: e.images
            }
        });
    }

    const handleOnAddProductButtonClick = () => {
        //if there is initial data, will identify latest id and set as next value, otherwise will be 1 as default
        if (initialData && initialData.length > 0) {
            const latestId = parseInt(initialData[initialData.length - 1].id);
            if (!isNaN(latestId)) {
                setNextIdAfterLatest(String(latestId + 1));
            } else {
                alert(FEATURE_BLOCKED);
                return;
            }
        }
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
                onClick={async () => handleOnAddProductButtonClick()}
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
