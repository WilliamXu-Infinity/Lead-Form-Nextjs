// store.ts
import { configureStore } from "@reduxjs/toolkit"
import leadsReducer from "./features/leadsSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            leads: leadsReducer,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
