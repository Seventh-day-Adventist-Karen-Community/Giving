'use client'; // Error components must be Client components

import { useEffect, useContext } from 'react';
import { MessageContext,MessagesContextType } from '../../components/toast/context';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const Messages = useContext(MessageContext) as MessagesContextType
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    Messages.setErrors([error.message])
    console.error('Error occured, Account Section')
  }, []);

  return (
      <></>
  );
}