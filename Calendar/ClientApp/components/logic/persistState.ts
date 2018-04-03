

let timeout: any;
let counter = 0;
export function persistStateQueue(state:any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        counter++;
        console.log("PERSISTING:", counter, "TIMES, STATE:", state);
        stateIntoDB(state);
    }, 2000);
    
}

export function stateIntoDB(state: any) {
    const model = {
        id: localStorage.getItem("id"),
        state: JSON.stringify(state)
    }
    console.log("MODEL:", model);
    fetch("Home/persistStore", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(model)
    }).then(res => {
        return res.json()
    })

}