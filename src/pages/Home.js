import React, { Fragment, useContext, useEffect } from "react";
import { Form } from "../components/Form";
import { Notes } from "../components/Notes";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Loader } from "../components/Loader";

export const Home = () => {
  const { loading, filteredUsers, fetchUsers, removeUser } = useContext(
    FirebaseContext
  );

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <h1>Список пользователей</h1>
      <Form />
      {loading ? (
        <Loader />
      ) : (
        <Notes users={filteredUsers} onRemove={removeUser} />
      )}
    </Fragment>
  );
};
