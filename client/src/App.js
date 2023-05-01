import { Route } from "react-router-dom";
import "./App.css";
import { Landing, Home, Detail, Form } from "./views";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={Detail} />
      <Route exact path="/newVideogame" component={Form} />
    </div>
  );
}

export default App;
