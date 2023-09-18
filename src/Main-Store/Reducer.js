
const firstModeStates = {
    sidebarToggler: true,
}

const Reducer =(state = firstModeStates, action) => {
    switch (action.type) {
        case 'sidebarToggleOff':
            return {
                ...state,
                sidebarToggler: false,
            }
        case 'sidebarToggleOn':
            return {
                ...state,
                sidebarToggler:true,
            }
        default: return state
    }
}

export default Reducer;