import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto text-sm text-gray-500 text-center py-4">
      <p>
        © {new Date().getFullYear()} CalculaTudo. Simulações com base em dados legais. Consulte um profissional para validação final.
      </p>
    </footer>
  );
}
