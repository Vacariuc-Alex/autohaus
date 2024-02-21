import React, {ChangeEvent, useEffect, useState} from "react";
import {Card, CardActionArea, CardContent, CardMedia, Checkbox, Typography,} from "@mui/material";
import autoImg from "../assets/img/Auto.jpg";
import {addItem, removeItem} from "../utils/redux/wishListReducer";
import {useDispatch, useSelector} from "react-redux"
import FavouriteArea from "../utils/styledComponents/FavouriteArea";
import {IoIosHeart, IoIosHeartEmpty} from "react-icons/io";
import {Product} from "../utils/constants/constants";
import {RootState} from "../utils/redux/store";

type InfoCardProps = {
    productProps: Product
};

const InfoCard = (props: InfoCardProps) => {
    const {productProps}  = props;
    const product: Product = JSON.parse(JSON.stringify(productProps));
    const {id, company, model, year, vin, color, price, image} = product;

    const [favouriteAreaVisibility, setFavouriteAreaVisibility] = useState({opacity: "0", transition: ""});
    const dispatch = useDispatch();

    const selector = useSelector((state: RootState) => {
        return state.wishListStore.ids;
    });

    const isProductFavourite = selector.includes(id);
    const imageSource = image ? image : autoImg;

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

    return (
        <Card data-testid="card" sx={{width: 300}} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <CardActionArea data-testid="card-action-area" >
                <FavouriteArea data-testid="favourite-area" style={favouriteAreaVisibility}>
                    <Checkbox
                        data-testid="checkbox"
                        sx={{bottom: 25, padding: 0}}
                        icon={<IoIosHeartEmpty data-testid="io-ios-heart-empty"/>}
                        checkedIcon={<IoIosHeart data-testid="io-ios-heart"/>}
                        checked={isProductFavourite}
                        onChange={handleFavouriteItemWasSelected}/>
                </FavouriteArea>
                <CardMedia
                    data-testid="card-media"
                    component="img"
                    height="280"
                    image={imageSource}
                    alt="autoImg"
                />
                <CardContent data-testid="card-content">
                    <Typography data-testid="typography" gutterBottom variant="subtitle1" sx={{fontSize: "14px", color: "#2d1e9b"}}>
                        {company} {model}, {color}, {year}
                    </Typography>
                    <Typography data-testid="typography" sx={{fontSize: "14px", fontWeight: "bold"}}>
                        {price} $
                    </Typography>
                    <Typography data-testid="typography" sx={{fontSize: '12px', paddingTop: '8px', opacity: "50%"}}>
                        {vin}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default InfoCard;
