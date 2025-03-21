import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import itemsReducer from "./slices/RepositorySlice";
import themeReducer from "./slices/ThemeSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["theme"],
};

const rootReducer = combineReducers({
    items: itemsReducer,
    theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
