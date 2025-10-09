import { useEffect } from 'react';

interface UseImageProtectionOptions {
  disableRightClick?: boolean;
  disableDrag?: boolean;
  disableSelect?: boolean;
  disablePrintScreen?: boolean;
  disableDevTools?: boolean;
  showWarningOnRightClick?: boolean;
}

export const useImageProtection = (options: UseImageProtectionOptions = {}) => {
  const {
    disableRightClick = true,
    disableDrag = true,
    disableSelect = true,
    disablePrintScreen = true,
    disableDevTools = true,
    showWarningOnRightClick = true,
  } = options;

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (disableRightClick) {
        e.preventDefault();
        if (showWarningOnRightClick) {
          // You could show a toast notification here
          console.warn('Right-click is disabled to protect content');
        }
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (disableDrag) {
        e.preventDefault();
        return false;
      }
    };

    const handleSelectStart = (e: Event) => {
      if (disableSelect) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable common screenshot/save shortcuts
      if (disablePrintScreen) {
        if (e.key === 'PrintScreen') {
          e.preventDefault();
          return false;
        }
      }

      // Disable developer tools shortcuts
      if (disableDevTools) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'u')
        ) {
          e.preventDefault();
          return false;
        }
      }

      // Disable save shortcuts
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG' || target.tagName === 'CANVAS') {
          e.preventDefault();
          return false;
        }
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('drop', handleDrop);

    // Disable drag on images
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.draggable = false;
      img.addEventListener('dragstart', handleDragStart);
    });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('drop', handleDrop);

      images.forEach((img) => {
        img.removeEventListener('dragstart', handleDragStart);
      });
    };
  }, [disableRightClick, disableDrag, disableSelect, disablePrintScreen, disableDevTools, showWarningOnRightClick]);

  // Console warning to deter developers
  useEffect(() => {
    if (disableDevTools) {
      console.clear();
      console.warn('🚫 STOP! This is a browser feature intended for developers. Content on this site is protected by copyright. Unauthorized downloading or copying is prohibited.');
      
      // Detect if DevTools is open
      const devtools = { open: false, orientation: null };
      const threshold = 160;

      setInterval(() => {
        if (
          window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold
        ) {
          if (!devtools.open) {
            devtools.open = true;
            console.clear();
            console.warn('🚫 Developer tools detected! Please respect our content protection.');
          }
        } else {
          devtools.open = false;
        }
      }, 500);
    }
  }, [disableDevTools]);

  return {
    protectedProps: {
      onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
      onDragStart: (e: React.DragEvent) => e.preventDefault(),
      draggable: false,
      className: 'protected-content no-drag no-context-menu',
      style: {
        userSelect: 'none' as const,
        WebkitUserSelect: 'none' as const,
        MozUserSelect: 'none' as const,
        msUserSelect: 'none' as const,
      },
    },
  };
};