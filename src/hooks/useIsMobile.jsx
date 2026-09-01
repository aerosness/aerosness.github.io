import { useViewport } from './useViewport';

export function useIsMobile(breakpoint = 768) {
  return useViewport().width <= breakpoint;
}
