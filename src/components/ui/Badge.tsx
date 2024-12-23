import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  status: string;
}

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
        {
          'bg-green-100 text-green-800': status === 'completed' || status === 'active',
          'bg-yellow-100 text-yellow-800': status === 'pending' || status === 'new',
          'bg-red-100 text-red-800': status === 'failed' || status === 'cancelled',
          'bg-blue-100 text-blue-800': status === 'assigned',
        }
      )}
    >
      {status}
    </span>
  );
}