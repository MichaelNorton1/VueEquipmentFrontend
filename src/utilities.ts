const fetchLinks = async (): Promise<any> => {
    const urlParams = new URLSearchParams(window.location.search);


    return await fetch('http://localhost:8000/accounts/api/', {credentials: 'include'})


}

const getCookie=(name: string) =>{

    const value = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();

}


 const checkAuthentication = async () => {
    try {
        const response = await fetch('http://localhost:8000/accounts/authenticate',{credentials:"include"});
        const json = await response.json();


        return json.isAuthenticated;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};




export {fetchLinks, getCookie, checkAuthentication}