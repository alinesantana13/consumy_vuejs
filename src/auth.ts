async function signIn(email: any, password: any, onSuccess: any) {
    console.log("will sign in...")

    const body = {
        login: {
            email,
            password
        }
    };

    const response = await fetch("http://localhost:3000/sign_in", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const dataToken = response.json().then((data) => {
        return data
    }).catch((error) => console.log(error));

    const dataUser = await dataToken;
    console.log(dataUser.token);
    console.log(dataUser.email);
};

export const auth = {
    signIn: signIn
}