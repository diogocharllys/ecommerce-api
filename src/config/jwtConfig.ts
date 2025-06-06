export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'secretkey',
    expiresIn: '1h',
}
