import React, {useState} from 'react';

const ChatGPTUI = () => {
    const [apiinput, setapiinput] = useState("");
    const [isApiupdate, setisApiUpdated] = useState("");

     //Adding userAPi in local stroage
  const addAPiKey = () =>{
    console.log("Clicked");
    sessionStorage.setItem("myApiKey", JSON.stringify(apiinput));

    // Reload the browser
    setisApiUpdated("Api Has been updated succesfully!!");
      window.location.reload();
    
  }
  return (
    <>
      {/* Model for update API key */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update your API key
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="text" value={apiinput} onChange={(e) => setapiinput(e.target.value)} className="form-control shadow-none" placeholder="Enter your API key"/>
               
            </div>
            <div className="modal-footer d-flex justify-content-between w-100">
              <p className='text-success'>{isApiupdate}</p>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={()=> addAPiKey()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatGPTUI