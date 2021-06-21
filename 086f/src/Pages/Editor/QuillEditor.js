import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(event) {
  //   const { inputFunc, inputType } = this.props;
  //   inputFunc(inputType, event);
  // }

  // uploadFile = (formData) => {
  //   const res = Axios.post(`http://${window.location.hostname}:3000/create/fileUp`, formData, {
  //     headers: {
  //       Authorization: cookies.get('access_token_qa'),
  //     },
  //   });
  //   return res;
  // }

  // imageHandler = async () => {
  //   this.quillEditor = this.quillRef.getEditor();
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     const res = await this.uploadFile(formData);
  //     const range = this.quillEditor.getSelection();
  //     const link = res.data.result.url;
  //     const imgSrc = `http://${window.location.hostname}:3000/${link}`;

  //     // this part the image is inserted
  //     // by 'image' option below, you just have to put src(link) of img here.
  //     this.quillEditor.insertEmbed(range.index, 'image', imgSrc);
  //   };
  // }


  render = () => {
    const { renderText, renderModules, renderStyle } = this.props;
    let toolbarContainer = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ];
    if (renderModules) {
      toolbarContainer = renderModules.toolbar;
    }
    return (
      <ReactQuill
        ref={(ref) => this.quillRef = ref}
        value={renderText}
        // onChange={this.handleChange}
        style={renderStyle || {
          height: '600px', width: '100%', display: 'inline-block', fontFamily: 'Calibri', background: "#fff"
        }}
        // modules={{
        //   toolbar: {
        //     container: toolbarContainer,
        //     handlers: {
        //       image: this.imageHandler,
        //     },
        //   },
        // }}
        formats={this.formats}
        className="quill-editor-index"
      />
    );
  }
}


export default QuillEditor;
