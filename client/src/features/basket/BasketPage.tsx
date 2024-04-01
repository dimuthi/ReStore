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
    const[status, setStatus] = useState({
        loading: false,
        name: ''
    });

    if (!basket) return <Typography variant="h3">Your Basket is Empty</Typography>

    function handleAddItem(productId: number, name: string) {
        setStatus({loading: true, name: name});
        agent.basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}));
    }

    function handleRemoveItem(productId: number, quantity: number, name: string) {
        setStatus({loading: true, name: name});
        agent.basket.removeItem(quantity, productId)
        .then(() => removeItem(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}));
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
                                    <LoadingButton loading={status.loading && status.name === 'rem' + item.productId} color="error" onClick={() => handleRemoveItem(item.productId, 1, 'rem'+item.productId)}>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton color="secondary" loading={status.loading && status.name === 'add' + item.productId} onClick={() => handleAddItem(item.productId, 'add'+item.productId)}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${((item.quantity * item.price) / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton color="error" loading={status.loading && status.name === 'del' + item.productId} onClick={() => handleRemoveItem(item.productId, item.quantity, 'del'+item.productId)}>
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
