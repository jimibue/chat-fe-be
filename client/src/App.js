import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const testGet = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/langchain/basic");
      setData(res.data);
    } catch (err) {
      setData(err);
    }
  };
  useEffect(() => {
    testGet();
  }, []);
  if (!data) return <div>loading</div>;
  return (
    <div className="App">
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
