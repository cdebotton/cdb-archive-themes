import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components/macro';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  matchPath,
  match,
} from 'react-router-dom';
import { createLocation, Location, LocationDescriptor } from 'history';

import { useRouter } from '../hooks/useRouter';

type Props = RouterLinkProps & {
  'aria-current'?: string;
  className?: string;
  children: ReactNode;
  exact?: boolean;
  strict?: boolean;
  isActive?: (match: match<{}> | null, location: LocationDescriptor) => boolean;
};

function normalizeToLocation(
  to: string | LocationDescriptor,
  currentLocation: Location,
) {
  return typeof to === 'string'
    ? createLocation(to, null, undefined, currentLocation)
    : to;
}

function resolveToLocation(
  to:
    | LocationDescriptor
    | ((location: LocationDescriptor) => LocationDescriptor),
  currentLocation: LocationDescriptor,
) {
  return typeof to === 'function' ? to(currentLocation) : to;
}

export function NavLink({
  'aria-current': ariaCurrent = 'page',
  className,
  children,
  exact,
  strict,
  isActive: isActiveProp,
  ...props
}: Props) {
  const { location } = useRouter();
  const { pathname: pathToMatch } = location;
  const { to } = props;
  const toLocation = normalizeToLocation(
    resolveToLocation(to, location),
    location,
  );
  const { pathname: path } = toLocation;
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
  const match = escapedPath
    ? matchPath(pathToMatch, { path: escapedPath, exact, strict })
    : null;
  const isActive = !!(isActiveProp ? isActiveProp(match, location) : match);

  return (
    <Link
      aria-current={isActive && ariaCurrent}
      className={className}
      isActive={isActive}
      {...props}
    >
      {children}
    </Link>
  );
}

const Link = styled(
  ({ isActive: _, ...props }: RouterLinkProps & { isActive: boolean }) => {
    return <RouterLink {...props} />;
  },
)`
  text-decoration: none;

  ${props => {
    if (props.isActive) {
      return css`
        font-weight: bold;
      `;
    }
  }}
`;
