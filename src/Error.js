import './Error.css';

const Error = () => {
  return (
    <>
      <div clsaaName="error_back">
        <div className="error_background">
          <div className="error_message">
            <img className="image_style" />
            <div className="error_font">
              경고
              <br />
              가스 누출 감지됨!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
