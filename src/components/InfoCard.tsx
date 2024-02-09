import React, {ChangeEvent, useEffect, useState} from "react";
import {Card, CardActionArea, CardContent, CardMedia, Checkbox, Typography,} from "@mui/material";
import autoImg from "../assets/img/Auto.jpg";
import {addItem, removeItem} from "../utils/redux/wishList";
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../utils/redux/store";
import FavouriteArea from "../utils/styledComponents/FavouriteArea";
import {IoIosHeart, IoIosHeartEmpty} from "react-icons/io";


type Element = {
    elementProperties: {
        id: number,
        company: string,
        model: string,
        year: number,
        vin: string,
        color: string,
        price: number,
        isFavourite?: boolean
    };
}

const InfoCard: React.FC<Element> = ({elementProperties}) => {

    const {id, company, model, year, vin, color, price} = elementProperties;

    const [favouriteAreaVisibility, setFavouriteAreaVisibility] = useState({display: "none"});
    const dispatch = useDispatch();
    const wishList = useSelector((state: RootState) => {
        return state.wishList.ids;
    });

    //For logs only
    useEffect(() => {
        console.log(wishList);
    }, [wishList]);

    useEffect(() => {
        if (!elementProperties.isFavourite) {
            setFavouriteAreaVisibility({display: "none"});
        } else {
            setFavouriteAreaVisibility({display: "block"});
        }
    }, [elementProperties]);

    const handleFavouriteItemWasSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            elementProperties.isFavourite = true;
            dispatch(addItem(id));
        } else {
            elementProperties.isFavourite = false;
            dispatch(removeItem(id));
        }
    }

    const handleItemCheckState = () => {
        return !!elementProperties.isFavourite;
    }

    const handleOnMouseEnter = () => {
        setFavouriteAreaVisibility({display: "block"});
    }

    const handleOnMouseLeave = () => {
        if (!elementProperties.isFavourite) {
            setFavouriteAreaVisibility({display: "none"});
        }
    }

    return (
        <Card sx={{width: 300}} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <CardActionArea>
                <FavouriteArea style={favouriteAreaVisibility}>
                    <Checkbox sx={{bottom: 25, padding: 0}}
                              icon={<IoIosHeartEmpty/>}
                              checkedIcon={<IoIosHeart/>}
                              checked={handleItemCheckState()}
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
