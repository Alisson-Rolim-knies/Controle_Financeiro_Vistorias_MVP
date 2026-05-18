/**
 * Configuração do Supabase e funções de autenticação
 */

const SUPABASE_URL = 'https://fphcglbfgiibyenahlzz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_unjTXCZI8hjXd3-ymGxPvg_DKoxTqoH';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkAuth() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session !== null;
    } catch (error) {
        console.error('Erro auth:', error);
        return false;
    }
}

async function updateUIAuth() {
    const isAuthenticated = await checkAuth();

    document.querySelectorAll('.auth-required').forEach(el => {
        el.classList.toggle('d-none', !isAuthenticated);
    });

    document.querySelectorAll('.auth-not-required').forEach(el => {
        el.classList.toggle('d-none', isAuthenticated);
    });
}

async function requireAuth() {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        window.location.href = '/index.html';
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', updateUIAuth);
