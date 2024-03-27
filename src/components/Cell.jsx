import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { activeUser } from '../store/modalSlice';

const Cell = ({ data }) => {
  const [activeID, setActiveID] = useState(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(activeUser(activeID));
  // }, [activeID]);

  const handleCLick = id => {
    setActiveID(id);
    dispatch(activeUser(id));
  };

  return (
    <tr
      key={data.id}
      className="cursor-pointer"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handleCLick(data.id);
      }}
    >
      <td className="">{data.name}</td>
      <td className="">{data.email}</td>
      <td>{data.phone}</td>
    </tr>
  );
};

export default Cell;
