const isLoggedAsAdmin = (): boolean => {
    const axios = require("axios");
    const admin = axios({
        method: "GET",
        url: "/api/admin-page/admin-page",
    }).then((response: any) => {
        if (
            response.status === 200 &&
            response.data.message == "Admin Logged In"
        ) {
            return true;
        } else if (
            response.status === 200 &&
            response.data.message == "User Logged In"
        ) {
            return false;
        }
    });
    return admin;
};

export default isLoggedAsAdmin;
