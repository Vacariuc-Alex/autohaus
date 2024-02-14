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
    const {id, company, model, year, vin, color, price} = product;

    const [favouriteAreaVisibility, setFavouriteAreaVisibility] = useState({opacity: "0", transition: ""});
    const dispatch = useDispatch();

    const selector = useSelector((state: RootState) => {
        return state.wishListStore.ids;
    });

    const isProductFavourite = selector.includes(id);

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
        <Card sx={{width: 300}} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <CardActionArea>
                <FavouriteArea style={favouriteAreaVisibility}>
                    <Checkbox sx={{bottom: 25, padding: 0}}
                              icon={<IoIosHeartEmpty/>}
                              checkedIcon={<IoIosHeart/>}
                              checked={isProductFavourite}
                              onChange={handleFavouriteItemWasSelected}/>
                </FavouriteArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={autoImg}
                    alt="autoImg"
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" sx={{fontSize: "14px", color: "#ff0000"}}>
                        {company} {model}, {color}, {year}
                    </Typography>
                    <Typography sx={{fontSize: "14px", fontWeight: "bold"}}>
                        {price} $
                    </Typography>
                    <Typography sx={{fontSize: '12px', paddingTop: '8px', opacity: "50%"}}>
                        {vin}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default InfoCard;
