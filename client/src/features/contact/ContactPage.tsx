import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState } from "./counterReducer";

export default function ContactPage() {
    const dispatch = useDispatch()
    const { title, data } = useSelector((state: CounterState) => state)
    return (
        <>
            <Typography variant="h2">
                {title}
            </Typography>
            <Typography variant="h5">
                data is = {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch({type: "DECREMENT_COUNTER"})} variant="contained" color="error">Decrement</Button>
                <Button onClick={() => dispatch({type: "INCREMENT_COUNTER"})} variant="contained" color="primary">Increment</Button>
            </ButtonGroup>
        </>

    )
}