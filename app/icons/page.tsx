import { PageTitle } from '@/components/PageTitle';
import { IconCard } from './_components/IconCard';
import { SmileIcon } from './_components/SmileIcon';
import { TimerIcon } from './_components/TimerIcon';
import { MenuIcon } from './_components/MenuIcon';
import { CloseMenu } from './_components/CloseMenu';

const IconsPage = () => {
  return (
    <>
      <div className='px-8 pt-8'>
        <PageTitle>Анимация Иконок</PageTitle>
      </div>

      <section className="p-8 grid grid-cols-1 xl:grid-cols-6 gap-6">
        <IconCard>
          <SmileIcon />
        </IconCard>
        <IconCard>
          <TimerIcon />
        </IconCard>
        <IconCard>
          <MenuIcon />
        </IconCard>
        <IconCard>
          <CloseMenu />
        </IconCard>
      </section>
    </>
  );
};

export default IconsPage;
