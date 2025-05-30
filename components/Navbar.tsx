import { LinkInfo } from './LinkInfo';
import { ThemeButton } from './ThemeButton';

export const Navbar = () => {
  return (
    <div className="hidden 2xl:block h-16 shadow-md">
      <div className="h-full container flex justify-between items-center">
        <LinkInfo />
        <ThemeButton />
      </div>
    </div>
  );
};
