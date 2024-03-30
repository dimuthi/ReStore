import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function BasketPage() {

    // const [basket, setBasket] = useState<Basket | null>(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     agent.basket.getBasket()
    //         .then(basket => setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    // }, []);

    // if (loading) return <LoadingComponent message="Loading Basket..." />
    const { basket, setBasket, removeItem } = useStoreContext();
    const[loading, setLoading] = useState(false);

    if (!basket) return <Typography variant="h3">Your Basket is Empty</Typography>

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }

    function handleRemoveItem(productId: number, quantity: number) {
        setLoading(true)
        agent.basket.removeItem(quantity, productId)
        .then(() => removeItem(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <Box display="flex" alignItems="center">
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>

                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton loading={loading} color="error" onClick={() => handleRemoveItem(item.productId, item.quantity)}>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton color="secondary" loading={loading} onClick={() => handleAddItem(item.productId)}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${((item.quantity * item.price) / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton color="error" loading={loading} onClick={() => handleRemoveItem(item.productId, item.quantity )}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}
