import { CSSProperties, TypeBackground } from '@mui/material/styles';
import { Mixins } from '@mui/material/styles/createMixins';

declare module '@mui/material/styles' {
  interface TypeBackground {
    card: string;
  }
}

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    lineClamp: (lines: number) => CSSProperties
  }
}
