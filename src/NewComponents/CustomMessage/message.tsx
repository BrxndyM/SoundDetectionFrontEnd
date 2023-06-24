import React, { useState, useRef } from 'react';
import './style.css';

type Message = {
  id: number;
  content: string;
  audioURL: string;
};

type TriggerWord = {
  id: number;
  name: string;
  audioURL: string;
};

const CustomMessage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [triggers, setTriggers] = useState<TriggerWord[]>([]);
  const [content, setContent] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [location, setLocation] = useState<string>('');

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleStartRecording = () => {
    // Check if media devices are supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          setRecording(true);

          const chunks: Blob[] = [];
          mediaRecorder.addEventListener('dataavailable', (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          });

          mediaRecorder.addEventListener('stop', () => {
            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            const audioURL = URL.createObjectURL(blob);
            setAudioURL(audioURL);
          });

          mediaRecorder.start();
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    } else {
      console.error('Media devices not supported.');
    }
  };

  const handleStopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleSaveMessage = () => {
    if (content.trim() === '') {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      content,
      audioURL: audioURL || '',
    };

    setMessages([...messages, newMessage]);
    setContent('');
    setAudioURL(null);
  };

  const handleSaveTrigger = () => {
    if (!audioURL) {
      return;
    }

    const newTrigger: TriggerWord = {
      id: Date.now(),
      name: `Trigger ${triggers.length + 1}`,
      audioURL,
    };

    setTriggers([...triggers, newTrigger]);
    setAudioURL(null);
  };

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleDeleteTrigger = (id: number) => {
    const updatedTriggers = triggers.filter((trigger) => trigger.id !== id);
    setTriggers(updatedTriggers);
  };

  const handleNext = () => {
    window.location.href = '/Listening'
    // Handle the next button click
    // You can navigate to the next page or perform any desired action
    console.log('Next button clicked');
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div className="custom-message-container">
      <h2>Create Custom Message and Trigger Words</h2>

      <div className="message-section">
        <h3>Custom Message</h3>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="message-textarea"
          placeholder="Enter your custom message..."
        />
        <div className="location-section">
          <label htmlFor="location-input">Location:</label>
          <input
            type="text"
            id="location-input"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter your location..."
          />
        </div>
        <button type="button" onClick={handleSaveMessage} className="save-button">
          Save Message
        </button>
      </div>

      <div className="trigger-section">
        <h3>Trigger Words</h3>
        <div className="recording-controls">
          {recording ? (
            <button type="button" onClick={handleStopRecording} className="stop-button">
              Stop Recording
            </button>
          ) : (
            <button type="button" onClick={handleStartRecording} className="record-button">
              Start Recording
            </button>
          )}
          {audioURL && (
            <audio src={audioURL} controls className="audio-player" />
          )}
        </div>
        <button type="button" onClick={handleSaveTrigger} className="save-button">
          Save Trigger
        </button>
      </div>

      <div className="saved-messages-container">
        <h3>Saved Messages:</h3>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message.id} className="saved-item">
                {message.content}
                {message.audioURL && (
                  <audio src={message.audioURL} controls className="audio-player" />
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteMessage(message.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="saved-triggers-container">
        <h3>Saved Triggers:</h3>
        {triggers.length === 0 ? (
          <p>No triggers found.</p>
        ) : (
          <ul>
            {triggers.map((trigger) => (
              <li key={trigger.id} className="saved-item">
                {trigger.name}
                {trigger.audioURL && (
                  <audio src={trigger.audioURL} controls className="audio-player" />
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteTrigger(trigger.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="next-button-container">
        <button type="button" onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomMessage;
