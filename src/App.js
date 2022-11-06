import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Label, Navbar, NavbarBrand, Input } from "reactstrap";
import { PropagateLoader } from "react-spinners";

const App = () => {

  const [isPending, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const fileInputRef = useRef(null);

  const onFileInputChange = (event) => {
    const { files } = event.target;
    if(files){
      console.log(files[0].size);
      if(files[0].size > 50000000){
        setInvalid(true);
        return;
      }
      setFile(files[0]);
      setLoading(true);
      setTimeout(() => {
        setState(false);
        setLoading(false);
      }, 2000);
    }
  }


  const onDownloadFile = () => {
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const onReset = () => {
    setFile(null);
    setLoading(false);
    setState(true);

  }
  return (
    <React.Fragment>
      <Navbar
        className="my-2"
        color="primary"
      >
        <NavbarBrand href="/" color="">
          Video Compressor
        </NavbarBrand>
      </Navbar>
      <div style={{display: "flex", flexDirection: "column", marginTop:"100px", width:"60%", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}>
        <Form>
          <FormGroup>
            <Label>Upload Video</Label>
            <Input onChange={onFileInputChange} ref={fileInputRef} type="file" accept="video/*" invalid={invalid}/>
          </FormGroup>
        </Form>
        <div style={{marginTop: "10px"}}>
        { loading && <PropagateLoader />}
        { !isPending && (
            <Button color="primary" onClick={onDownloadFile}>Down Compressed Video</Button>
        )}
        {
          file && <Button color="secondary" onClick={onReset}>Reset</Button>
        }
      </div>
      </div>
    </React.Fragment>
  );
}

export default App;