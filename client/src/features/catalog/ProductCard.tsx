import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";
import { NavLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import agent from "../../app/api/agent";
import { currencyForamt } from "../../app/util/util";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);
    //using context
    // const { setBasket } = useStoreContext();
    //using redux
    const dispatch = useAppDispatch();

    function handleAddItem(productId: number) {
        setLoading(true)
        agent.basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={
                    {
                        sx: { fontWeight: 'bold', color: 'primary.main' }
                    }
                }
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    {currencyForamt(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)} size="small">Add to cart</LoadingButton>
                <Button size="small" component={NavLink} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}