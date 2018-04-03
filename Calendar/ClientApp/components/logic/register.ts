import "isomorphic-fetch";

export const isNameTaken = (name: string) => {
    return fetch("/Home/CheckUserName?name=" + name)
        .then(res => {
            if (res.ok)
                return res.json();
            else
                console.log("Response not OK");
        })
        .then(data => {
            return data;
        });
}
