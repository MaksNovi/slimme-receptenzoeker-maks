import 'react';
import "./MessageBox.css";

interface MessageBoxProps {
    message: string;
    onClose: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({message, onClose}) => {
    return (
        <div className="messagebox-overlay" role="alert" aria-live="assertive">
            <div className="messagebox-container">
                <p>{message}</p>

                <button onClick={onClose} aria-label="Close message" autoFocus>OK</button>
            </div>
        </div>
    );
};

export default MessageBox;