import { useNavigate } from 'react-router';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div style={styles.div}>
            <button
                style={styles.button}
                onClick={() => navigate('/register')}
            >
                User
            </button>
            <button
                style={styles.button}
                onClick={() => navigate('/admin')}
            >
                Admin
            </button>
            <button
                style={styles.button}
                onClick={() => navigate('/payment')}
            >
                Pay Now
            </button>
        </div>
    );
}

const styles = {
    button: {
        backgroundColor: '#007bff',
        margin: '10px',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'background 0.3s',
        width: '200px',
    },
    div: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
    },
};
