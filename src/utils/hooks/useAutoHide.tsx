import { useEffect, useEffectEvent } from 'react';

type UseAutoHideOptions = {
  isVisible: boolean;
  onHide: () => void;
  delayMs?: number;
};

/**
 * Custom hook to automatically hide an element after a specified delay.
 *
 * @param {UseAutoHideOptions} options - The options for the auto-hide behavior.
 * @param {boolean} options.isVisible - A boolean indicating whether the element is currently visible.
 * @param {function} options.onHide - A callback function to be called when the element should be hidden.
 * @param {number} [options.delayMs=5000] - The delay in milliseconds before hiding the element (default is 5000ms).
 */
export function useAutoHide({ isVisible, onHide, delayMs = 5000 }: UseAutoHideOptions) {
  const handleHide = useEffectEvent(onHide);

  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(() => {
      handleHide();
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, delayMs]);
}
