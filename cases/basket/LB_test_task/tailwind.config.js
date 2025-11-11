tailwind.config = {
    content: ["./*.html"],
    plugins: [],
    theme: {
        extend: {
            colors: {
                r_black: '#000000',
                r_white: '#FFFFFF',
                r_gray: '#A8A8A8',
                r_gray_text: '#ABABAB',
                r_d_gray: '#7E7C7C',
                r_gray_bg: '#F2F2F2',
                r_gray_border: '#CACACA',
                r_gray_divider: '#E1E1E1',
                r_red: '#FF6161',
                r_orange: '#FD6D20',
                r_green: '#6CC471',
                r_l_green: '#7CFF4C',
            },
            backgroundImage: {
                gr_orange: 'linear-gradient(to right, #FF7E2D, #F64200)',
            }
        },
        container: {
            center: true, 
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1440px',
            },
        },
    }, 
    safelist: ['h-[64vw]'], 
}

// sm	640px
// md	768px
// lg	1024px
// xl	1280px
// 2xl	1536px