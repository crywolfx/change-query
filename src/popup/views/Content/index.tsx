import { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import QrCode from '../../components/QrCode';
import Query from '../../components/Query';
import styles from './index.module.less';
import classNames from 'classnames';
import { QueryFormRef, QueryType } from 'src/popup/components/Query/QueryForm';
import { useMemoizedFn } from 'ahooks';

export type ContentProps = {
  className?: string;
  style?: CSSProperties;
  tabUrl?: string;
  onChangeUrl?: (url?: string) => void;
};

const Content: FC<ContentProps> = (props) => {
  const [url, setUrl] = useState<string>();

  const urlRef = useRef(url);
  const queryFormRef = useRef<QueryFormRef>(null);

  useEffect(() => {
    urlRef.current = url;
  }, [url])

  const setQueryForm = useCallback((queryList: QueryType[]) => {
    queryFormRef.current?.formInstance.setFieldsValue({ query: queryList });
  }, []);

  const setQueryListByUrl = useCallback((url: string) => {
    try {
      const _url = new URL(url || '');
      const searchList = Array.from(_url?.searchParams?.entries());
      const _queryList = searchList.map(([key, value]) => {
        return { key, value };
      });
      setQueryForm(_queryList);
    } catch (error) {
      setQueryForm([]);
    }
  }, [setQueryForm]);

  const setUrlByQueryList = useCallback((queryList: QueryType[]) => {
    try {
      const searchParams = new URLSearchParams();

      queryList.forEach((query) => {
        searchParams.append(query.key, query.value || '');
      });

      console.log(urlRef.current);
      const currentUrl = new URL(urlRef.current || '');
      currentUrl.search = searchParams.toString();

      setUrl(currentUrl.href);
    } catch (error) {}
  }, []);

  const onChangeQuery = useCallback((newQueryData: QueryType[]) => {
    setUrlByQueryList(newQueryData);
  }, [setUrlByQueryList]);

  useEffect(() => {
      setUrl(props.tabUrl || '');
      setQueryListByUrl(props.tabUrl || '');
  }, [props.tabUrl, setQueryListByUrl]);


  const onChangeUrlMemo = useMemoizedFn(props.onChangeUrl || (() => {}));

  useEffect(() => {
    onChangeUrlMemo(url);
  }, [onChangeUrlMemo, url]);

  return (
    <div className={classNames(styles.content, props.className)}>
      <QrCode
        className={styles.qrCode}
        value={url}
        onChange={(val) => {
          urlRef.current = val;
          setUrl(val);
          setQueryListByUrl(val);
        }}
      />
      <Query ref={queryFormRef} onChangeQuery={onChangeQuery} />
    </div>
  );
};

export default Content;
