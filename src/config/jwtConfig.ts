const secret = process.env.JWT_SECRET;

// Em produção o segredo é obrigatório — falha cedo em vez de usar um valor público inseguro.
if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production');
}

export const jwtConfig = {
    secret: secret || 'dev-only-insecure-secret',
    expiresIn: '1h',
}
