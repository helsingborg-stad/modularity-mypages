console.log("My pages: main init"); 

const getSelectedAuthMethod = () => {
    return document.querySelector<HTMLInputElement>('#auth-method-select select')?.value
}

const onAuthContinue = () => {
    console.log(getSelectedAuthMethod());
}

const registerListners = () => {
    document.querySelector('#auth-continue')?.addEventListener('click', onAuthContinue)
}

registerListners();