export const LoginStart = (userCredentials) =>({
    type: "LOGIN_START",
})


export const LoginSuccess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload:user
})


export const LoginFailure = () =>({
    type:"LOGIN_FAILURE",
})

export const Logout = () =>({
    type:"LOGOUT",
})

export const UpdateAccStart = (userCredentials) =>({
    type: "UPDATEACC_START",
})


export const UpdateAccSuccess = (user) =>({
    type:"UPDATEACC_SUCCESS",
    payload:user
})


export const UpdateAccFailure = () =>({
    type:"UPDATEACC_FAILURE",
})
