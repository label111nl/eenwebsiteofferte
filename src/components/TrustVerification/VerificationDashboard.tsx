import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Shield, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { KvKVerification } from '../Settings/KvKVerification';

interface VerificationStatus {
  id: string;
  type: 'identity' | 'portfolio' | 'skills' | 'kvk';
  status: 'verified' | 'pending' | 'failed';
  lastChecked: string;
  details: string;
  score: number;
}

export function TrustVerification() {
  const t = useTranslation();
  
  const { data: verifications } = useQuery<VerificationStatus[]>({
    queryKey: ['verifications'],
    queryFn: async () => {
      // Mock data for demonstration
      return [
        {
          id: '1',
          type: 'kvk',
          status: 'verified',
          lastChecked: new Date().toISOString(),
          details: 'KvK nummer geverifieerd',
          score: 40
        },
        {
          id: '2',
          type: 'portfolio',
          status: 'verified',
          lastChecked: new Date().toISOString(),
          details: 'Portfolio projecten geverifieerd met klant referenties',
          score: 30
        },
        {
          id: '3',
          type: 'skills',
          status: 'pending',
          lastChecked: new Date().toISOString(),
          details: 'Technische beoordeling in behandeling',
          score: 0
        }
      ];
    },
  });

  const totalScore = verifications?.reduce((acc, v) => acc + v.score, 0) || 0;

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">
              {t.verification.title}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{t.verification.trustScore}</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {totalScore}/100
            </span>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="space-y-6">
          {verifications?.map((verification) => (
            <div key={verification.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {verification.status === 'verified' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : verification.status === 'pending' ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {t.verification[verification.type]}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${
                    verification.status === 'verified' ? 'text-green-600' :
                    verification.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {t.verification.status[verification.status]}
                  </span>
                  {verification.score > 0 && (
                    <span className="text-xs text-gray-500">
                      +{verification.score} {t.verification.points}
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{verification.details}</p>
              
              {verification.status === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  {t.verification.complete}
                </Button>
              )}
            </div>
          ))}

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              {t.verification.howToImprove}
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
              <li>{t.verification.tips.portfolio}</li>
              <li>{t.verification.tips.skills}</li>
              <li>{t.verification.tips.reviews}</li>
            </ul>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}