import { supabase } from './supabase';

export const authService = {
    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return { user: data.user, session: data.session };
    },

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return { user: data.user, session: data.session };
    },

    async signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        if (error) throw error;
        return { user: data.user, session: data.session };
    },

    async signInWithOtp(phone) {
        const { data, error } = await supabase.auth.signInWithOtp({
            phone
        });
        if (error) throw error;
        return data;
    },

    async verifyOtp(phone, token) {
        const { data, error } = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms',
        });
        if (error) throw error;
        return { user: data.user, session: data.session };
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },

    async getAccessToken() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session?.access_token || null;
    }
};
