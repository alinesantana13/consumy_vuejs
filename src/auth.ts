import { storage } from './storage';

const baseUrl = import.meta.env.VITE_API_SERVER_URL;
const endpoint = '/sign_in';

function success(response: Response, onSuccess: () => void) {
  response.json().then((json: any) => {
    storage.store('token', json.token);
    storage.store('email', json.email);
    onSuccess();
  });
}

function failure(response: Response, onFailure: () => void) {
  onFailure()
}

function isLoggedIn() {
  return Boolean(storage.get('token'));
}

function signOut(andThen = () => { }) {
  storage.remove('token');
  storage.remove('email');

  andThen()
}

function currentUser() {
  if (!isLoggedIn()) {
    return null
  }

  return { email: storage.get('email') }
}

async function signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
  const body = {
    login: {
      email,
      password
    }
  };

  const url = `${baseUrl}${endpoint}`

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      success(response, onSuccess)
    } else {
      failure(response, onFailure)
    }
  })
}

export const auth = {
  signIn,
  isLoggedIn,
  signOut,
  currentUser
};
