/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    
    extend: {
      
      boxShadow:{
        shado2: "0px 2px 8px 0px rgba(149, 157, 165, 0.2)",
        shado3:"0px 2px 2px 1px rgba(120,140,130,0.2) inset"
      }
    },
  },
  plugins: [],
}

