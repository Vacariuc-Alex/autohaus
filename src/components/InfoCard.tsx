import React, {ChangeEvent, useEffect, useState} from "react";
import {Card, CardActionArea, CardContent, CardMedia, Checkbox, Typography,} from "@mui/material";
import noImage from "src/assets/img/NoImage.jpg";
import {addItem, removeItem} from "src/utils/redux/wishListReducer";
import {useDispatch, useSelector} from "react-redux"
import {FavouriteArea} from "src/utils/styledComponents/infoCard/FavouriteArea";
import {IoIosHeart, IoIosHeartEmpty} from "react-icons/io";
import {EMPTY_STRING, Product} from "src/utils/constants/constants";
import {RootState} from "src/utils/redux/store";
import {encryptText} from "src/utils/helpers/encryption";
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

type InfoCardProps = {
    productProps: Product;
};

const InfoCard = (props: InfoCardProps) => {

    // Destructure props
    const {productProps} = props;
    const product: Product = JSON.parse(JSON.stringify(productProps));
    const {id, company, model, year, vin, color, price, images} = product;

    // Redux hooks
    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => {
        return state.wishListStore.ids;
    });

    // Other hooks
    const [favouriteAreaVisibility, setFavouriteAreaVisibility] = useState({opacity: "0", transition: EMPTY_STRING});
    const [imageError, setImageError] = useState(false);

    // Verifiers
    const isProductFavourite = selector.includes(id);
    const imageSource = (images && images.length > 0 && !imageError) ? images[0] : noImage;

    // useEffect hook
    const toggleFavouriteAreaVisibility = (opacity: string) => {
        setFavouriteAreaVisibility({opacity: opacity, transition: "opacity 0.3s ease"});
    }

    useEffect(() => {
        if (!isProductFavourite) {
            toggleFavouriteAreaVisibility("0");
        } else {
            toggleFavouriteAreaVisibility("1");
        }
    }, [productProps]);

    // Handlers
    const handleFavouriteItemWasSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(addItem(id));
        } else {
            dispatch(removeItem(id));
        }
        toggleFavouriteAreaVisibility(e.target.checked ? "1" : "0");
    }

    const handleOnMouseEnter = () => {
        toggleFavouriteAreaVisibility("1");
    }

    const handleOnMouseLeave = () => {
        if (!isProductFavourite) {
            toggleFavouriteAreaVisibility("0");
        }
    }

    const handleOnClick = () => {
        const elementId = encryptText(id);
        window.open(`/product/${elementId}`, "_blank");
    }

    const handleImageError = () => {
        setImageError(true);
    };

    // Render
    return (
        <Card data-testid={CARD} sx={{width: 300}} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <CardActionArea data-testid={CARD_ACTION_AREA}>
                <FavouriteArea data-testid={FAVOURITE_AREA} style={favouriteAreaVisibility}>
                    <Checkbox
                        data-testid={CHECKBOX}
                        sx={{bottom: 25, padding: 0}}
                        icon={<IoIosHeartEmpty data-testid={IO_IOS_HEART_EMPTY}/>}
                        checkedIcon={<IoIosHeart data-testid={IO_IOS_HEART}/>}
                        checked={isProductFavourite}
                        onChange={handleFavouriteItemWasSelected}/>
                </FavouriteArea>
                <CardMedia
                    data-testid={CARD_MEDIA}
                    component="img"
                    height="280"
                    image={(imageError) ? noImage : imageSource}
                    alt="autoImg"
                    onClick={handleOnClick}
                    onError={handleImageError}
                />
                <CardContent data-testid={CARD_CONTENT} onClick={handleOnClick}>
                    <Typography
                        data-testid={TYPOGRAPHY}
                        gutterBottom
                        variant="subtitle1"
                        sx={{fontSize: "14px", color: "#2d1e9b"}}
                    >
                        {company} {model}, {color}, {year}
                    </Typography>
                    <Typography data-testid={TYPOGRAPHY} sx={{fontSize: "14px", fontWeight: "bold"}}>
                        {price} $
                    </Typography>
                    <Typography data-testid={TYPOGRAPHY} sx={{fontSize: "12px", paddingTop: "8px", opacity: "50%"}}>
                        {vin}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default InfoCard;
