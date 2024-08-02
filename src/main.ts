import './app.css'
import "./assets/styles/global.css"
import "./assets/styles/variables.css"
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
})

export default app
