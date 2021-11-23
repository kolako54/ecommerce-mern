import jwt from 'jsonwebtoken'

export const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '1d'})
}
export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '15d'})
}