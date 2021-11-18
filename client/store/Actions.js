export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CARD: 'ADD_CARD'
}
export const addToCard = (product, card) => {
    if (product.inStock === 0) {
        return ({ type: 'NOTIFY', payload: { error: 'This product is out of stock.' } })
    }
    const check = card.every(item => {
        return item._id !== product._id
    })
    if (!check) return ({ type: 'NOTIFY', payload: { error: 'This product already has been added to card dear :/' } })
    return ({ type: 'ADD_CARD', payload: [...card, { ...product, quantity: 1 }] })

};