/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      "hero-pattern":
        "url('https://cdn.dribbble.com/users/108183/screenshots/5288723/tic_tac_toe_loader_.gif')",
    },

    screens: {
      xs: { max: "500px" },
    },
  },
  plugins: [],
};
