import {signalStore,patchState,withState,withMethods,withComputed,withHooks} from '@ngrx/signals';
import {computed} from '@angular/core';

export const AuthStore = signalStore(
    withState({
        user: null as /*CHANGE THIS*/ string  | null,
        token: null as string | null,
        loading: false,
        error: null as string | null,
    }),

    withComputed(store => ({
        isAuthenticated: computed(() => !!store.user()),
    })),

    withMethods(store => ({
        loginStart(){
            patchState(store, {
                loading: true,
                error: null
            });
        },
        loginSuccess(user: string, token: string){
            patchState(store, {
                user,
                token,
                loading: false,
                error: null
            });
        },
        logout(){
            patchState(store, {
                user: null,
                token: null,
            });
        }
    })),
    withHooks(store => ({
        onInit(){
            console.log('AuthStore initialized');
        },
        onDestroy(){
            console.log('AuthStore destroyed');
        }   
    }))
);