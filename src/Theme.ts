import { DefaultTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { } from 'styled-components/cssprop';


const theme: DefaultTheme = {
    borderRadius: '5px',

    colors: {
        main: 'A5C4D4',
        secondary: '7B6D8D',
        background: '493b2a',
        link: '8499B1',
    },
    font: {
        size: {
            extraSmall: '14px',
            small: '16px',
            medium: '18px',
            large: '20px',
            extraLarge: '24px',
        },
        family: 'sans-serif',
    },
    breakpoint: {
        mobile: '375px',
        tablet: '600px',
        laptop: '1200px',
        desktop: '1600px',
    },
};
// const Theme = ({ children }) => {
//     return <ThemeProvider theme={ theme }>
//      {children} 
//      </ThemeProvider>;
// };

export default { theme };