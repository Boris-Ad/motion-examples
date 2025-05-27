export const Footer = () => {
  return (
    <div
      className="hidden 2xl:block h-24 fixed inset-x-0 bottom-0 bg-radial dark:from-slate-800 from-slate-300 from-[1px] to-transparent to-[1px] bg-size-[6px_6px]
     bg-repeat backdrop-blur-[1px] transition-colors duration-300 z-40"
    >
      <div className="h-full container flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="logo"
          viewBox="0 0 62 22.34"
          width="62"
          height="22.34"
          fill="var(--color-foreground)"
          className="transition-colors duration-300"
        >
          <path d="M23.41 0 11.16 22.32H0L9.565 4.892C11.048 2.19 14.748 0 17.83 0z" stroke="none" strokeWidth="0.049206349206349205" />
          <path
            d="M50.778 5.58c0 -3.082 2.498 -5.58 5.58 -5.58s5.58 2.498 5.58 5.58c0 3.082 -2.498 5.58 -5.58 5.58s-5.58 -2.498 -5.58 -5.58"
            stroke="none"
            strokeWidth="0.049206349206349205"
          />
          <path d="M25.503 0h11.16L24.412 22.32h-11.16z" stroke="none" strokeWidth="0.049206349206349205" />
          <path d="M38.683 0h11.16L40.278 17.428C38.795 20.13 35.095 22.32 32.013 22.32h-5.58z" stroke="none" strokeWidth="0.049206349206349205" />
        </svg>
        <h2 className="text-2xl font-medium select-none">Motion Animation</h2>
      </div>
    </div>
  );
};
