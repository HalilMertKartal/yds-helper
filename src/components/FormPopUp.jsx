import Form from 'react-bootstrap/Form';

function FormPopUp() {
  return (
    <Form>
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-4">
          <Form.Check
            inline
            label="Word Set 1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="Word Set 2"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Phrasals"
            type={type}
            id={`inline-${type}-3`}
          />
          <Form.Check
            inline
            label="Prepositions-Conjunctions"
            type={type}
            id={`inline-${type}-4`}
          />
        </div>
      ))}
    </Form>
  );
}

export default FormPopUp;