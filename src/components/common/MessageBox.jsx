import PropTypes from 'prop-types';
import "./MessageBox.css";

const MessageBox = ({message, type = 'info', onClose, positioned = 'fixed'}) => {
    return (
        <div
            className={`messagebox-overlay ${positioned === 'absolute' ? 'messagebox-overlay--absolute' : ''}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="messagebox-container">
                <span>
                    {type === 'error' && '❌'}
                    {type === 'success' && '✅'}
                    {type === 'warning' && '⚠️'}
                    {type === 'info' && 'ℹ️'}
                </span>

                <p>{message}</p>

                <button
                    onClick={onClose}
                    aria-label="Close message"
                    autoFocus
                    type="button"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

MessageBox.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
    onClose: PropTypes.func.isRequired,
    positioned: PropTypes.oneOf(['fixed', 'absolute'])
};

export default MessageBox;
