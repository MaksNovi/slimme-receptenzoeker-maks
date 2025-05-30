import 'react';
import "./MessageBox.css";

interface MessageBoxProps {
    message: string;
    onClose: () => void;
    positioned?: 'fixed' | 'absolute';
}

const MessageBox: React.FC<MessageBoxProps> = ({message, onClose, positioned = 'fixed'}) => {
    return (
        <div className={`messagebox-overlay ${positioned === 'absolute' ? 'messagebox-overlay--absolute' : ''}`}
             role="alert" aria-live="assertive">
            <div className="messagebox-container">
                <p>{message}</p>

                <button onClick={onClose} aria-label="Close message" autoFocus>OK</button>
            </div>
        </div>
    );
};

export default MessageBox;