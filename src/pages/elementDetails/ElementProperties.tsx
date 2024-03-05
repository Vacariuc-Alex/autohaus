import {Product} from "src/utils/constants/constants";
import React from "react";
import {
    ElementPropertiesContainer
} from "src/utils/styledComponents/elementDetails/elementProperties/ElementPropertiesContainer";
import Typography from "@mui/material/Typography";
import {GrOrganization} from "react-icons/gr";
import {IoIosColorPalette, IoLogoModelS, IoMdPricetags} from "react-icons/io";
import {SlCalender} from "react-icons/sl";
import {LuFormInput} from "react-icons/lu";
import {ELEMENT_PROPERTIES_CONTAINER, ICON, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

type ProductPropertiesProps = {
    product: Product;
}
const ElementProperties = (props: ProductPropertiesProps) => {

    // Destructor
    const {product} = props;

    // Styles
    const propertyNameStyle = {padding: "8px 50px"};
    const propertyValueStyle = {opacity: "50%"};

    // Render
    return (
        <ElementPropertiesContainer data-testid={ELEMENT_PROPERTIES_CONTAINER}>
            <Typography data-testid={TYPOGRAPHY} sx={propertyNameStyle}>
                Company &nbsp;
                <GrOrganization data-testid={ICON}/>
                <Typography data-testid={TYPOGRAPHY} sx={propertyValueStyle}>{product.company}</Typography>
            </Typography>
            <Typography data-testid={TYPOGRAPHY} sx={propertyNameStyle}>
                Model &nbsp;
                <IoLogoModelS data-testid={ICON}/>
                <Typography data-testid={TYPOGRAPHY} sx={propertyValueStyle}>{product.model}</Typography>
            </Typography>
            <Typography data-testid={TYPOGRAPHY} sx={propertyNameStyle}>
                Color &nbsp;
                <IoIosColorPalette data-testid={ICON}/>
                <Typography
                    data-testid={TYPOGRAPHY}
                    sx={{color: product.color.toLowerCase()}}
                >
                    {product.color}
                </Typography>
            </Typography>
            <Typography data-testid={TYPOGRAPHY} sx={propertyNameStyle}>
                Year &nbsp;
                <SlCalender data-testid={ICON}/>
                <Typography data-testid={TYPOGRAPHY} sx={propertyValueStyle}>{product.year}</Typography>
            </Typography>
            <Typography data-testid={TYPOGRAPHY} sx={propertyNameStyle}>
                Price &nbsp;
                <IoMdPricetags data-testid={ICON}/>
                <Typography data-testid={TYPOGRAPHY} sx={propertyValueStyle}>{product.price}</Typography>
            </Typography>
            <Typography data-testid={TYPOGRAPHY} sx={propertyNameStyle}>
                Vin &nbsp;
                <LuFormInput data-testid={ICON}/>
                <Typography data-testid={TYPOGRAPHY} sx={propertyValueStyle}>{product.vin}</Typography>
            </Typography>
        </ElementPropertiesContainer>
    );
}

export default ElementProperties;
