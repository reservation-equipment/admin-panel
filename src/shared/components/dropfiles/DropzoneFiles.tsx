import {useCallback, useMemo} from 'react';
import {useDropzone} from "react-dropzone";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: 150
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const DropzoneFiles = () => {
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles)
    }, [])
    // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        // acceptedFiles,
        // fileRejections
    } = useDropzone({onDrop, accept: {'image/*': []}});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    // const acceptedFileItems = acceptedFiles.map(file => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));
    //
    // const fileRejectionItems = fileRejections.map(({file, errors}) => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //         <ul>
    //             {errors.map(e => (
    //                 <li key={e.code}>{e.message}</li>
    //             ))}
    //         </ul>
    //     </li>
    // ));

    return (
        <div className="container mt-5 mb-5">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </div>
    );
};

export default DropzoneFiles;