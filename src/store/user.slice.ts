import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { LoginResponse } from "../interfaces/auth.interface";
import { Profile } from "../interfaces/user.interface";
import { RootState } from "./store";

//объявляем ключ для хранения данных
export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
}

//(state) состояние юзера, которое хранится в слайсе
export interface UserState {
    axiosUserProfile: any;
    loginErrorMessage: any;
    jwt: string | null;
    profile?: Profile;
    // registrationStatus: 'succeded' | 'failed';
    registrationErrorMessage: string | null;
} 

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null, //если ключа нет, то null
    loginErrorMessage: null,
    axiosUserProfile: undefined,
    // registrationStatus: "succeded",
    registrationErrorMessage: null
}

//добавляем асинхронный переходник 
export const login = createAsyncThunk(
    'user/login',
        async (params: { email: string, password: string}) => {
            try {
                const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                    email: params.email,
                    password: params.password  
                });
                //возвращаем данные, чтобы потом обработать
                return data;     
            } catch(e) {
                if (e instanceof AxiosError) {
                    throw new Error(e.response?.data.message);
                }
            }    
        }
);

//получаем данные в профиль пользователя
export const axiosUserProfile = createAsyncThunk(
    'user/profile',
        async (_, thunkApi) => {
            const jwt = thunkApi.getState().user.jwt
                const response = await axios.get<Profile, void, { state: RootState} >(`${PREFIX}/user/profile`, {
                    headers: { 
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                return response.data;
            });

//регистрация
export const registerUser = createAsyncThunk(
    'auth/register',
        async (params: { email: string, password: string, name: string}) => {
            try {
                const { data } = await axios.post<LoginResponse> (`${PREFIX}/auth/register`, {
                    email: params.email,
                    password: params.password,
                    name: params.name  
                });
                    return data;
                } catch(e) {
                    if (e instanceof AxiosError) {
                        throw new Error(e.response?.data.message);
                    }
                }    
            }
    );
       

//создание слайса
export const userSlice = createSlice({
    name:'user',
    initialState,
    //набор функций которые меняют состояния приложения
    //можно создавать неогранич число редюсоров которые меняют состояние
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload;
        }, 
        logout: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
        clearRegisterError: (state) => {
            state.registrationErrorMessage = undefined;
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
           state.loginErrorMessage = action.error.message;
        });
        // state - текущее состояния слайса, action - объект действия, содержащий полезную нагрузку(payload),
        // которая была возвращена асинхронных действием
        builder.addCase(axiosUserProfile.fulfilled, (state, action) => {
            state.axiosUserProfile = action.payload;
            
        });
        builder.addCase(axiosUserProfile.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.registrationErrorMessage = action.payload as string;
        })

    }
});


export default userSlice.reducer;
export const userActions = userSlice.actions;