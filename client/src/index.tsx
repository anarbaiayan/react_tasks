import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/reset.css'
import './css/main.css'
import Store from "./store/store.ts"


interface State {
  store: Store
}

export const store = new Store()

export const Context = createContext<State>({
  store,
})

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Context.Provider value={{
    store
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>

);

