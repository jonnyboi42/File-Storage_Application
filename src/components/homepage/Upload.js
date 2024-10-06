import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';

export const handleFileUpload = (e, onUploadComplete) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const storage = getStorage();
    const storageRef = ref(storage, file.name); // Create a reference for the file

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor the file upload progress
    uploadTask.on('state_changed',
        (snapshot) => {
            // You can track the progress here if you'd like
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.error("Upload failed:", error);
        },
        () => {
            // Get the file's download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                alert("File uploaded successfully!");

                // Call the callback function to notify the upload completion
                if(onUploadComplete){
                    onUploadComplete();
                }
            });
        }
    );
};

export const triggerFileInput = () =>{
    document.getElementById('file-input').click(); // Trigger the hidden file input
}