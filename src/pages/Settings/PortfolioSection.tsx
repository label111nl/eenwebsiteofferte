import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { PortfolioItem } from '../../types';

export function PortfolioSection() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio_items',
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Portfolio</h3>
        <button
          type="button"
          onClick={() => append({
            title: '',
            description: '',
            image_url: '',
            technologies: [],
            completion_date: new Date().toISOString().split('T')[0],
          } as Partial<PortfolioItem>)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-md font-medium text-gray-900">Project {index + 1}</h4>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  {...register(`portfolio_items.${index}.title`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register(`portfolio_items.${index}.description`)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  {...register(`portfolio_items.${index}.image_url`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Project URL</label>
                <input
                  type="url"
                  {...register(`portfolio_items.${index}.project_url`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Technologies</label>
                <input
                  type="text"
                  {...register(`portfolio_items.${index}.technologies`)}
                  placeholder="e.g., React, Node.js, TypeScript"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                <input
                  type="date"
                  {...register(`portfolio_items.${index}.completion_date`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}