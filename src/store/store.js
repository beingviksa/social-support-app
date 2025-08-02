import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import formReducer from "@features/form/formSlice";
import formProgressReducer from "@features/formProgress/formProgressSlice";

const persistConfig = {
  key: "formProgress",
  storage,
};

const persistedReducer = persistReducer(persistConfig, formProgressReducer);

export const store = configureStore({
  reducer: {
    form: formReducer,
    formProgress: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
