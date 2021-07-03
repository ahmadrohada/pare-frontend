/* export default function({ store, redirect}) {
    if (store.getters['auth/authenticated']){
        return redirect('/');
    }
} */

export default function ({ store, redirect }) { 
    // If the user is authenticated redirect to home page 
    if (store.state.auth.loggedIn) { 
        return redirect('/') 
    }
} 