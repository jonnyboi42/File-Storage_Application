import React, { useEffect, useState } from 'react';
import { getStorage, listAll, ref, getMetadata, getDownloadURL, deleteObject } from 'firebase/storage';
import { handleFileUpload, triggerFileInput } from './Upload';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

const Home = () => {
  const [listOfFiles, setListOfFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [totalStorageUsage, setTotalStorageUsage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  //Function to handle Checkbox selection
  const handleSelected = (fileName,isChecked) => {
    console.log('Handle Selected function has run');
    setSelectedFiles((prevSelected) => {
      if(isChecked){
        return[...prevSelected, fileName]; // Add selected file
      } else {
        return prevSelected.filter((name) => name !== fileName); //Remove Unselected File
      }
    });
  }

    // Log the selected files whenever they change
    useEffect(() => {
      console.log(`Selected Files `, selectedFiles);
    }, [selectedFiles]);
  

  
  // Function to delete selected files
  const deleteSelectedFiles = () => {
    const storage = getStorage();

    selectedFiles.forEach((fileName) => {
      const fileRef = ref(storage, `gs://atlas-1b669.appspot.com/${fileName}`); // Update with your actual path

      deleteObject(fileRef)
        .then(() => {
          console.log(`File ${fileName} deleted successfully`);
          setSelectedFiles([]); // Clear all selected files after deletion
          setIsFileUploaded(!isFileUploaded); // Refresh the file list after deletion
          
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
        });
    });
  };

  // Function to load files from Firebase storage
  const loadFiles = () => {
    const storage = getStorage();
    const listRef = ref(storage, 'gs://atlas-1b669.appspot.com'); // Update with your actual folder path

    listAll(listRef)
      .then((res) => {
        const filePromises = res.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const downloadURL = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            size: (metadata.size / 1024).toFixed(2), // Size in KB
            lastModified: new Date(metadata.updated).toLocaleDateString(), // Format date
            contentType: metadata.contentType,
            url: downloadURL,
          };
        });

        Promise.all(filePromises).then((files) => {
          setListOfFiles(files);

          const totalSizeInKB = files.reduce((acc, file) => acc + parseFloat(file.size), 0);
          const totalSizeInGB = (totalSizeInKB / 1048576).toFixed(4); // Convert KB to GB
          setTotalStorageUsage(totalSizeInGB); // Set total storage in GB
        });
      })
      .catch((error) => {
        console.error('Error listing files:', error);
      });
  };



  // Fetch the list of files whenever `isFileUploaded` changes or on initial load
  useEffect(() => {
    loadFiles();
  }, [isFileUploaded]);

  // Filter files based on search query
  const filteredFiles = searchQuery
    ? listOfFiles.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : listOfFiles;
  

  
  return (
    <div className="home-page-container">
      <Header />
      <Navbar />
      <div className="home-page-middle-content">
        <div className="home-middle-left">
          <p>Files</p>
          <div className="file-display-container">
            <div className="file-display-headings">
              <p>File Name</p>
              <p>File Size</p>
              <p>Last Modified</p>
              <p>Edit</p>
              
            </div>

            <div className="file-display-information">
              <div className="items">
                {filteredFiles.map((file) => (
                  <div className="item" key={file.name}>
                    <p>
                      <a href={file.url} download={file.name}>
                        {file.name}
                      </a>
                    </p>
                    <p>{file.size} KB</p>
                    <p>{file.lastModified}</p>
                    <p>
                    <input className='check-box' type="checkbox" onChange={(e) => handleSelected(file.name, e.target.checked)} />
                    </p>
 
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="search-upload-remove">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <input
                className="file-search"
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              />
            </form>
            <div className="upload-and-remove-container">
            <div className="upload-container-content">
              <p>Upload</p>
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, () => setIsFileUploaded(prev => !prev))}
              />

              <svg 
              className="arrow-down"
              onClick={triggerFileInput}
              stroke="currentColor" 
              fill="currentColor" 
              stroke-width="0" 
              viewBox="0 0 1024 1024" 
              height="1em" 
              width="1em" 
              xmlns="http://www.w3.org/2000/svg">
                <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
              
              </svg>
              
            </div>
            
            <div className="remove-container-content">
              {/* <p>Remove</p> */}

              <svg 
                className="trash-icon"
                onClick={deleteSelectedFiles}
                stroke="currentColor" 
                fill="currentColor" 
                stroke-width="0" 
                viewBox="0 0 1024 1024" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M360 360h304v48H360v-48zm0 128h304v48H360v-48zm0 128h304v48H360v-48zm308-346h-8.5V176H364.5v48H356V176c0-17.7 14.3-32 32-32h232c17.7 0 32 14.3 32 32v48zM184 272h656c17.7 0 32 14.3 32 32v10.5c0 4.4-3.6 8-8 8h-32v592c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V320.5h-32c-4.4 0-8-3.6-8-8V304c0-17.7 14.3-32 32-32zm600 618.5V320H240v570.5h544z"></path>
              </svg>
            </div>
            </div>
 

          </div>
          
        </div>
        <div className="home-middle-right">
          <div className="activity">
            <p>Activity</p>
            <div className="activity-items">
              <p>2 New Files Recently Added</p>
              <p>3 Downloads Recently</p>
            </div>
          </div>
          <div className="storage">
            <p>Storage</p>
            <div className="storage-content">
              <div className="storage-usage-text">
                <p>Total Storage Usage:</p>
              </div>
              <div className="storage-usage-data">
                <p>{totalStorageUsage} GB / 5GB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
