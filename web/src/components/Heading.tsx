import { jsx } from '@emotion/core';
import { fontSizes, colors, lineHeights, space } from 'libs/theme';
import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  children?: ReactNode;
  fontSize?: number | string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
  children,
  level = 2,
  fontSize = 1,
  ...props
}: Props) {
  return jsx(
    `h${level}`,
    {
      ...props,
      css: {
        marginTop: space[0].rem,
        fontSize:
          typeof fontSize === 'number'
            ? fontSizes[fontSize].em ?? fontSize
            : fontSize,
        color: colors.vars.text900,
        lineHeight: lineHeights.heading,
      },
    },
    children,
  );
}
