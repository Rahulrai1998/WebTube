import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  History,
  Home,
  Library,
  ListVideo,
  PlaySquare,
  Repeat,
} from "lucide-react";
import React, {
  Children,
  useState,
  type ElementType,
  type JSX,
  type ReactNode,
} from "react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists } from "../data/sidebar";

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
        <LargeSidebarSection visibleItemCount={3}>
          <LargeSidebarItem isActive Icon={Home} title={"Home"} url="/" />
          <LargeSidebarItem
            Icon={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem Icon={Library} title={"Library"} url="/library" />
          <LargeSidebarItem Icon={History} title={"History"} url="/history" />
          <LargeSidebarItem
            Icon={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            Icon={Clock}
            title="Watch Later"
            url="/watch-later"
          />

          {playlists?.map((playlist) => (
            <LargeSidebarItem
              key={playlist?.id}
              Icon={ListVideo}
              title={playlist?.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>

        <hr />
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
        "py-4 px-0.5 flex flex-col items-center rounded-lg  gap-1"
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

function LargeSidebarSection({
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
  children,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray?.slice(0, visibleItemCount);
  const showExpandBtn = childrenArray?.length > visibleItemCount;
  const BtnIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}{" "}
      {visibleChildren}
      {showExpandBtn && (
        <Button
          onClick={() => setIsExpanded((prev) => !prev)}
          variant={"ghost"}
          className="w-full p-3 flex items-center rounded-lg  gap-4"
        >
          <BtnIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show less" : "Show more"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full p-3 flex items-center rounded-lg  gap-4 ${
          isActive
            ? "font-bold bg-neutral-100 hover:bg-secondary-default"
            : undefined
        }`
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-ellipsis whitespace-nowrap overflow-hidden">
        {title}
      </div>
    </a>
  );
}
