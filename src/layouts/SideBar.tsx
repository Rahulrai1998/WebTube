import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import React, { type ElementType, type JSX, type ReactNode } from "react";
import { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";

const SideBar = () => {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>

      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2">
        <LargeSidebarSection>
          <LargeSidebarItem isActive Icon={Home} title={"Home"} url="/" />
          <LargeSidebarItem
            isActive
            Icon={Repeat}
            title="Shorts"
            url="/shorts"
          />
          <LargeSidebarItem
            isActive
            Icon={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
          <LargeSidebarItem
            isActive
            Icon={Library}
            title="Library"
            url="/library"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

export default SideBar;

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-0.5 flex flex-col items-center rounded-lg , gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-[10px]">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({ children }: LargeSidebarSectionProps) {
  return <>{children}</>;
}

type LargeSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive: boolean;
};

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "w-full p-3 flex items-center rounded-lg , gap-4 justify-start"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-ellipsis whitespsace-nowrap overflow-hidden">
        {title}
      </div>
    </a>
  );
}
