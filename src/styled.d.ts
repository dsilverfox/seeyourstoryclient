import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;

        colors: {
            main: string;
            secondary: string;
            background: string;
            link: string;
        };
        font: {
            size: {
                extraSmall: string,
                small: string,
                medium: string,
                large: string,
                extraLarge: string,
            },
            family: string,
        },
        breakpoint: {
            mobile: string,
            tablet: string,
            laptop: string,
            desktop: string,
        },
    }
}