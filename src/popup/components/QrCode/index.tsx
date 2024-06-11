import React, { useState } from 'react';
import type { FC, CSSProperties } from 'react';
import { Input, QRCode, Space } from 'antd';
import { isDef } from 'src/lib/type';

export type QrCodeProps = {
  className?: string;
  style?: CSSProperties;
  data?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
};
const QrCode: FC<QrCodeProps> = (props) => {
  const [text, setText] = useState(props.value || props.defaultValue);

  return (
    <div className={props.className} style={props.style}>
      <Space direction="vertical" align="center">
        <QRCode
          size={280}
          value={(isDef(props.value) ? props.value : text) || '-'}
        />
        <Input.TextArea
          style={{ width: '350px' }}
          placeholder="请输入链接地址"
          value={isDef(props.value) ? props.value : text}
          autoSize={{ minRows: 1, maxRows: 5 }}
          onChange={(e) => {
            setText(e.target.value);
            props.onChange?.(e.target.value);
          }}
        />
      </Space>
    </div>
  );
};

export default QrCode;
