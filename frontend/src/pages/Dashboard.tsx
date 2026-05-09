import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <button style={styles.logoutBtn} onClick={handleLogout}>Sair</button>
        </div>

        <div style={styles.profile}>
          <div style={styles.avatar}>
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={styles.name}>{user?.name}</p>
            <p style={styles.email}>{user?.email}</p>
          </div>
        </div>

        <div style={styles.infoBox}>
          <p style={styles.infoLabel}>ID do usuário</p>
          <p style={styles.infoValue}>{user?.id}</p>
        </div>
        <div style={styles.infoBox}>
          <p style={styles.infoLabel}>Membro desde</p>
          <p style={styles.infoValue}>
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}
          </p>
        </div>
      </div>
    </div>
  );
}