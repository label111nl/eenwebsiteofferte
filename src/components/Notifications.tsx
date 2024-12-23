import React from 'react';
import { Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { wordpressApi } from '../api/wordpress';
import { formatDistanceToNow } from 'date-fns';

export function Notifications() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: forms } = useQuery({
    queryKey: ['wordpress-forms'],
    queryFn: wordpressApi.getForms,
  });

  const { data: submissions } = useQuery({
    queryKey: ['form-submissions', forms?.[0]?.id],
    queryFn: () => forms?.[0]?.id ? wordpressApi.getFormSubmissions(forms[0].id) : null,
    enabled: !!forms?.[0]?.id,
  });

  const unreadSubmissions = submissions?.filter(s => s.data.status === 'new') ?? [];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <Bell className="h-6 w-6" />
        {unreadSubmissions.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadSubmissions.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 text-sm text-gray-700">
            {unreadSubmissions.length === 0 ? (
              <p>No new notifications</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {unreadSubmissions.map((submission) => (
                  <li key={submission.id} className="py-2">
                    <p className="font-medium">{submission.data.client_name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(submission.created_at))} ago
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}