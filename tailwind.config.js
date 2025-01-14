/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'blue': '#016BFF',
                'black': '#17181A',
                'dark-grey': '#1F1F21',
                'medium-grey': '#353638',
                'grey': '#50545D',
                'red': '#FB4447',
            }
        },
    },
    plugins: [],
}

