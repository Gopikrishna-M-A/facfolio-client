import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const PublicationForm = () => {
  return (
    // <Form name="educationForm" initialValues={{ education: [{ degree: '', school: '', year: '' }] }}>
      <Form.List name="publications" >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8, flexDirection:"column" }} align="baseline">
                <Form.Item
                
                  {...restField}
                  name={[name, 'title']}
                //   key={[fieldKey, 'degree']}
                  label="Title"
                  rules={[{ required: true, message: 'Please enter the title' }]}
                >
                  <Input placeholder="Enter title" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'authors']}
                //   key={[fieldKey, 'school']}
                  label="Authors"
                  rules={[{ required: true, message: 'Please enter the authors' }]}
                >
                  <Input placeholder="Enter authors (comma-separated)" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'conference']}
                //   key={[fieldKey, 'school']}
                  label="Conference"
                  rules={[{ required: true, message: 'Please enter the conference' }]}
                >
                  <Input placeholder="Enter conference" />
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
                Add Publication
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    // </Form>
  );
};

export default PublicationForm;
