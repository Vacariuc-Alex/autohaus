import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Typography,} from "@mui/material";
import autoImg from "../assets/img/Auto.jpg";

type Element = {
    elementProperties: {
        company: string,
        model: string,
        year: number,
        vin: string,
        color: string,
        price: number
    };
}

const InfoCard: React.FC<Element> = ({elementProperties}) => {

    const {company, model, year, vin, color, price} = elementProperties;

    return (
        <Card sx={{width: 300}}>
            <CardActionArea>
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
