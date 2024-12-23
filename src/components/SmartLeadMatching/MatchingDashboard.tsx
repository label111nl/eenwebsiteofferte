import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '../ui/Badge';
import { Star, Briefcase, Clock } from 'lucide-react';

interface MatchScore {
  leadId: string;
  score: number;
  matchingCriteria: {
    skillMatch: number;
    budgetMatch: number;
    availabilityMatch: number;
  };
}

export function SmartLeadMatching() {
  const { data: matchScores } = useQuery<MatchScore[]>({
    queryKey: ['lead-matches'],
    queryFn: async () => {
      // Mock data for demonstration
      return [
        {
          leadId: '1',
          score: 95,
          matchingCriteria: {
            skillMatch: 100,
            budgetMatch: 90,
            availabilityMatch: 95
          }
        },
        {
          leadId: '2',
          score: 85,
          matchingCriteria: {
            skillMatch: 80,
            budgetMatch: 95,
            availabilityMatch: 80
          }
        }
      ];
    },
  });

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Smart Lead Matching</h3>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {matchScores?.map((match) => (
              <li key={match.leadId} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1.5 text-sm font-medium text-gray-900">
                            {match.score}% Match
                          </span>
                        </div>
                        <Badge status={match.score > 80 ? 'Perfect Match' : 'Good Match'} />
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          Skills: {match.matchingCriteria.skillMatch}%
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          Availability: {match.matchingCriteria.availabilityMatch}%
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          Budget Match: {match.matchingCriteria.budgetMatch}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}