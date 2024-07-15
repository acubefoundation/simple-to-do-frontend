import { useEffect, useState } from "react";
import axios from "axios";
import "./assets/tailwind.min.css";
function App() {
  const [toDo, settoDo] = useState("");
  const [toDolists, settoDolists] = useState([]);
  const [update, setupdate] = useState(false)
  async function addToDoHandler(e) {
    e.preventDefault();
    await axios.post("http://localhost:8080/add-todo", { toDo });
    settoDo("");
  }
  async function deleteToDo(id) {
    try {
      const result = await axios.delete(
        "http://localhost:8080/delete-task/" + id
      );
      setupdate(!update)
    } catch (error) {
      console.log(error);
    }
  }
  function handleEdit(id) {
    axios
      .put("http://localhost:8080/update-status/" + id)
      .then(() => {
        setupdate(!update)
      })
      .catch((error) => console.log(error));
  }
  console.log(toDolists);
  useEffect(() => {
    axios
      .get("http://localhost:8080/get-all")
      .then((result) => settoDolists(result.data));
  }, [toDo, update]);

  return (
    <div className="items-center w-96 mx-auto ">
      <h1 className="text-green-700 text-xl my-3">
        TO-DO APPLICATION USING MONGODB
      </h1>
      <div className="gap-2">
        <form onSubmit={addToDoHandler}>
          <div className="flex justify-betwee p-4 text-white mb-3">
            <input
              type="text"
              value={toDo}
              onChange={(e) => settoDo(e.target.value)}
              className="w-full text-black border rounded-l-lg p-2 cursor-text"
            />
            <button className="cursor-pointer bg-black p-4">add</button>
          </div>
        </form>
        {/* <Add /> */}

        {toDolists.length !== 0 ? (
          toDolists?.map((toDo, index) => (
            <div key={index} className="bg-black text-white rounded-lg">
              <div className="text-lg p-4  border-b flex gap-2 items-center text-center justify-between">
                <div className="flex gap-2">
                  <select
                    onClick={() => handleEdit(toDo._id)}
                    className={`w-4 h-4 mt-2 rounded-full ${
                      toDo.status && "bg-green-700"
                    }`}
                  ></select>
                  <p className={`${toDo.status && "line-through"}`}>
                    {toDo.todo}
                  </p>
                </div>
                <button
                  className=" cursor-pointer hover:bg-gray-400 p-2"
                  onClick={() => deleteToDo(toDo._id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl items-center text-center text-green-400">
            you have empty task
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
