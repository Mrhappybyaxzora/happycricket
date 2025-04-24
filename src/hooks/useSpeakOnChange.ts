import { useEffect, useRef } from 'react';

/**
 * useSpeakOnChange - React hook to speak out a value whenever it changes.
 * @param value The value to speak when it changes.
 * @param enabled Optional. Set to false to disable TTS.
 * @param getText Optional. Function to customize spoken text.
 */
export function useSpeakOnChange<T>(value: T, enabled = true, getText?: (val: T) => string) {
  const prevValue = useRef<T | undefined>(undefined);

  useEffect(() => {
    if (!enabled) return;
    // Always compare as string for safety
    const prevString = prevValue.current == null ? '' : String(prevValue.current);
    const currString = value == null ? '' : String(value);
    const shouldSpeak =
      (prevValue.current === undefined && value !== undefined && value !== null) ||
      (prevValue.current !== undefined && prevString !== currString);

    if (shouldSpeak) {
      const text = getText ? getText(value) : String(value);
      if ('speechSynthesis' in window && text) {
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slower speech
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 100);
      }
    }
    prevValue.current = value; // Always store the raw value
  }, [value, enabled, getText]);
}
