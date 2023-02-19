
import React, { useState, useEffect } from 'react';
import { message as antMessage } from 'antd';

export const useMessage = () => {  
    const [messageApi, contextHolder] = antMessage.useMessage();

    const success = (message) => {
      messageApi.open({
        type: 'success',
        content: message,
      });
    };
  
    const error = (message) => {
      messageApi.open({
        type: 'error',
        content: message,
      });
    };
  
    const warning = (message) => {
      messageApi.open({
        type: 'warning',
        content: message,
      });
    };

    const message = {
        success,
        error,
        warning
    }

    return [message, contextHolder]
  
  }