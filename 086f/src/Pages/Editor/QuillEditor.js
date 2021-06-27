import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios';
import cookies from '../../utils/cookies';

class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    const { inputFunc, inputType } = this.props;
    inputFunc(inputType, event);
  }

  uploadFile = (formData) => {
    const res = Axios.post(`http://${window.location.hostname}:5001/resource/upload`, formData, {
      headers: {
        Authorization: cookies.get('token'),
      },
    });
    return res;
  }

  imageHandler = async () => {
    this.quillEditor = this.quillRef.getEditor();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const res = await this.uploadFile(formData);
      console.log(res)
      const range = this.quillEditor.getSelection();
      const filename = res.data.filename;
      const imgSrc = `http://${window.location.hostname}:5001/statics/${filename}`;

      // this part the image is inserted
      // by 'image' option below, you just have to put src(link) of img here.
      this.quillEditor.insertEmbed(range.index, 'image', imgSrc);
    };
  }


  render = () => {
    const { renderText, renderModules, renderStyle } = this.props;
    let toolbarContainer = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],
      ['image'],
    ];
    if (renderModules) {
      toolbarContainer = renderModules.toolbar;
    }
    return (
      <ReactQuill
        ref={(ref) => this.quillRef = ref}
        value={renderText}
        onChange={this.handleChange}
        style={renderStyle || {
          height: '200px', width: '100%', display: 'inline-block', fontFamily: 'Calibri',
        }}
        modules={{
          toolbar: {
            container: toolbarContainer,
            handlers: {
              image: this.imageHandler,
            },
          },
        }}
        formats={this.formats}
        className="quill-editor-index"
      />
    );
  }
}


export default QuillEditor;