const getHeader = () => {
    return {
        "Content-Type": "application/json",
        "Authentication": "Bearer " + localStorage.getItem("access_token")
    }
};

export { getHeader }