import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface QuizStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

export function OnboardingQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    expertise: [],
    yearsExperience: '',
    preferredProjectSize: '',
    hourlyRate: '',
    availability: '',
    workStyle: [],
    portfolio: [],
    kvkNumber: '',
  });
  const navigate = useNavigate();

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps: QuizStep[] = [
    {
      id: 'expertise',
      title: 'Waar ben je expert in?',
      description: 'Selecteer je belangrijkste expertisegebieden',
      component: (
        <div className="space-y-4">
          {['Web Development', 'Mobile Development', 'UI/UX Design', 'E-commerce', 'WordPress'].map((skill) => (
            <div
              key={skill}
              onClick={() => {
                const expertise = formData.expertise.includes(skill)
                  ? formData.expertise.filter(s => s !== skill)
                  : [...formData.expertise, skill];
                updateFormData('expertise', expertise);
              }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                formData.expertise.includes(skill)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{skill}</span>
                {formData.expertise.includes(skill) && (
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'experience',
      title: 'Hoeveel ervaring heb je?',
      description: 'Vertel ons over je werkervaring',
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jaren ervaring
            </label>
            <select
              value={formData.yearsExperience}
              onChange={(e) => updateFormData('yearsExperience', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecteer...</option>
              <option value="1-2">1-2 jaar</option>
              <option value="3-5">3-5 jaar</option>
              <option value="5-10">5-10 jaar</option>
              <option value="10+">10+ jaar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uurtarief (€)
            </label>
            <Input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => updateFormData('hourlyRate', e.target.value)}
              placeholder="85"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'preferences',
      title: 'Wat voor projecten zoek je?',
      description: 'Help ons de juiste projecten voor je te vinden',
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gewenste projectgrootte
            </label>
            <select
              value={formData.preferredProjectSize}
              onChange={(e) => updateFormData('preferredProjectSize', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecteer...</option>
              <option value="small">Klein (€1k - €5k)</option>
              <option value="medium">Middel (€5k - €15k)</option>
              <option value="large">Groot (€15k+)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschikbaarheid
            </label>
            <select
              value={formData.availability}
              onChange={(e) => updateFormData('availability', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecteer...</option>
              <option value="part-time">Part-time</option>
              <option value="full-time">Full-time</option>
              <option value="flexible">Flexibel</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 'verification',
      title: 'Laatste stap: Verificatie',
      description: 'Verifieer je bedrijf met KvK',
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              KvK Nummer
            </label>
            <Input
              value={formData.kvkNumber}
              onChange={(e) => updateFormData('kvkNumber', e.target.value)}
              placeholder="12345678"
            />
            <p className="mt-2 text-sm text-gray-500">
              We gebruiken je KvK nummer om je bedrijf te verifiëren
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form data and navigate to dashboard
      console.log('Form data:', formData);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <Card.Body>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {steps[currentStep].title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {steps[currentStep].description}
                    </p>
                  </div>

                  {steps[currentStep].component}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      icon={<ArrowLeft className="h-4 w-4" />}
                    >
                      Terug
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      icon={<ArrowRight className="h-4 w-4" />}
                    >
                      {currentStep === steps.length - 1 ? 'Voltooien' : 'Volgende'}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}