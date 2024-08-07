self.onmessage = (event: MessageEvent) => {
  const { delay, data } = event.data;

  setTimeout(() => {
    self.postMessage(data);
  }, delay);
};