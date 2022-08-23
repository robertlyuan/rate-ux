import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import './App.css';
import Restaurant from "./components/Restaurant/Restaurant";
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Nav/>}>
            <Route path='restaurants/:id' element={<Restaurant />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;