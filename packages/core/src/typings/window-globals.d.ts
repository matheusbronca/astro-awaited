export { };

declare global {
  interface Window {
    __hasAwaitedContentCleanup?: boolean;
  }
}
