import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faTwitter,
  faInstagram,
  faMedium,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { padding, rem, em } from 'polished';

type Props = {
  className?: string;
};

export const SocialAppBar = styled(function SocialAppBar({ className }: Props) {
  return (
    <div className={className}>
      <FALink icon={faGithub} href="//github.com/cdebotton" />
      <FALink icon={faTwitter} href="//twitter.com/cdebotton" />
      <FALink icon={faInstagram} href="//instagram.com/cdebotton" />
      <FALink icon={faMedium} href="//medium.com/@cdebotton" />
      <FALink icon={faLinkedin} href="//linkedin.com/in/christiandebotton" />
    </div>
  );
})`
  display: grid;
  grid-auto-flow: column dense;
  grid-gap: ${rem(16)};
  ${padding(rem(16))};
  font-size: ${em(24)};
`;

type FALinkProps = {
  icon: IconDefinition;
  href: string;
};

function FALink({ href, icon }: FALinkProps) {
  return (
    <a rel="noopener noreferrer" target="_blank" href={href}>
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
