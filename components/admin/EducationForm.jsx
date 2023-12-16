import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const EducationForm = () => {
  return (
    // <Form name="educationForm" initialValues={{ education: [{ degree: '', school: '', year: '' }] }}>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'degree']}
                //   key={[fieldKey, 'degree']}
                  label="Degree"
                  rules={[{ required: true, message: 'Please enter the degree' }]}
                >
                  <Input placeholder="Enter degree" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'school']}
                //   key={[fieldKey, 'school']}
                  label="School"
                  rules={[{ required: true, message: 'Please enter the school' }]}
                >
                  <Input placeholder="Enter school" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'year']}
                //   key={[fieldKey, 'year']}
                  label="Year"
                  rules={[{ required: true, message: 'Please enter the year' }]}
                >
                  <Input placeholder="Enter year" />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    // </Form>
  );
};

export default EducationForm;
