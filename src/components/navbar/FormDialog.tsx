import React, {FormEvent, useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {createProductObjectFromFormData} from "src/utils/helpers/createProductObject";
import {productSchema} from "src/utils/helpers/schemes";
import {delay} from "src/utils/helpers/delay";
import {Product} from "src/utils/constants/constants";
import {
    BUTTON,
    DIALOG, DIALOG_ACTIONS,
    DIALOG_CONTENT,
    DIALOG_CONTENT_TEXT,
    DIALOG_TITLE,
    TEXT_FIELD
} from "src/utils/constants/dataTestIds";

type DialogFormProps = {
    action: "ADD" | "EDIT";
    product?: Product;
    closeDialog: () => void;
    formSubmission: (e: any) => void;
}
export default function FormDialog(props: DialogFormProps) {

    // Destructure
    const {action, product, closeDialog, formSubmission} = props

    // Hooks
    const dialogContentRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(true);
    const [addImagesButtonVisibility, setAddImagesButtonVisibility] = useState<string>("inline-flex");
    const [amountOfImages, setAmountOfImages] = useState<number>(1);

    // Initializing form data for edit request
    const [company, setCompany] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [vin, setVin] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (product) {
            setCompany(product.company);
            setModel(product.model);
            setYear(String(product.year));
            setVin(product.vin);
            setColor(product.color);
            setPrice(String(product.price));
            if (product.images) {
                if (product.images.length > 1) {
                    setAmountOfImages(product.images.length);
                }
                setImages(product.images);
            }
        }
    }, [product]);

    // Handlers
    const handleClose = () => {
        setOpen(false);
        closeDialog();
    };

    const handleOnMoreButtonClick = async () => {
        if (amountOfImages < 10) {
            setAmountOfImages((prevState) => ++prevState);
            if (dialogContentRef && dialogContentRef.current) {
                await delay(1);
                dialogContentRef.current.scrollBy(0, 75);
            }
            return;
        }
        setAddImagesButtonVisibility("none");
    }

    const handleOnPriceChange = (e: any) => {
        let price = e.target.value;

        // Remove all characters that are not digits or decimal separators
        // Replace comma with period to standardize decimal separators
        // Remove multiple consecutive decimal points
        price = price.replace(/[^\d.,]/g, "").replace(/,/g, ".").replace(/(\..*)\./g, "$1");

        // Check if the number has more than two decimal places and truncate the excess
        const parts = price.split('.');
        if (parts[1] && parts[1].length > 2) {
            price = parts[0] + '.' + parts[1].slice(0, 2);
        }
        setPrice(price);
    }

    const handleOnYearChange = (e: any) => {
        let year = e.target.value;
        // Remove all non-digit characters
        year = year.replace(/\D/g, '');
        setYear(year);
    }

    // Render
    const renderTextFieldsForImageUrls = (() => {
        const imageUrls = [];
        for (let i = 0; i < amountOfImages; i++) {
            imageUrls.push(
                <TextField
                    autoFocus margin="dense" fullWidth variant="standard" key={i}
                    type="url" name={`image${i}`} label="Image URL" value={images[i]} data-testid={TEXT_FIELD}
                    onChange={(e) => setImages([...images.slice(0, i), e.target.value, ...images.slice(++i)])}
                />
            );
        }
        return imageUrls;
    })();

    const validateFormJson = async (formJson: any) => {
        const newProduct = createProductObjectFromFormData(formJson);
        try {
            await productSchema.validate(newProduct);
            formSubmission(newProduct);
            handleClose();
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <Dialog
            data-testid={DIALOG}
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: async (event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    await validateFormJson(formJson);
                }
            }}
            sx={{maxHeight: "35rem"}}
        >
            <DialogTitle data-testid={DIALOG_TITLE} sx={{textTransform: "uppercase"}}>{action} form</DialogTitle>
            <DialogContent data-testid={DIALOG_CONTENT} ref={dialogContentRef}>
                <DialogContentText data-testid={DIALOG_CONTENT_TEXT}>
                    Please ensure that all fields in the form are filled out with the required information!
                </DialogContentText>
                <TextField
                    autoFocus required margin="dense" fullWidth variant="standard"
                    type="text" name="company" label="Company" value={company} data-testid={TEXT_FIELD}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                    autoFocus required margin="dense" fullWidth variant="standard"
                    type="text" name="model" label="Model" value={model} data-testid={TEXT_FIELD}
                    onChange={(e) => setModel(e.target.value)}
                />
                <TextField
                    autoFocus required margin="dense" fullWidth variant="standard"
                    type="text" name="year" label="Year" value={year} data-testid={TEXT_FIELD}
                    onChange={handleOnYearChange}
                />
                <TextField
                    autoFocus required margin="dense" fullWidth variant="standard"
                    type="text" name="vin" label="VIN" value={vin} data-testid={TEXT_FIELD}
                    onChange={(e) => setVin(e.target.value)}
                />
                <TextField
                    autoFocus required margin="dense" fullWidth variant="standard"
                    type="text" name="color" label="Color" value={color} data-testid={TEXT_FIELD}
                    onChange={(e) => setColor(e.target.value)}
                />
                <TextField
                    autoFocus required margin="dense" fullWidth variant="standard"
                    type="text" name="price" label="Price" value={price} data-testid={TEXT_FIELD}
                    onChange={handleOnPriceChange}
                />
                {renderTextFieldsForImageUrls}
                <Button
                    component="label" variant="contained" startIcon={<AddToPhotosIcon/>} data-testid={BUTTON}
                    onClick={handleOnMoreButtonClick} sx={{mt: "12px", display: addImagesButtonVisibility}}
                >
                    More
                </Button>
            </DialogContent>
            <DialogActions data-testid={DIALOG_ACTIONS}>
                <Button data-testid={BUTTON} onClick={handleClose}>Close</Button>
                <Button data-testid={BUTTON} type="submit">{action}</Button>
            </DialogActions>
        </Dialog>
    );
}
