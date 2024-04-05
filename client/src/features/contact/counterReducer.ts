export const INCREMENET_COUNTER = "INCREMENT_COUNTER"
export const DECREMENET_COUNTER = "DECREMENT_COUNTER"

export interface CounterState {
    data: number,
    title: string
}

const initialState: CounterState = {
    data: 42,
    title: "Hello Redux"
}

export function increment(amount = 1) {
    return {
        type: INCREMENET_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECREMENET_COUNTER,
        payload: amount
    }
}

interface CounterAction {
    type: string,
    payload: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function counterReducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case INCREMENET_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECREMENET_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state
    }
   
}