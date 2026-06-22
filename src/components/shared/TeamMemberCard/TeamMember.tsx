import React from 'react';
import './TeamMember.scss';
import linkedinLogo from '../../../../public/icons/LinkedIn_icon.svg.webp';
import type { TeamMember } from '../../../pages/TeamPage/TeamPage.tsx';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { photo, first_name, last_name, role, quote, linkedin } = member;

  const handleStubClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <div className="team-card">
      <div className="team-card__inner">
        <a
          href="#"
          className="team-card__image-wrapper"
          onClick={handleStubClick}
        >
          <img
            src={photo}
            alt={`${first_name} ${last_name}`}
            className="team-card__image"
            loading="lazy"
          />
        </a>
        <div className="team-card__content">
          <div className="team-card__header">
            <h3 className="team-card__name">
              <a
                href={linkedin}
                className="team-card__link"
              >
                <img
                  src={linkedinLogo}
                  alt="LinkedIn"
                  className="team-card__linkedin-image"
                />
                {first_name} {last_name}
              </a>
            </h3>
            <span className="team-card__role">{role}</span>
          </div>

          <div className="team-card__quote-wrapper">
            <p className="team-card__quote">
              <q>{quote}</q>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
