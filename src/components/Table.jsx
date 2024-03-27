import { useEffect, useState } from 'react';
import Cell from './Cell';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/userSlice';
import Form from './Form';
import ModalComp from './Modal';
import { Button, Modal } from 'react-bootstrap';
import ThemeToggler from './ThemeToggler';
import { availTheme } from '../store/themeSlice';

const TableComp = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector(store => store.user);
  const { activeuser } = useSelector(store => store.modal);
  const theme = useSelector(state => state.theme);

  const isLight = theme === availTheme.light;

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (status === 'loading') return <h1>loading...</h1>;

  if (status === 'error') return <h1>Something went wrong try again later</h1>;
  return (
    <section className="container">
      <div className="d-flex justify-content-between mb-2">
        <ThemeToggler />
        <Button
          className="text-capitalize"
          variant={!isLight ? 'dark' : 'primary'}
          size="sm"
          onClick={() => setShow(true)}
        >
          add new user
        </Button>
      </div>
      <Modal
        style={
          theme === availTheme.light
            ? {}
            : { '--bs-modal-bg': '#161625', '--bs-modal-color': '#fff' }
        }
        show={show}
        onHide={() => setShow(false)}
        centered
      >
        {/* <Modal.Dialog> */}
        <Modal.Header closeButton>
          <Modal.Title>Create new user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form closeForm={() => setShow(false)} />
        </Modal.Body>
        {/* </Modal.Dialog> */}
      </Modal>
      <Table
        bordered
        hover
        striped
        variant={isLight ? 'info' : 'dark'}
        className="text-center"
      >
        <thead key={999} className={!isLight ? 'table-light' : 'table-dark'}>
          <tr className="text-capitalize">
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map(x => (
            <Cell key={x.id} data={x} />
          ))}
        </tbody>
      </Table>
      <ModalComp id={activeuser} />
    </section>
  );
};

export default TableComp;
