import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { getCompanyByKvKNumber, validateKvKNumber } from '../../services/kvk';
import { CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

const kvkSchema = z.object({
  kvkNumber: z.string()
    .min(8, 'KVK nummer moet 8 cijfers zijn')
    .max(8, 'KVK nummer moet 8 cijfers zijn')
    .regex(/^[0-9]+$/, 'KVK nummer mag alleen cijfers bevatten'),
});

type FormData = z.infer<typeof kvkSchema>;

export function KvKVerification() {
  const [companyData, setCompanyData] = useState<any>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const t = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(kvkSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsVerifying(true);
    setVerificationError(null);

    try {
      const isValid = await validateKvKNumber(data.kvkNumber);
      if (!isValid) {
        setVerificationError('Ongeldig KVK nummer of bedrijf niet gevonden');
        return;
      }

      const { data: company, error } = await getCompanyByKvKNumber(data.kvkNumber);
      
      if (error) {
        setVerificationError(error.detail);
        return;
      }

      setCompanyData(company);
    } catch (error) {
      setVerificationError('Er is een fout opgetreden bij het verifiëren van het KVK nummer');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">KVK Verificatie</h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Verifieer uw bedrijf met uw KVK-nummer voor extra betrouwbaarheid
        </p>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="KVK Nummer"
            error={errors.kvkNumber?.message}
            {...register('kvkNumber')}
            placeholder="12345678"
          />

          <Button
            type="submit"
            isLoading={isVerifying}
            className="w-full"
          >
            Verifiëren
          </Button>
        </form>

        {verificationError && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Verificatie mislukt
                </h3>
                <p className="mt-2 text-sm text-red-700">{verificationError}</p>
              </div>
            </div>
          </div>
        )}

        {companyData && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Bedrijf geverifieerd
                </h3>
                <div className="mt-2 text-sm text-green-700 space-y-1">
                  <p><strong>Naam:</strong> {companyData.tradeNames.businessName}</p>
                  <p><strong>KVK nummer:</strong> {companyData.kvkNumber}</p>
                  <p><strong>Adres:</strong> {`${companyData.addresses[0].street} ${companyData.addresses[0].houseNumber}`}</p>
                  <p><strong>Postcode:</strong> {companyData.addresses[0].postalCode}</p>
                  <p><strong>Plaats:</strong> {companyData.addresses[0].city}</p>
                  <p><strong>Oprichtingsdatum:</strong> {new Date(companyData.foundationDate).toLocaleDateString('nl-NL')}</p>
                  {companyData.businessActivities.length > 0 && (
                    <p><strong>Hoofdactiviteit:</strong> {companyData.businessActivities.find(a => a.isMainSbi)?.sbiCodeDescription}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}