import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ControlledPopup = () => {
  const [single, setSingle] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/pages`)
      .then((response) => response.data)
      .then((data) => {
        setSingle(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
  };

  if (isLoaded) {
    // popup modal
    return (
      <>
        {single[0].acf.page_visible === "yes" && (
          <Popup open={open} onClose={closeModal}>
            <div className="modal">
              <a className="close" onClick={closeModal}>
                &times;
              </a>

              <div className="info-modal">
                <div className="info-modal__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 99.21 136.06"
                  >
                    <path d="M4.414 135.336c-.176-.908-.395-1.809-.522-2.723-.642-4.645-1.377-9.279-1.849-13.939a87.485 87.485 0 0 1-.409-10.096c.048-3.143.351-6.287 1.583-9.266.799-1.93 2.265-3.107 4.058-3.957 3.931-1.865 8.088-2.031 12.336-1.654 4.642.412 9.288.859 13.942 1.043 3.584.141 7.077-.6 10.33-2.215.764-.379 1.494-.826 2.375-1.115-.194.213-.365.455-.586.635-2.963 2.4-6.323 3.916-10.06 4.709-3.323.705-6.656.377-9.992.414-2.633.031-5.264.26-7.895.406-.16.008-.321.045-.476.09-1.496.434-1.733 1.229-.699 2.367 1.806 1.992 4.163 2.76 6.744 3.08 6.743.84 13.514.723 20.279.572 6.038-.135 12.072-.424 18.107-.67 2.182-.09 4.36-.252 6.539-.375.281-.018.563-.002.844-.002.025.078.049.158.073.238-.64.389-1.286.768-1.919 1.168-.771.492-1.529 1.004-2.295 1.504-1.248.818-1.961 2.031-2.545 3.359-.346.785-1.036 1.119-1.84.877-.938-.283-1.709-.025-2.398.568-1.1.951-2.145 1.965-3.265 2.889-1.091.898-2.567 1.018-3.499.133-2.014-1.916-4.216-1.629-6.561-.881-1.329.424-2.691.801-4.068 1.006-1.155.174-2.367-.07-3.315-.779-2.162-1.617-4.454-1.262-6.792-.643-2.363.627-4.712 1.309-7.084 1.898-1.477.365-2.975.17-4.388-.313-2.215-.754-4.197-.283-6.054.955-1.853 1.234-3.664 2.609-4.494 4.738-.846 2.172-1.51 4.432-2.043 6.703-.644 2.75-1.061 5.553-1.591 8.33-.063.326-.212.639-.321.959a6.973 6.973 0 0 1-.25-.013m18.429-43.473c-.203-1.098-.444-2.189-.602-3.293-.452-3.148-1.007-6.289-1.262-9.455-.27-3.348-.686-6.71-.192-10.086.209-1.434.176-2.911.483-4.319.45-2.063 1.216-3.88 3.312-5.045 1.751-.974 3.559-1.634 5.456-1.714 2.842-.12 5.706.061 8.55.261 4.137.292 8.263.965 12.407.142 1.884-.374 3.675-1.02 5.333-2.006a.691.691 0 0 1 .453-.077c-.746.98-1.789 1.57-2.832 2.13-3.021 1.629-6.258 2.422-9.7 2.386-2.831-.03-5.663-.058-8.493-.013-.821.012-1.656.207-2.452.433-1.098.312-1.292 1.022-.488 1.846 1.109 1.136 2.412 2.065 4.023 2.239 3.263.354 6.535.747 9.812.838 8.066.223 16.121-.218 24.17-.708 1.588-.096 3.176-.183 4.766-.261.759-.037.904.142.584.837-1.262 2.746-3.953 5.55-7.694 5.265-1.917-.146-3.437.432-4.653 1.996-1.031 1.327-1.412 1.342-2.996.636-1.285-.57-2.612-.935-4.004-.658-1.076.215-2.125.584-3.172.927-1.99.65-3.937 1.482-5.967 1.963-2.303.541-4.681.605-6.837-.648-.648-.377-1.22-.979-1.667-1.594-1.276-1.756-2.611-2.29-4.749-1.871-2.254.442-4.245 1.456-5.942 2.928-.748.646-1.217 1.693-1.631 2.637-1.337 3.047-2.173 6.254-2.794 9.516-.246 1.297-.433 2.605-.671 3.902-.056.305-.208.59-.315.883-.079-.007-.157-.011-.236-.017" />
                    <path d="M79.164 125.719c-.33 0-.663-.025-.991.004-2.606.238-5.175.16-7.62-.916-5.496-2.418-8.057-7.242-7.132-13.02.585-3.652 2.726-6.305 6.254-7.615 2.529-.938 5.075-.701 7.44.566 3.878 2.08 6.324 5.309 7.455 9.574.529 2 .517 4 .285 6.018-.062.529-.25 1.045-.427 1.754.39-.154.573-.189.712-.287 2.588-1.807 4.147-4.285 4.957-7.32.653-2.457.719-4.953.271-7.381-1.077-5.814-3.82-10.6-9.226-13.51a1.414 1.414 0 0 0-.222-.098c-.56-.174-1.12-.346-1.681-.518-.127.525-.256 1.051-.379 1.576-.482 2.08-1.688 3.695-3.446 4.805-3.142 1.984-6.593 3.002-10.343 2.861-3.647-.135-5.394-3.145-3.729-6.408 1.401-2.748 3.726-4.313 6.595-5.18 2.68-.811 5.373-.66 8.069-.078.249.055.515.033.772.047l.199-.197c-.442-.705-.828-1.455-1.336-2.109-2.466-3.176-5.824-4.115-9.646-3.615-1.638.215-3.236.729-4.765 1.084.717-1.16 4.065-2.146 7.33-2.121 2.811.023 5.24 1 7.465 2.996 0-.406.057-.619-.008-.785-.899-2.311-1.037-4.738-.99-7.166.074-3.861.785-7.613 2.533-11.094.539-1.072 1.246-2.078 1.986-3.027.409-.522.531-.987.28-1.549-1.892-4.24-4.492-7.902-8.798-9.959-1.305-.623-2.85-.746-4.284-1.094-.216-.052-.437-.082-.654-.122l.011-.296c.922 0 1.849-.07 2.762.012 4.169.375 7.256 2.556 9.529 5.945.955 1.424 1.736 2.968 2.562 4.478.28.512.528.846 1.175.52 4.053-2.051 7.831-1.232 11.436 1.15 1.974 1.306 3.424 3.049 4.069 5.355 1.123 4.021-1.03 8.264-5.144 9.049-2.245.428-4.107-.561-5.754-1.986-2.105-1.821-3.428-4.192-4.543-6.688-.534-1.194-.977-2.429-1.545-3.858-3.11 3.652-4.299 7.79-4.631 12.23-.336 4.469.389 8.699 3.146 12.365-.242.17-.63.354-.609.443.061.256.234.568.456.688.589.314 1.222.547 1.841.801 3.045 1.256 5.813 2.932 8.072 5.365 3.317 3.572 5.049 7.816 4.664 12.672-.508 6.404-3.74 11.096-9.594 13.906a4.079 4.079 0 0 0-1.282.953c-2.075 2.363-4.787 3.309-7.808 3.539-3.215.246-6.323-.371-9.407-1.225-4.202-1.166-8.099-3.061-12.015-4.912-3.56-1.68-7.21-3.092-11.022-4.113-4.445-1.191-8.936-1.727-13.523-1.289-4.187.398-8.028 1.75-11.417 4.287a.827.827 0 0 1-.645.191c.365-.385.706-.797 1.099-1.15.419-.377.879-.707 1.336-1.039 2.66-1.93 5.629-3.096 8.848-3.736 3.62-.721 7.267-.725 10.869-.217 2.997.422 5.951 1.227 8.884 2.012 4.473 1.195 8.493 3.498 12.685 5.383 3.639 1.637 7.346 3.145 11.287 3.822 1.857.32 3.809.146 5.715.096.545-.014 1.079-.379 1.619-.584a5.488 5.488 0 0 0-.052-.285m-3.051-1.092c1.556-.277 3.127-.488 4.66-.861.635-.154 1.42-.514 1.723-1.025.549-.926.896-2.012 1.134-3.074.679-3.041.054-5.906-1.545-8.525-1.791-2.936-4.472-4.377-7.783-4.033-2.807.291-5.208 1.529-7.247 3.426-1.554 1.447-2.496 3.232-2.39 5.439.101 2.105 1.055 3.826 2.555 5.232 2.483 2.323 5.493 3.296 8.893 3.421m10.453-61.765a7.902 7.902 0 0 0-3.724.92c-.802.42-.866.935-.556 1.649.589 1.354 1.119 2.74 1.787 4.056 1.016 2.004 2.253 3.856 4.13 5.191 1.571 1.118 3.681 1.099 4.937-.062 2.491-2.303 2.7-6.352.448-8.896-1.865-2.111-4.304-2.837-7.022-2.858M72.475 91.326l-.021.105c-.431 0-.863-.012-1.293.004-2.296.078-4.427.611-6.136 2.266-1.188 1.146-1.613 2.59-1.164 4.139.476 1.643 1.863 2.305 3.451 2.49 3.178.369 5.863-.879 8.244-2.809 1.338-1.084 2.096-2.568 2.053-4.381-.016-.611-.237-.969-.848-1.072-1.429-.244-2.857-.494-4.286-.742M38.626 54.718c-.229-1.036-.555-2.062-.668-3.111-.404-3.748-.865-7.498-1.042-11.26-.105-2.211.196-4.458.482-6.667.275-2.117 1.564-3.513 3.55-4.337 2.906-1.206 5.907-1.001 8.92-.737 2.042.178 4.076.449 6.12.58 2.836.181 5.586-.219 8.161-1.512.173-.087.383-.102.576-.15l.132.261c-.854.506-1.678 1.074-2.568 1.507-2.709 1.318-5.602 1.623-8.578 1.478a54.942 54.942 0 0 0-4.61-.017c-.772.027-1.549.199-2.3.392-.763.197-.916.837-.365 1.408.86.894 1.885 1.577 3.112 1.782 3.167.53 6.35.804 9.58.657 3.635-.165 7.281-.102 10.92-.226 3.125-.106 6.248-.325 9.371-.513 1.344-.08 1.451.058.904 1.308-.502 1.149-1.314 1.821-2.609 2.003-.484.068-.914.562-1.355.879-.104.074-.163.212-.234.325-1.453 2.291-1.838 2.426-4.213 1.191-1.382-.718-2.678-.634-3.998.105-.539.301-1.115.532-1.668.811-1.007.508-2.055.38-2.967-.087-2.01-1.03-3.854-.492-5.736.314-1.479.634-2.963 1.275-4.494 1.766-.969.312-1.936-.003-2.664-.76-1.41-1.467-3.649-1.756-5.353-.658-.746.481-1.492.96-2.246 1.428-1.518.944-1.796 2.558-2.16 4.093-.577 2.433-1.072 4.885-1.608 7.327-.032.145-.126.277-.191.416l-.201.004M70.07 23.146c.07-.209.104-.44.217-.624 2.445-4.016 1.123-9.002-2.016-11.917-1.744-1.62-3.838-2.445-6.148-2.798-.668-.101-.818.135-.602.781.313.94.639 1.882.867 2.844.59 2.494-.247 4.512-2.365 5.856-1.466.929-3.111 1.572-4.666 2.363-.908.462-1.834.906-2.684 1.463-1.369.897-1.832 2.568-1.193 4.066.365.858.776 1.698 1.221 2.662-.271.013-.496.094-.649.02-1.282-.616-2.624-1.149-3.807-1.922-1.86-1.216-2.062-2.845-.534-4.493 1.183-1.277 2.577-2.358 3.865-3.54.181-.166.289-.409.433-.617-.219-.124-.423-.291-.657-.364-1.422-.445-2.384-1.356-2.736-2.807-.32-1.319.216-2.454 1.047-3.419.684-.794 1.942-.784 3.057-.106.843.512 1.14.428 1.296-.563.208-1.319.391-2.658.396-3.989.005-1.135-.568-2.05-1.684-2.538-.15-.065-.324-.296-.32-.447.01-.552.09-1.104.162-1.852.345.215.664.357.914.579 2.19 1.946 2.395 4.389 1.692 7.03-.165.619-.455 1.203-.661 1.812-.16.472-.227.897.262 1.303.402.336.707.81.988 1.265.309.501.613.383.883.036 1.723-2.218 2.437-4.572.824-7.319-.148-.252-.288-.51-.472-.835.217-.078.383-.199.537-.185 4.306.39 8.57 1.046 12.537 2.849a14.286 14.286 0 0 1 3.854 2.59c1.971 1.869 2.254 5.156 1.021 7.577-1.113 2.189-2.769 3.857-4.642 5.352l-.237-.113" />
                  </svg>
                </div>
                <div
                  className="info-modal__text"
                  dangerouslySetInnerHTML={{
                    __html: single[0].content.rendered,
                  }}
                ></div>
              </div>
            </div>
          </Popup>
        )}
      </>
    );
  }

  return null;
};

export default ControlledPopup;

