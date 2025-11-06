// src/setupTests.ts

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// e.g. expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// --- Existing TextEncoder/TextDecoder polyfill ---
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
}

// --- AntD / jsdom polyfills ---

// 1) matchMedia (required for AntD responsive hooks)
if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),            // deprecated API but some libs still call it
      removeListener: jest.fn(),         // deprecated API but some libs still call it
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
}

// 2) ResizeObserver (used by some AntD components)
if (typeof (window as any).ResizeObserver === 'undefined') {
  (window as any).ResizeObserver = class {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
}

// 3) IntersectionObserver (common in UI libs; safe no-op)
if (typeof (window as any).IntersectionObserver === 'undefined') {
  (window as any).IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
    root = null;
    rootMargin = '';
    thresholds = [];
  };
}

// 4) scrollTo (some components call it in effects)
if (typeof window.scrollTo !== 'function') {
  window.scrollTo = () => {};
}

// --- Optional: quiet AntD deprecation noise (does NOT hide real errors) ---
const realConsoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    const msg = String(args[0] ?? '');
    if (msg.includes('[antd:')) return; // swallow AntD deprecation warnings only
    realConsoleError(...(args as Parameters<typeof realConsoleError>));
  });
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});
