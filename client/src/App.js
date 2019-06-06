import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

const App = () => (
    <div className='container mt-4'>
        <h3 className='display-5 text-center mb-4'>
            <i className='fa fa-upload'/> File Upload
        </h3>
        <FileUpload />
    </div>
);

export default App;
