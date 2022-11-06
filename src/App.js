import React, { useRef, useState } from "react";
import {Button, Form, FormGroup, Label, Navbar, NavbarBrand} from "reactstrap";
import { FileDrop } from "react-file-drop";

const App = () => {

  const [isPending, setState] = useState(true);
  const fileInputRef = useRef(null);

  const onFileInputChange = (event) =>{
    const { files } = event.target;

  }

  const onTargetClick = () => {
    fileInputRef.current.click()
  }

  return (
    <React.Fragment>
      <Navbar
        className="my-2"
        color="primary"
      >
        <NavbarBrand href="/">
          Video Compressor
        </NavbarBrand>
      </Navbar>
      <Form>
        <FormGroup>
          <Label>Upload Video</Label>
          <input onChange={onFileInputChange} ref={fileInputRef} type="file" hidden />
          <FileDrop
            onTargetClick={onTargetClick}
          />
        </FormGroup>
      </Form>
      <div>
        { !isPending && <a href="" download><Button>Down Compressed Video</Button></a>}
      </div>
    </React.Fragment>
  );
}

export default App;