export const getRandomQuote = () => {
  const quotes = [
    "My code isn't just functional, it's a testament to elegant logic and meticulously crafted readability. It whispers its purpose, inviting collaboration and future understanding.",
    "I don't write spaghetti, I weave tapestries of interconnected modules, each thread woven with clear intent and unwavering efficiency. Complexity bows before the beauty of clean code.",
    "Every line I write is a brushstroke in a digital masterpiece, where artistry meets precision. I strive for code that resonates not just with functionality, but with clarity and a quiet, self-evident elegance.",
    "In the digital wilderness, I build not just structures, but symphonies. Each function a harmonic note, each class a movement flowing seamlessly into the next, orchestrated by the unwavering melody of clean code.",
    "The future whispers through my code, its lines written not just for today, but for the eyes of tomorrow's engineers. I build bridges of logic, ensuring clarity endures despite the march of time.",
    "My keyboard is not just a tool, it's a conduit for craftsmanship. Every keystroke an act of intention, crafting code that sings with meaning, inviting collaboration and illuminating the path forward.",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)]!;
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
