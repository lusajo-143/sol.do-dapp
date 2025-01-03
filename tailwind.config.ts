import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DE483A',
          '50': '#FBE8E6',
          '100': '#F6CBC6',
          '200': '#EEA9A2',
          '300': '#E6877E',
          '400': '#E06763',
          '500': '#DE483A', // Main color
          '600': '#D84033',
          '700': '#D1352B',
          '800': '#CA2B24',
          '900': '#BC1B17',
          'A100': '#FFD5D3',
          'A200': '#FFAAA6',
          'A400': '#FF7975',
          'A700': '#FF605C',
        },
        secondary: {
          DEFAULT: '#C93B69',
          '50': '#F9E5EE',
          '100': '#F2BDD1',
          '200': '#E88CAE',
          '300': '#DD5B8B',
          '400': '#D53A72',
          '500': '#C93B69', // Main color
          '600': '#B5355F',
          '700': '#9D2D52',
          '800': '#852544',
          '900': '#631A32',
          'A100': '#FFB1C6',
          'A200': '#FF8FAE',
          'A400': '#FF658D',
          'A700': '#FF4B78',
        },
        accent: {
          DEFAULT: '#641AE6',
          '50': '#F2EAFE',
          '100': '#DCCBFD',
          '200': '#C3A8FC',
          '300': '#A985FA',
          '400': '#946AF9',
          '500': '#641AE6',
          '600': '#5A17D9',
          '700': '#4C13C7',
          '800': '#3F0FB5',
          '900': '#2A0893',
          'A100': '#D4C3FF',
          'A200': '#B08FFF',
          'A400': '#8C5BFF',
          'A700': '#7A42FF',
        }
      }
    },
  },
  plugins: [require('daisyui')],
};
export default config;
