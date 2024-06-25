import eventBus from './eventBus';

const connectSSE = () => {
  let eventSource;

  const createEventSource = (lastEventId) => {
    const options = lastEventId ? { headers: { 'Last-Event-ID': lastEventId } } : {};
    eventSource = new EventSource('http://localhost:3000/events', options);

    eventSource.onmessage = (event) => {
      try {
        console.log("SSE CLIENT");
        console.log(event.data); // Log the raw event data
        const parsedData = JSON.parse(event.data);
        console.log(parsedData); // Log the parsed data
        eventBus.emit('new-message', parsedData);
      } catch (error) {
        console.error('Failed to parse message:', event.data, error);
      }
    }

    eventSource.onerror = () => {
      console.error('EventSource failed. Attempting to reconnect...');
      const lastEventId = eventSource.lastEventId;
      eventSource.close();
      setTimeout(() => createEventSource(lastEventId), 3000); // Attempt to reconnect after 3 seconds
    };
  };

  createEventSource();
};

export default connectSSE;
