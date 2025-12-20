import { useEffect, useState } from 'react';
import * as PiSDK from '@xhilo/pi-sdk';

// Handle both default and named exports
const PiNetwork = (PiSDK as any).PiNetwork || (PiSDK as any).default?.PiNetwork || (PiSDK as any).default;

export const usePiNetwork = () => {
  const [pi, setPi] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Initialize Pi Network SDK
    const piInstance = new PiNetwork({
      version: "2.0",
      sandbox: true, // Set to false for production
    });

    setPi(piInstance);

    // Check if user is already authenticated
    piInstance.initialize().then(() => {
      if (piInstance.isAuthenticated()) {
        setIsAuthenticated(true);
        setUser(piInstance.getUser());
      }
    }).catch(console.error);

    return () => {
      // Cleanup if needed
    };
  }, []);

  const authenticate = async () => {
    if (!pi) return;

    try {
      await pi.authenticate(['username', 'payments'], (error: any, auth: any) => {
        if (error) {
          console.error('Pi Network authentication error:', error);
          return;
        }

        setIsAuthenticated(true);
        setUser(auth.user);
      });
    } catch (error) {
      console.error('Pi Network authentication failed:', error);
    }
  };

  const createPayment = async (amount: number, memo: string) => {
    if (!pi || !isAuthenticated) return null;

    try {
      const payment = await pi.createPayment({
        amount: amount,
        memo: memo,
        metadata: {
          gameId: 'checkers4pi',
          type: 'premium_feature'
        }
      });

      return payment;
    } catch (error) {
      console.error('Pi Network payment creation failed:', error);
      return null;
    }
  };

  const completePayment = async (paymentId: string) => {
    if (!pi || !isAuthenticated) return false;

    try {
      const result = await pi.completePayment(paymentId);
      return result;
    } catch (error) {
      console.error('Pi Network payment completion failed:', error);
      return false;
    }
  };

  return {
    pi,
    isAuthenticated,
    user,
    authenticate,
    createPayment,
    completePayment,
  };
};
