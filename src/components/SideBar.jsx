import React, {useState, useEffect} from "react";
import { useToggle } from "../utils/ToggleContext";
import { maxCount } from "../utils/constants";
import ChatGPTUI from "./ChatGPTUI";

const SideBar = ({searchHistory}) => {
  const { toggle, toggleButton } = useToggle();

  const [searchHistoryData, setSearchHistoryData] = useState([]);

  useEffect(() => {
    // Load search history data from localStorage
    const localStorageData = JSON.parse(localStorage.getItem("searchHistory"));
    if (localStorageData) {
      setSearchHistoryData(localStorageData);
    }

    // Add an event listener to listen for changes to localStorage
    const handleStorageChange = (e) => {
      if (e.key === "searchHistory") {
        const updatedData = JSON.parse(e.newValue);
        setSearchHistoryData(updatedData);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Function to handle item deletion
  const handleDeleteClick = (index) => {
    const updatedSearchHistory = [...searchHistoryData];
    updatedSearchHistory.splice(index, 1);
    setSearchHistoryData(updatedSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
  };

  useEffect(() => {
    // Update the search history data when the searchHistory prop changes
    setSearchHistoryData(searchHistory);
  }, [searchHistory]);

  return (
    <>
      <div
        className={`chatgpt-sidebar-container dark-slate-gray ${
          toggle ? "chatgpt-sidebar-container-collapsed" : ""
        }`}
      >
        <div className="chatgpt-toogle-newchat-container px-3 pt-4 d-flex">
          <a
            href="/"
            className="text-decoration-none bg-dark border border-secondary rounded  pe-5 py-1 d-flex align-items-center w-75"
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
            onClick={toggleButton}
            className="text-decoration-none toggle-icon ms-2 p-3 bg-dark border border-secondary rounded  d-flex align-items-center"
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
        </div>
        <div className="chatgpt-sidebar-search-history px-3">
          <p className="chatgpt-sidebar-day-name text-light my-3 text-sm pb-3 border-bottom">
            My searchHistory
          </p>
          <div className="chat-gpt-inner-search-history border-bottom">
            {searchHistoryData.length === 0 ? (
              <p className="text-light">No searchResult found</p>
            ) : (
             searchHistoryData.map((items, i) => {
                return (
                  <div
                    className="chatgpt-search-history-list px-3 d-flex w-100 justify-content-between align-items-center"
                    key={i}
                  >
                    <p
                      className="history-container text-decoration-none my-2 w-75"
                      style={{cursor:"pointer"}}
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
                      <span className="chatgpt-sidebar-search-history-search-params w-25 text-light ms-2">
                        {items.length > maxCount
                          ? items[0].toUpperCase()+  items.slice(1).substring(0, maxCount) + "..."
                          : items[0].toUpperCase() +  items.slice(1)}
                      </span>
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="19"
                      height="19"
                      viewBox="0,0,256,256"
                      style={{cursor:"pointer"}}
                      onClick={()=> handleDeleteClick(i)}
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
        </div>
        <div className="update-api-key px-3 py-3">
        <button type="button" className="btn btn-primary border-secondary dark-slate-gray update-api-key-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
           Update API key
        </button>
        </div>
      </div>

     <ChatGPTUI />
    </>
  );
};

export default SideBar;
