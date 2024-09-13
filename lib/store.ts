import { configureStore } from "@reduxjs/toolkit"
import leadsReducer from "./features/leadsSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            leads: leadsReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
