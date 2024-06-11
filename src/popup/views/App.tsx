import { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import Content from './Content';
import styles from './index.module.less';
import { getCurrentTab, setCurrentTabUrl } from 'src/lib/query';
import { Button, Space } from 'antd';
export default function App() {
  const [currentPageUrl, setPageUrl] = useState<string>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    getCurrentTab().then((tab) => {
      const url = tab.url || '';
      setPageUrl(url);
    });
  }, []);

  const onChangeUrl = useCallback((url?: string) => {
    setUrl(url);
  }, []);

  return (
    <div className="box">
      <Header className={styles.header} />
      <Content
        className={styles.content}
        tabUrl={currentPageUrl}
        onChangeUrl={onChangeUrl}
      />
      <div className={styles.footer}>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              if (url) {
                setCurrentTabUrl(url);
              }
            }}
          >
            当前窗口跳转
          </Button>
          <Button
            type="default"
            onClick={() => {
              if (url) {
                window.open(url, '_blank');
              }
            }}
          >
            新窗口跳转
          </Button>
        </Space>
      </div>
    </div>
  );
}
