// App.jsx
import React, { useState } from 'react';
import { createValidator } from './validator';
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Space,
} from 'antd';

const { Title } = Typography;

const validator = createValidator();

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    validator.validateField(name, value, updatedForm);
    setErrors(validator.getErrors());
    setSuccess(false);
  };

  const handleSubmit = () => {
    Object.keys(form).forEach((field) =>
      validator.validateField(field, form[field], form)
    );

    const currentErrors = validator.getErrors();
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      setSuccess(true);
      message.success('Registration successful!');
    } else {
      setSuccess(false);
      message.error('Please fix the form errors.');
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    validator.reset();
    setErrors({});
    setSuccess(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <Title level={3}>Registration Form</Title>
      <Form layout="vertical">
        <Form.Item
          label="Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name}
        >
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email}
        >
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password}
        >
          <Input.Password
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword}
        >
          <Input.Password
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </Form.Item>

        <Space>
          <Button type="primary" onClick={handleSubmit}>
            Register
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </Form>
    </div>
  );
}

export default App;
