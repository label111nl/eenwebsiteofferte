import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { wordpressApi } from '../api/wordpress';
import { formatDistanceToNow } from 'date-fns';
import { Bell, CheckCircle, XCircle } from 'lucide-react';

export function RecentActivity() {
  const { data: forms } = useQuery({
    queryKey: ['wordpress-forms'],
    queryFn: wordpressApi.getForms,
  });

  const { data: submissions } = useQuery({
    queryKey: ['form-submissions', forms?.[0]?.id],
    queryFn: () => forms?.[0]?.id ? wordpressApi.getFormSubmissions(forms[0].id) : null,
    enabled: !!forms?.[0]?.id,
  });

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {submissions?.slice(0, 5).map((submission, idx) => (
          <li key={submission.id}>
            <div className="relative pb-8">
              {idx !== submissions.length - 1 && (
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <Bell className="h-5 w-5 text-indigo-600" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        New form submission
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Submitted {formatDistanceToNow(new Date(submission.created_at))} ago
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>
                      {submission.data.message || 'New lead received'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}