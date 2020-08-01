export async function getArmy() {
    try {
        let res = await fetch('/getArmy');
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
export async function getMap() {
    try {
        let res = await fetch('/getMap');
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
export async function saveMap(data) {
    try {
        let json =JSON.stringify(data)
        console.log(json)
        let res = await fetch('/saveMap', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: json,
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

