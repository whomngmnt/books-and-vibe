import React from 'react';
import { TeamMemberCard } from '../../components/shared/TeamMemberCard';
import { team } from './people/Team.ts';
import './TeamPage.scss';
import { useTranslation } from 'react-i18next';

export interface TeamMember {
  photo: string;
  first_name: string;
  last_name: string;
  role: string;
  quote: string;
  linkedin: string;
}

export const TeamPage: React.FC = () => {
  const teamMembers = team as TeamMember[];

  const { t } = useTranslation();

  return (
    <div className="team-page">
      <div className="team-page__title-section">
        <h1 className="team-page__title">{t('common.ourTeam')}</h1>
      </div>

      <div className="team-page__grid">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={`${member.first_name}-${index}`}
            member={member}
          />
        ))}
      </div>
    </div>
  );
};
