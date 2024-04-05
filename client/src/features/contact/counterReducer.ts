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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENET_COUNTER:
            return {
                ...state,
                data: state.data + 1
            }
        case DECREMENET_COUNTER:
            return {
                ...state,
                data: state.data - 1
            }
        default:
            return state
    }
   
}