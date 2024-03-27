import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let emailValidate =
  /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;

const initData = { name: '', email: '', number: '' };

const FormComp = ({ closeForm }) => {
  const [data, setData] = useState(initData);
  const [error, setError] = useState({
    name: false,
    email: false,
    number: false
  });

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    let errorFlag = false;

    // Basic validation
    if (!data.name.trim()) {
      errorFlag = true;
      setError(prevErrors => ({ ...prevErrors, name: 'Name is required' }));
    } else setError(prevErrors => ({ ...prevErrors, name: false }));

    if (!emailValidate.test(data.email)) {
      errorFlag = true;
      setError(prevErrors => ({
        ...prevErrors,
        email: 'Invalid email format'
      }));
    } else setError(prevErrors => ({ ...prevErrors, email: false }));

    if (`${data.number}`.length !== 10) {
      errorFlag = true;
      setError(prevErrors => ({
        ...prevErrors,
        number: 'Invalid phone number'
      }));
    } else setError(prevErrors => ({ ...prevErrors, number: false }));

    if (!errorFlag) {
      dispatch(addUser({ ...data, phone: data.number }));
      setData(initData);
      closeForm();
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className=" py-4 px-2 ">
        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between">
            <Form.Label>Full Name</Form.Label>
            {error.name && (
              <Form.Text className="text-danger">{error.name}</Form.Text>
            )}
          </div>
          <Form.Control
            autoFocus
            type="text"
            placeholder="eg: John Doe"
            value={data.name}
            className={error.name ? 'border-danger' : ''}
            onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between">
            <Form.Label>Email Address</Form.Label>
            {error.email && (
              <Form.Text className="text-danger">{error.email}</Form.Text>
            )}
          </div>
          <Form.Control
            type="email"
            placeholder="eg: johndow@example.com"
            value={data.email}
            className={error.email ? 'border-danger' : ''}
            onChange={e =>
              setData(prev => ({ ...prev, email: e.target.value }))
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between">
            <Form.Label>Phone Number</Form.Label>
            {error.number && (
              <Form.Text className="text-danger">{error.number}</Form.Text>
            )}
          </div>
          <Form.Control
            type="number"
            placeholder="eg: 1234567890"
            value={data.number}
            className={error.number ? 'border-danger' : ''}
            onChange={e =>
              setData(prev => ({ ...prev, number: e.target.value }))
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button type="submit" variant="outline-success">
            Add User
          </Button>
          <Button onClick={closeForm} variant="outline-danger">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormComp;
