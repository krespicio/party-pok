const openPartyModal = () => {
    return {
        type: 'OPEN_PARTY_MODAL',
    }
}

const closePartyModal = () => {
    return {
        type: 'CLOSE_PARTY_MODAL',
    }
}

export {openPartyModal, closePartyModal}