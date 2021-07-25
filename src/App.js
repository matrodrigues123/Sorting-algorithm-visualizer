import "./App.scss";
import RenderArray from "./components/RenderArray";

function App() {
  return (
    <div>
      <Header />
      <RenderArray />
    </div>
  );
}

const Header = () => {
  return (
    <div className="header">
      <h1>Sorting visualizer</h1>
    </div>
  );
};

export default App;
