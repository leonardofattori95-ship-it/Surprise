/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        page: "#F7F6F2",
        panel: "#FFFFFF",
        panelAlt: "#E8E3DA",
        line: "#E3DDD1",
        lineSoft: "#EDE8DE",
        seal: "#E9AA78",
        sealDark: "#C97748",
        sealSoft: "#A8B5A1",
        sealSoftDark: "#7C8A76",
        ledger: "#7C8A76",
        text: "#5C5A55",
        textMuted: "#96938A",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        serif: ["'General Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
