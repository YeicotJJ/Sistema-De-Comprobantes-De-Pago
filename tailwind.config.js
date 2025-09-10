module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                onBackground: 'var(--color-on-background)',
                onSurface: 'var(--color-on-surface)',
                onPrimary: 'var(--color-on-primary)',
                onSecondary: 'var(--color-on-secondary)',
            },
        },
    },
    plugins: [],
};