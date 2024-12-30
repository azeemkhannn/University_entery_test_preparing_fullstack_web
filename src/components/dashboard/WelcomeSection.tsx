import React from 'react';

interface WelcomeSectionProps {
  name: string;
}

export default function WelcomeSection({ name }: WelcomeSectionProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        {greeting}, {name||'Student'}! 👋
      </h1>
      <p className="mt-2 text-gray-600">
        Ready to continue your test preparation journey? Here's your progress overview.
      </p>
    </div>
  );
}