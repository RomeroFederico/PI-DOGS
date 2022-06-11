import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SmartImage from '../SmartImage/SmartImage';
import { closeModalUploadImage, startUploadingImage, uploadImage } from '../../redux/actions/';
import { validateImageToUpload } from '../../util';

import s from './ModalUploadImage.module.css';

export default function ModalUploadImage() {

  const dispatch = useDispatch();

  const { error, errorMsg } = useSelector(state => state.modalUploadImage);

  const [ uploading, setUploading ] = React.useState(false);
  const [ validation , setValidation ] = React.useState('');
  const [ preview, setPreview ] = React.useState(null);
  const [ file, setFile ] = React.useState({
    fileName: '',
    data: null,
  });

  React.useEffect(() => {

    if (!file.data) {
      setPreview(null);
      return;
    }

    const objUrl = URL.createObjectURL(file.data);
    setPreview(objUrl);

    return () => URL.revokeObjectURL(objUrl);
  }, [file]);

  React.useEffect(() => {
    if (error) {
      setUploading(false);
      setValidation(errorMsg);
    }
  }, [error]);

  let handleClose = function() {
    if (uploading) return;
    dispatch(closeModalUploadImage());
  }

  let handleRemove = function() {
    setPreview(null);
    setFile({
      fileName: '',
      data: null
    });
  }

  let handleOnChange = function(e) {
    let [ fileToUpload ] = e.target.files;
    let resultValidation = validateImageToUpload(fileToUpload);
    if (resultValidation.valid) setFile({ fileName: fileToUpload.name, data: fileToUpload });
    else e.target.value = null;
    setValidation(resultValidation.msg);
  }

  const handleClickInput = event => {
    const { target = {} } = event || {};
    target.value = "";
  };

  let handleUploadFile = function() {
    let formData = new FormData();
    formData.append('file', file.data);
    formData.append('fileName', file.fileName);
    setUploading(true);
    dispatch(startUploadingImage());
    dispatch(uploadImage(formData));
  }

  return (
    <div className = {`${s.background} center`}>
      <div className = {s.modal}>
        <div className = {s.modalTitle}>
          <span className = {s.title}>:: Seleccionar Imagen ::</span>
          <button className = {s.closeModal} onClick = {handleClose}>x</button>
        </div>

        <div className = {s.uploadZone}>
          <div className = {`${s.containerImage} center`}>
          {
            preview && 
            <SmartImage image = {preview} alt = {file.fileName} imageStyle = {s.image} />
          }
          {
            !preview && <span className = {s.spanResultValidation} >-NO IMAGE-</span>
          }
          </div> 
          <input type = "file" name = 'file' className = {s.inputFile} onChange = {handleOnChange} onClick = {handleClickInput}/>
          <span className = {`${s.spanResultValidation} ${validation === '' ? s.valid : ''}`}>
            {validation !== '' ? validation : file.fileName}
          </span>
        </div>

        <div className = {`${s.divOptions} center`}>
          <button className = {s.btnCancel} onClick = {handleClose} disabled = {uploading}>Cancelar</button>
          <button className = {s.btnRemove} onClick = {handleRemove} disabled = {!file.data || uploading}>Quitar</button>
          <button className = {s.btnCreate} onClick = {handleUploadFile} disabled = {!file.data || uploading}>
          { uploading ? 'Subiendo' : 'Subir' }
          </button>
        </div>
      </div>
    </div>
  );
}