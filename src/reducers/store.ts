import { configureStore } from '@reduxjs/toolkit'
import {carriersAPI} from "@/reducers/slices/carriers.ts";

export const store = configureStore({
    reducer: {
        [carriersAPI.reducerPath]: carriersAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        carriersAPI.middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
