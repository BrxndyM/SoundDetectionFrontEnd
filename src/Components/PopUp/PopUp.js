import { Modal, Form, Input, Select, Button } from 'antd';
import { useState } from 'react';


const { Option } = Select;

const PopUp = ({ modalIsOpen, setModalIsOpen }) => {
  const [form] = Form.useForm();

  const [newMovie, setNewMovie] = useState({
    title: '',
    duration: '',
    starring: '',
    genre: '',
    year: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setNewMovie({
        title: '',
        duration: '',
        starring: '',
        genre: '',
        year: '',
      });
      setModalIsOpen(false);



      const url = 'https://localhost:44311/api/services/app/Movie/Create';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        },
        body: JSON.stringify(values)
      };
      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            console.log('Movie saved successfully');
          } else {
            console.log("error");
            throw new Error('Error:', response.statusText);
          }
        })
        .catch(error => console.error('Error:', error.message));
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setNewMovie({
      title: '',
      duration: '',
      starring: '',
      genre: '',
      year: '',
    });
    setModalIsOpen(false);
  };

  return (
    <>
      <Button className="add-movie-btn" type="primary" onClick={() => setModalIsOpen(true)}style={{backgroundColor: '#e76f51'}}>
        Add Movie
      </Button>
      <Modal
        className="model"
        visible={modalIsOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Add Movie</h2>
        <Form form={form} layout="vertical" initialValues={newMovie}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input name="title" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true }]}
          >
            <Input name="duration" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Starring"
            name="starring"
            rules={[{ required: true }]}
          >
            <Input name="starring" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true }]}
          >
            <Select
              name="genre"
              onChange={(value) =>
                setNewMovie((prevMovie) => ({ ...prevMovie, genre: value }))
              }
            >
              <Option value="">-- Select a genre --</Option>
              <Option value="Adventure">Adventure</Option>
              <Option value="Horror">Horror</Option>
              <Option value="Thriller">Thriller</Option>
              <Option value="Romance">Romance</Option>
              <Option value="Action">Action</Option>
              <Option value="Mystery">Mystery</Option>
              <Option value="Comedy">Comedy</Option>
              <Option value="Drama">Drama</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Year" name="year" rules={[{ required: true }]}>
            <Input name="year" onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
            };
  export default PopUp;
  
