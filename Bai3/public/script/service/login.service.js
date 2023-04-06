// login   
const loginUser = async (data) => {
    const userLogin = await apiLoginUser(data);
    return userLogin;
}


// register
const registerUser = async (data) => {
    const registerUser = await apiRegisterUser(data);
    return registerUser;
}