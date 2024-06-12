import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import styles from './index.module.less';
import { router } from '../router';

export default function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.sideBar}>
          <SideBar router={router} />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
