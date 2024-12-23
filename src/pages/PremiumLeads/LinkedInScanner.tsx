import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import type { LinkedInProfile } from '../../types';

export function LinkedInScanner() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mutation = useMutation({
    mutationFn: async (query: string) => {
      // API call to scan LinkedIn
      return [] as LinkedInProfile[];
    },
  });

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          LinkedIn Scanner
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Find potential clients by scanning LinkedIn profiles in your target industry.</p>
        </div>
        <form className="mt-5 sm:flex sm:items-center" onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(searchTerm);
        }}>
          <div className="w-full sm:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter industry or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            disabled={mutation.isPending}
          >
            <Search className="h-4 w-4 mr-2" />
            {mutation.isPending ? 'Scanning...' : 'Scan LinkedIn'}
          </button>
        </form>

        {mutation.data && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Results</h4>
            <ul className="mt-3 divide-y divide-gray-200">
              {mutation.data.map((profile) => (
                <li key={profile.id} className="py-4">
                  <div className="flex space-x-3">
                    <div className="flex-1 space-y-1">
                      <h3 className="text-sm font-medium">{profile.company_name}</h3>
                      <p className="text-sm text-gray-500">{profile.industry}</p>
                      {profile.has_website && (
                        <a
                          href={profile.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}