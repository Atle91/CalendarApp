export const login = (user: any) => {
    return fetch("/Home/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else
                console.log("Response not OK");
        })
        .then(data => {
            return data;
        });
}

export const authenticate = (token: any) => {
    return fetch("api/Value", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log("data", data)
        if (data === "value")
            return true;
        else
            return false;
    })
}

export function requireAuth(nextState: any, replace: any) {
    if (!authenticate(localStorage.getItem("jwtToken"))) {
        replace({
            pathname: '/login'
        })
    } else {
        console.log("NOT AUTHENTICATED!");
    }
}