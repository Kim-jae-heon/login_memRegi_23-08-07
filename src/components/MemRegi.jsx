import React, {useRef} from 'react';

import '../css/MemRegi.css';
import { Form, Input, Select, Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const MemRegi = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const onFinish = (values) => {
    if(localStorage.getItem(`${values.email}`)) {
      alert('중복된 회원입니다😢');
      return;
    } else {
      localStorage.setItem(`${values.email}`, JSON.stringify(values));
      alert('회원 등록에 성공했습니다!');
      return navigate('/');
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue='010'
        style={{
          width: 70,
        }}
      >
        <Option value="010">010</Option>
        <Option value="02">02</Option>
      </Select>
    </Form.Item>
  );
  const onReset = () => {
    formRef.current?.resetFields();
  }

  return (
    <main className='register-main'>
      <Space style={{display: 'flex', flexDirection:'column',
    justifyContent: 'center', height: '100vh'}}>
        <h1>회원가입</h1>
        <Form
          {...formItemLayout}
          form={form}
          ref={formRef}
          name="register"
          style={{maxWidth: '600px'}}
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="이메일"
            rules={[
              {
                type: 'email',
                message: '유효한 이메일이 아닙니다!',
              },
              {
                required: true,
                message: '이메일을 넣어주세요!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요!',
              },
              {
                pattern: /^(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[a-zA-Z]).{8,}$/,
                message: '영소/대문자,특수문자,숫자 1개이상 필요!'
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="비밀번호 재확인"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호를 재확인해주세요!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호가 맞지 않습니다!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="별명"
            tooltip="학창시절 별명? 요즘 자주 불리고있는 별칭?"
            rules={[
              {
                required: true,
                message: '닉네임을 넣어주세요!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="연락처"
            rules={[
              {
                required: true,
                message: '연락처를 넣어주세요!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="성별"
            rules={[
              {
                required: true,
                message: '성별을 골라주세요!',
              },
            ]}
          >
            <Select placeholder="성별을 골라주세요">
              <Option value="male">남성</Option>
              <Option value="female">여성</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button className='register-btn' type="primary" htmlType="submit">
              회원등록
            </Button>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button className='reset-btn' type="primary" danger htmlType="button"
            onClick={onReset}>
              리셋
            </Button>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button className='home-btn' type="primary" htmlType="button">
              <Link to='/' className='to-home'>홈페이지로</Link>
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </main>
  );
}

export default MemRegi;