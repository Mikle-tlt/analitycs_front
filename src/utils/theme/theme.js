import { App, ConfigProvider, Flex } from 'antd';
import { useRef } from 'react';

const style = { minHeight: '100vh', width: '100%' };

export const ThemeProvider = ({ children }) => {
  const modalContainerRef = useRef(null);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6266f1',
          colorText: 'rgba(49, 80, 125, 0.5)',
          colorTextHeading: 'rgba(49, 80, 125, 0.9)',
          colorBgMask: 'transparent'
        },
        components: {
          Form: {
            itemMarginBottom: 0,
          },
          Typography: {
            titleMarginBottom: 0,
          },
          Layout: {
            bodyBg: '#f5f5f5',
            siderBg: theme.white,
          },
          Table: {
            headerBg: '#e0e1fc',
          },
          Statistic: {
            contentFontSize: '25px'
          },
        },

      }}
      getPopupContainer={() => modalContainerRef.current}
    >
      <App style={style}>
        <Flex align="center" justify="center" style={style} ref={modalContainerRef}>
          {children}
        </Flex>
      </App>
    </ConfigProvider>
  );
};

export const theme = {
  colorBg: '#f2f6ff',
  white: '#fff',
  colorTextBlack: 'rgba(0, 0, 0, 0.8)'
}