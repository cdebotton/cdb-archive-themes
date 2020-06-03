import { jsx, css } from '@emotion/core';
import { colors } from 'libs/theme';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = LinkProps & {
  children: ReactNode;
  exact?: boolean;
  className?: string;
};

export function Link({ children, className, exact, ...props }: Props) {
  const { href } = props;
  const router = useRouter();

  const isActive = exact
    ? router.asPath === href
    : router.asPath.startsWith(href.toString());

  return jsx(
    NextLink,
    { ...props, passHref: true },
    jsx(
      'a',
      {
        className,
        css: css({
          color: isActive ? colors.vars.primary : colors.vars.text,
          ':hover': { color: colors.vars.primary },
        }),
      },
      children,
    ),
  );
}
