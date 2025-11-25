import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FinancialItem } from '../types';

interface FinancialChartProps {
  data: FinancialItem[];
}

export const FinancialChart: React.FC<FinancialChartProps> = ({ data }) => {
  const colors = ['#10b981', '#34d399', '#059669'];

  return (
    <div className="h-[400px] w-full bg-white p-6 rounded-2xl shadow-lg border border-emerald-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">Projeção de Receita Mensal</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{fill: '#4b5563', fontSize: 12}} />
          <YAxis tick={{fill: '#4b5563'}} unit=" R$" />
          <Tooltip 
            cursor={{fill: '#ecfdf5'}}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Bar dataKey="value" name="Valor Estimado">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};