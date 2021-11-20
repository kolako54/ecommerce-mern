export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CARD: 'ADD_CARD',
    ADD_MODAL: 'ADD_MODAL'
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
export const decrease = (data, id) => {
    const newData = [...data];
    newData.forEach((item) => {

        if (item._id === id) {
            item.quantity -= 1
            console.log(item.quantity)
        }
    })
    return ({ type: 'ADD_CARD', payload: newData })
}

export const increase = (data, id) => {
    const newData = [...data];
    newData.forEach((item) => {

        if (item._id === id) {
            item.quantity += 1
            console.log(item.quantity)
        }
    })
    return ({ type: 'ADD_CARD', payload: newData })
}

export const deleteItem = (data, id, type) => {
    const newData = data.filter(item => item._id !== id);
    return ({ type, payload: newData })
}