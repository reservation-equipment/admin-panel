/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,

            // or have default horizontal padding
            padding: '20px',

            // default breakpoints but with 40px removed
            screens: {
                sm: '600px',
                md: '728px',
                lg: '984px',
                xl: '1240px',
                '2xl': '2000px',
            },
        },
        extend: {},
    },
    plugins: [],
}

