import React from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://react-express-1990.herokuapp.com/api/status")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setData(data.status)
      });
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://react-express-1990.herokuapp.com/api/hello', requestOptions)
        .then(response => response.json())
        .then(data => console.log("POST ", data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
