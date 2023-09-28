import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import ChatGPTResultBody from "./ChatGPTResultBody";
import { generateRandomName } from "../utils/helper";
import { apiUrl, rapidApiHeaders } from "../utils/constants";
import { useToggle } from "../utils/ToggleContext";
import { maxCount } from "../utils/constants";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const msgEnd = useRef(null);
  const [apiLimit, setApilimit] = useState(false);
  const [apierror, setapierror] = useState(false)
  const [generateRandomNames, setGenerateRandomNames] = useState([
    "",
    "",
    "",
    "",
  ]);

  // Load search history from local storage when the component mounts
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Update local storage whenever the search history changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const { toggle, toggleButton } = useToggle();

  useEffect(() => {
    const newRandomNames = Array.from({ length: 4 }, generateRandomName);
    setGenerateRandomNames(newRandomNames);
  }, []);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const sendMessage = async (content) => {
    const options = {
      method: "POST",
      headers: rapidApiHeaders,
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
        web_access: false,
        stream: false,
      }),
    };
    try {
      const response = await fetch(apiUrl, options);
      if(response.status === 403) return setapierror(true) 
      if (response.status === 429) return setApilimit(true); 

      const result = await response.json();
      setMessages([
        ...messages,
        { role: "user", content: content, result: result.BOT },
      ]);
    } catch (error) {
      setapierror(true)
    }
  };

  const sendUserQuestion = () => {
    if (userInput.trim() !== "") {
      const myInput = userInput;
      setUserInput("");
      setSearchHistory([...searchHistory, myInput]);

      // Add the user message to the messages array before sending
      setMessages([...messages, { role: "user", content: myInput }]);

      // Then, send the message
      sendMessage(myInput);
    }
  };

  // Function to handle clicks on "div1" elements
  const handleDiv1Click = (content) => {
    sendMessage(content); // Send the message with clicked content
    setMessages([...messages, { role: "user", content: content }]);
  };

  const handleDeleteClick = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  return (
    <>
      <div className="main-container d-flex">
        <SideBar searchHistory={searchHistory} />
        <div className="chatgpt-mainbody d-flex flex-column justify-content-between align-items-center w-100 dark-grayish-blue p-4">
          <div className="chatgpt-upper d-flex justify-content-between w-100">
            <button
              onClick={toggleButton}
              className={`${
                !toggle ? "invisible" : ""
              } text-decoration-none toggle-icon-fulldevice-sidebar ms-2 p-3 bg-dark border border-secondary rounded  d-flex align-items-center`}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-light"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
            <button
              className={`
              } text-decoration-none d-none toggle-icon-smalldevice-sidebar toggle-icon ms-2 p-3 bg-dark border border-secondary rounded  d-flex align-items-center`}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-light"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
            <div
              className={`${
                messages.length === 0 ? "" : "d-none"
              } chat-gpt-logo dark-slate-gray p-1 rounded d-flex flex-column`}
            >
              <button
                type="button"
                className="btn chat-gpt-logo-button py-2 px-5 h-auto rounded dark-bluish-gray text-light"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Tooltip on bottom"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4 transition-colors text-brand-green me-2 text-success"
                  width="16"
                  height="16"
                  strokeWidth="2"
                >
                  <path
                    d="M9.586 1.526A.6.6 0 0 0 8.553 1l-6.8 7.6a.6.6 0 0 0 .447 1h5.258l-1.044 4.874A.6.6 0 0 0 7.447 15l6.8-7.6a.6.6 0 0 0-.447-1H8.542l1.044-4.874Z"
                    fill="currentColor"
                  ></path>
                </svg>
                GPT-3.5
              </button>
            </div>
            <div
              className={`invisible chat-gpt-logo-right dark-slate-gray p-1 rounded d-flex flex-column`}
            >
              <button
                type="button"
                className="btn chat-gpt-logo-button py-2 px-5 h-auto rounded dark-bluish-gray text-light"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Tooltip on bottom"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4 transition-colors text-brand-green me-2 text-success"
                  width="16"
                  height="16"
                  strokeWidth="2"
                >
                  <path
                    d="M9.586 1.526A.6.6 0 0 0 8.553 1l-6.8 7.6a.6.6 0 0 0 .447 1h5.258l-1.044 4.874A.6.6 0 0 0 7.447 15l6.8-7.6a.6.6 0 0 0-.447-1H8.542l1.044-4.874Z"
                    fill="currentColor"
                  ></path>
                </svg>
                GPT-3.5
              </button>
            </div>
          </div>
          <div className="chat-gpt-main-result-container h-75 overflow-auto">
            {messages.map((message, index) => (
              <ChatGPTResultBody
                messageResult={message}
                key={index}
                apiLimit={apiLimit}
                error = {apierror}
              />
            ))}
            <div ref={msgEnd} />
          </div>
          <div className="chatgpt-mainbody-search-box-and-search-suggestion w-75">
            <div
              className={`${
                messages.length === 0 ? "" : "d-none"
              } chatgpt-search-suggestion-box d-flex flex-wrap justify-content-center`}
            >
              <a
                href="/#"
                className="div1 border border-secondary rounded p-3 text-decoration-none text-light m-1"
                onClick={(e) => handleDiv1Click(e.target.textContent)}
                data-aos="fade-up-right"
              >
                {generateRandomNames[0]}
              </a>
              <a
                href="/#"
                className="div1 border border-secondary rounded fs-6 p-3 text-decoration-none text-light m-1"
                onClick={(e) => handleDiv1Click(e.target.textContent)}
                data-aos="fade-up-left"
              >
                {generateRandomNames[1]}
              </a>
              <a
                href="/#"
                className="div1 border border-secondary rounded p-3 text-decoration-none text-light m-1"
                onClick={(e) => handleDiv1Click(e.target.textContent)}
                data-aos="fade-down-right"
              >
                {generateRandomNames[2]}
              </a>
              <a
                href="/#"
                className="div1 border border-secondary rounded p-3 text-decoration-none text-light m-1"
                onClick={(e) => handleDiv1Click(e.target.textContent)}
                data-aos="fade-down-left"
              >
                {generateRandomNames[3]}
              </a>
            </div>
            <div className="chatgpt-search-searchbox-textfieldt-3 d-flex flex-column">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="d-flex search rounded dark-bluish-gray mt-2"
                role="search"
              >
                <input
                  className="form-control text-light fs-6 border-0 chatgpt-search-searchbox-searchinput dark-bluish-gray shadow-none"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button
                  className="btn py-3 px-3 border-0"
                  type="submit"
                  onClick={() => sendUserQuestion()}
                  disabled={userInput.length === 0 || !messages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="m-1 md:m-0 text-light"
                    strokeWidth="2"
                    style={{ width: "22px" }}
                  >
                    <path
                      d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </form>
              <small className="my-2 text-center text-secondary">
                Free Research Preview. ChatGPT may produce inaccurate
                information about people, places, or facts. ChatGPT August 3
                Version
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile devices */}

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header dark-slate-gray">
          <a
            href="/"
            className="text-decoration-none bg-dark border border-secondary rounded  pe-5 py-3 d-flex align-items-center w-75"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 mx-2 text-light"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>{" "}
            <span className="ms-1 text-light">New Chat</span>
          </a>
          <button
            type="button"
            className="btn-close text-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body dark-slate-gray">
          <div className="chatGpt-search-hotory-container">
            <div className="chatgpt-sidebar-search-history px-3">
              <p className="chatgpt-sidebar-day-name text-light my-3 pb-3 text-sm border-bottom">
                SearchHistory
              </p>
              <div className="chat-gpt-inner-search-history border-bottom py-2">
                {searchHistory.length === 0 ? (
                  <p className="text-light">No searchResult found</p>
                ) : (
                  searchHistory.map((items, i) => {
                    return (
                      <div
                        className="chatgpt-search-history-list d-flex justify-content-between px-3 align-items-center w-100"
                        key={i}
                      >
                        <a
                          href="/"
                          className="history-container text-decoration-none my-2"
                        >
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-light"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <span className="chatgpt-sidebar-search-history-search-params text-light px-3 ms-3">
                            {items.length > maxCount
                              ? items[0].toUpperCase() +
                                items.slice(1).substring(0, maxCount) +
                                "..."
                              : items[0].toUpperCase() + items.slice(1)}
                          </span>
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="19"
                          height="19"
                          viewBox="0,0,256,256"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteClick(i)}
                        >
                          <g
                            fill="#f2f2f2"
                            fillRule="nonzero"
                            stroke="none"
                            strokeWidth="1"
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit="10"
                            strokeDasharray=""
                            strokeDashoffset="0"
                            fontFamily="none"
                            fontWeight="none"
                            fontSize="none"
                            textAnchor="none"
                          >
                            <g transform="scale(5.12,5.12)">
                              <path d="M21,0c-1.64545,0 -3,1.35455 -3,3v2h-7.84375c-0.10544,-0.017 -0.21292,-0.017 -0.31836,0h-1.83789c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h1.08594l3.61914,40.5l0.00195,0.00977c0.15023,1.35247 1.27484,2.49023 2.69336,2.49023h19.19922c1.41852,0 2.54308,-1.13773 2.69336,-2.49023l0.00195,-0.00977l3.61914,-40.5h1.08594c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.82617c-0.1099,-0.0185 -0.22213,-0.0185 -0.33203,0h-7.8418v-2c0,-1.64545 -1.35455,-3 -3,-3zM21,2h8c0.55455,0 1,0.44545 1,1v2h-10v-2c0,-0.55455 0.44545,-1 1,-1zM11.09375,7h7.73828c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h7.74805l-3.59961,40.28906c-0.04972,0.4475 -0.32555,0.71094 -0.70703,0.71094h-19.19922c-0.38148,0 -0.65731,-0.26344 -0.70703,-0.71094zM18.98438,9.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v33c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-33c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM24.98438,9.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v33c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-33c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM30.98438,9.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v33c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-33c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="update-api-key px-3 py-3">
                <button
                  type="button"
                  className="btn btn-primary border-secondary dark-slate-gray update-api-key-button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Update API key
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
