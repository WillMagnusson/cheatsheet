import { useEffect, useRef, useState } from 'react';

/**
 * A hook for using the BroadcastChannel API.
 * Use this hook to create a BroadcastChannel instance and listen to messages.
 */
export const useBroadcastChannel = (
  channelName: string,
  initialData?: Record<string, any>,
) => {
  const storage = window.localStorage;
  const channel = useRef(new BroadcastChannel(channelName)).current;
  const [localChannelState, setLocalChannelState] = useState(initialData);

  useEffect(() => {
    const initialStorageData =
      initialData === undefined
        ? ''
        : typeof initialData === 'object'
        ? JSON.stringify(initialData)
        : initialData;
    storage.setItem(channelName, initialStorageData);
  }, []);

  const getChannelValue = (key: string) => {
    return JSON.parse(storage.getItem(key) ?? '') ?? initialData;
  };

  const setChannelValue = (key: string, value: any) => {
    storage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
    setLocalChannelState(value);
    channel.postMessage({ key, value });
  };

  const getStoredChannelValue: () => { hasChanged: boolean } = () =>
    getChannelValue(channelName);

  const setAndPostChannelValue = (value: any) =>
    setChannelValue(channelName, value);

  return {
    channel,
    localChannelState,
    setLocalChannelState,
    getStoredChannelValue,
    setAndPostChannelValue,
  };
};
export default useBroadcastChannel;
