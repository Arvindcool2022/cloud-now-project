import { useDispatch, useSelector } from 'react-redux';
import { activeUser } from '../store/modalSlice';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { availTheme } from '../store/themeSlice';

const ModalComp = ({ id }) => {
  const dispatch = useDispatch();
  const { data } = useSelector(store => store.user);
  const [activeID, setActiveID] = useState(null);
  const [show, setShow] = useState(false);
  const theme = useSelector(state => state.theme);
  const isLight = theme === availTheme.light;

  useEffect(() => {
    if (id !== null) {
      setShow(true);
      setActiveID(...data.filter(x => x.id === id));
    }

    if (id === null && show) setShow(false);
  }, [id]);

  const handleclose = () => {
    dispatch(activeUser(null));
  };
  return (
    <>
      <Modal
        fullscreen
        show={show}
        style={
          isLight
            ? {}
            : {
                '--bs-modal-bg': '#161625',
                '--bs-modal-color': '#fff',
                '--bs-btn-close-color': '#fff'
              }
        }
        sh
        onHide={handleclose}
      >
        <Modal.Header
          closeButton
          style={isLight ? {} : { '--bs-btn-close-color': '#fff' }}
        >
          <Modal.Title className="text-capitalize">
            {activeID?.username || activeID?.name}'s Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>
            <code>{JSON.stringify(activeID, null, 2)}</code>
          </pre>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="outline-dark" onClick={handleclose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalComp;
