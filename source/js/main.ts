const getSelectedAuthMethod = () => {
  return document.querySelector<HTMLInputElement>('#auth-method-select select')?.value;
};

const onAuthContinue = () => {
  // eslint-disable-next-line no-console
  console.log(getSelectedAuthMethod());
};

const registerListners = () => {
  document.querySelector('#auth-continue')?.addEventListener('click', onAuthContinue);
};

registerListners();
