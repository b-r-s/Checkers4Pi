import { useState, useMemo, useEffect } from 'react';
import { PiNetworkClient } from '@xhilo/pi-sdk';
import { createRealPaymentCallbacks } from './piNetworkCallbacks';

// Type definitions for Pi Network SDK alignment
interface PiUser {
  username: string;
  uid: string;
}

export const usePiNetwork = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<PiUser | null>(null);
  const [currentPayment, setCurrentPayment] = useState<string | null>(null);

  // Initialize Pi SDK instance
  const pi = useMemo(() => {
    try {
      // MANDATORY: Manually trigger the global Pi init for the Sandbox/Portal handshake
      if (typeof window !== 'undefined' && (window as any).Pi) {
        (window as any).Pi.init({ version: "2.0", sandbox: true });
        console.log("Pi SDK Global Init: Success (Sandbox Mode)");
      }

      // Return the client wrapper
      return new PiNetworkClient(true);
    } catch (error) {
      console.error("Pi SDK Init Error:", error);
      return null;
    }
  }, []);

  // Initialize and check authentication on mount
  useEffect(() => {
    if (!pi) return;

    pi.initialize().then((result) => {
      // Check if result exists and is successful
      if (result && result.success) {
        const currentUser = pi.getUser();
        if (currentUser) {
          setIsAuthenticated(true);
          setUser({
            uid: currentUser.uid,
            username: currentUser.username || ''
          });
        }
      }
    }).catch((err) => {
      console.warn('Pi Initialization silent catch:', err);
    });
  }, [pi]);

  const authenticate = async () => {
    if (!pi) return;

    try {
      const result = await pi.authenticate(['username', 'payments'], (payment) => {
        console.log('Incomplete payment found:', payment);
      });

      if (result && result.success && result.data) {
        setIsAuthenticated(true);
        setUser({
          uid: result.data.uid,
          username: result.data.username || ''
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const createPayment = async (
    amount: number,
    memo: string,
    metadata: Record<string, unknown> = {}
  ): Promise<{ success: boolean; paymentId?: string; error?: string }> => {
    if (!pi || !isAuthenticated) {
      return { success: false, error: 'Not authenticated' };
    }

    return new Promise((resolve) => {
      try {
        const callbacks = createRealPaymentCallbacks(setCurrentPayment, resolve);

        pi.createPayment(
          {
            amount,
            memo,
            metadata: {
              ...metadata,
              gameId: 'checkers4pi',
            },
          },
          callbacks
        );
      } catch {
        resolve({ success: false, error: 'Failed to create payment' });
      }
    });
  };

  return {
    pi,
    isAuthenticated,
    user,
    currentPayment,
    authenticate,
    createPayment,
  };
};