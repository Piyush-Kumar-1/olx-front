import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./Post";
import My from "./My";
import Edit from "./Edit";
import { useStateValue } from "./StateProvider";
import ImageUpload from "./ImageUpload";

function App() {
  const [{ emaill, namee }, dispatch] = useStateValue();
  console.log(emaill, namee);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <ImageUpload />
            <Post />
          </Route>
          <Route exact path="/my">
            <Header />
            <ImageUpload />
            <My />
          </Route>
          <Route path="/edit">
            <Header />
            <Edit />
          </Route>
          <Route path="*">
            <h1>Error</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
