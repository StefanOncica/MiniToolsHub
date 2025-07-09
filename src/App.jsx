import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const tools = [
    {
      icon: "📝",
      name: "To-Do List",
      description: "Manage daily tasks easily.",
    },
    {
      icon: "🔐",
      name: "Password Generator",
      description: "Create secure passwords instantly.",
    },
    {
      icon: "🔄",
      name: "Unit Converter",
      description: "Convert between metric and imperial.",
    },
    {
      icon: "🎂",
      name: "Age Calculator",
      description: "Calculate your exact age.",
    },
    {
      icon: "💸",
      name: "Tip Calculator",
      description: "Split and calculate tips fast.",
    },
    {
      icon: "🎲",
      name: "Random Picker",
      description: "Pick a random item from a list.",
    },
  ];

  return (
    <div className="wrapper">
      <h1>🧰 Mini Tools Hub</h1>
      <div className="card-container">
        {tools.map((tool, index) => (
          <div className="card" key={index}>
            <h2>
              {tool.icon} {tool.name}
            </h2>
            <p>{tool.description}</p>
            {tool.name === "To-Do List" ? (
              <Link to="/todo">
                <button>Open Tool</button>
              </Link>
            ) : (
              <button>Open Tool</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
