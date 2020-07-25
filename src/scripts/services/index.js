const httpConfig = {
    url : "http://localhost:3000",
    path : {
        login : "/login",
        register : "/register"
    }
}

export const http = (type, path) => data => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: type || 'post',
            url: httpConfig.url + path,
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response)
            },
            error : function (e){
                reject(e);
            }
        });
    })
}

export const register = http("get", '/register/index.json');
export const login = http("post", '/login');

const services = {
    register,
    login
}

export default services