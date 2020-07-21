export async function getArmy() {
    try {
        let res = await fetch('/getArmy');
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}



