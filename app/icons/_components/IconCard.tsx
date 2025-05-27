export const IconCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full h-full p-4 border dark:border-slate-700 border-slate-300 rounded-md shadow-md
         flex justify-center items-center relative transition-colors duration-300"
    >
      {children}
    </div>
  );
};
