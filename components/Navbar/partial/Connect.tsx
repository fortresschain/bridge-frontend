import { Button } from '@material-tailwind/react';

const Connect = ({
  status,
  open,
}: {
  status: 'disconnected' | 'connected' | 'reconnecting' | 'connecting';
  open: (options?: any | undefined) => Promise<void>;
}) => {
  return (
    <>
      {(status === 'disconnected' || status === 'connecting') && (
        <Button
          variant="filled"
          color="amber"
          className="w-max"
          size="sm"
          placeholder={'Menu'}
          onClick={() => {
            open();
          }}>
          Connect
        </Button>
      )}
    </>
  );
};

export default Connect;
