export type ThemeColors = {
  primary: string;
  secondary: string;
  text: string;
  background: string;
};

export type ThemeManagementModel = {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
};

export const THEMES: ThemeColors[] = [
  {
    primary: '#7ab2d3',
    secondary: '#b9e5e8',
    text: '#4a628a',
    background: '#dff2eb',
  },
  {
    primary: '#222831',
    secondary: '#393E46',
    text: '#00ADB5',
    background: '#EEEEEE',
  },
  {
    primary: '#E3FDFD',
    secondary: '#CBF1F5',
    text: '#A6E3E9',
    background: '#71C9CE',
  },
  {
    primary: '#E3FDFD',
    secondary: '#CBF1F5',
    text: '#A6E3E9',
    background: '#71C9CE',
  },
  {
    primary: '#F9F7F7',
    secondary: '#DBE2EF',
    text: '#3F72AF',
    background: '#112D4E',
  },
];
