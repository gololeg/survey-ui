import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/dispatch";
import {useAppSelector} from "hooks/selectors";

export const ViewAllTasks = () => {
  const {fetchTasks} = useAppDispatch();
  const selector = useAppSelector(state => state.tasks);



  useEffect(() => {
    fetchTasks()
  }, []);




  console.log(selector)
  return (
    <div>

    </div>
  );
};

