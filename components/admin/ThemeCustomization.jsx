import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Modal, Switch, Input, Form } from 'antd';
import { EditOutlined, EyeInvisibleOutlined, EyeOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';


const { Title, Paragraph } = Typography;
const themeData = {
  darkMode: false,
  primaryColor: '#3498db',
  secondaryColor: '#e74c3c',
  gradientColor: ['#1abc9c', '#3498db', '#e74c3c'],
}

const ThemeCustomization = ({ userData, baseURL }) => {
  const [form] = Form.useForm();
  // const [themeData, setThemeData] = useState(true);
  const [darkMode, setDarkMode] = useState(themeData.darkMode);
  const [color1, setColor1] = useState('#B16CEA');
  const [color2, setColor2] = useState('#FF5E69');
  const [color3, setColor3] = useState('#FF8A56');
  const [color4, setColor4] = useState('#FFA84B');
  var gradientValue = `linear-gradient(to right, ${color1}, ${color2}, ${color3}, ${color4})`;
  useEffect(() => {
    gradientValue = `linear-gradient(to right, ${color1}, ${color2}, ${color3}, ${color4})`;
  }, [color1,color2,color3,color4])

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

    const handleDarkModeToggle = (checked) => {
    setDarkMode(checked);
    // Perform any additional actions for dark mode
  };

  const handleSaveCustomization = (values) => {
    const gradientColors = [color1, color2, color3, color4];
    console.log('Gradient Colors:', gradientColors);
    console.log('Customization saved:', values);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 }, // Extra small devices (phones)
      sm: { span: 9 },  // Small devices (tablets)
      md: { span: 8 },  // Medium devices (desktops)
      lg: { span: 6 },  // Large devices (desktops)
      xl: { span: 6 },  // Extra large devices (large desktops)
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
      md: { span: 14 },
      lg: { span: 10 },
      xl: { span: 8 },
    },
  };

  return (
    <div>
      {themeData ? (
        <Card
        actions={[
          // <SettingOutlined key="setting" />,
          // themeData.isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />,
          // <EditOutlined key="edit" onClick={handleEditClick}/>,
          // <SettingOutlined />
        ]}
        >
     <Form
        {...formItemLayout}
        form={form}
        onFinish={handleSaveCustomization}
     
      >
        <Form.Item 
        label="Dark Mode" name="darkMode" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Primary Color" name="primaryColor">
          <Input type="color" />
        </Form.Item>

        <Form.Item label="Secondary Color" name="secondaryColor">
          <Input type="color" />
        </Form.Item>

        <Form.Item label="Gradient Color">
          <div className='gradient-input'
          style={{
            maxWidth: '300px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}>
          <Input type="color" defaultValue={color1} onChange={(e) => setColor1(e.target.value)} />
          <Input type="color" defaultValue={color2} onChange={(e) => setColor2(e.target.value)} />
          <Input type="color" defaultValue={color3} onChange={(e) => setColor3(e.target.value)} />
          <Input type="color" defaultValue={color4} onChange={(e) => setColor4(e.target.value)} />

          </div>
        </Form.Item>

        <h3 style={{
          backgroundClip: 'text',
          color: 'transparent', 
          backgroundImage: gradientValue,
          textAlign:'center'
        }}>
          GRADIENT
        </h3>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Customization
          </Button>
        </Form.Item>
      </Form>



        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ThemeCustomization;
