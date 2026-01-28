import {signalStore,patchState,withState,withMethods,withComputed,withHooks} from '@ngrx/signals';
import {computed, inject, signal} from '@angular/core';
import {LoginApi} from './login.api';

export const LoginStore = signalStore(
    withState({
        loading: false,
        msg: null as string |null,
        error:null as string | null,
    }),

    withMethods((store) =>{
        const api = inject(LoginApi);
        return{
            login(username:string, password:string){
                console.log(username,password);
                var msg = null;
                var errmsg = null;
                api.health().subscribe({
                    next:(inmsg) =>{
                        msg = inmsg
                    },
                    error:{err} =>{
                        errmsg = err.message ?? 'Login failed';
                    }
                patchState(store,{
                    loading:true,
                    error:null,
                    msg:
                    })
                })
            }
        }
    })
)