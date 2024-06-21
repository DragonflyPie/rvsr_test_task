import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchUsers, selectAllUsers } from "./usersSlice";
import AccordionItem from "./AccordionItem";

function App() {
  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector((state) => state.users.status);
  const dispatch = useAppDispatch();

  //временное решение, чтобы избежать повторного триггера useEffect в dev-моде. в реальном проекте это не нужно
  // const initialized = useRef(false);

  useEffect(() => {
    if (status === "idle") {
      // initialized.current = true;
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <AccordionItem value={user.name} type="user" id={user.id} />
        </li>
      ))}
    </ul>
  );
}

export default App;
