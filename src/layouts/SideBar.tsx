import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { Children, useState, type ElementType, type ReactNode } from "react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";

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

      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px- lg:flex hidden">
        <LargeSidebarSection visibleItemCount={3}>
          <LargeSidebarItem
            isActive
            IconOrImgURL={Home}
            title={"Home"}
            url="/"
          />
          <LargeSidebarItem
            IconOrImgURL={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgURL={Library}
            title={"Library"}
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgURL={History}
            title={"History"}
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgURL={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgURL={Clock}
            title="Watch Later"
            url="/watch-later"
          />

          {playlists?.map((playlist) => (
            <LargeSidebarItem
              key={playlist?.id}
              IconOrImgURL={ListVideo}
              title={playlist?.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title={"Subscriptions"} visibleItemCount={5}>
          {subscriptions?.map((subs) => (
            <LargeSidebarItem
              key={subs?.id}
              IconOrImgURL={subs?.imgUrl}
              title={subs?.channelName}
              url={`/@${subs?.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title={"Explore"} visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgURL={Flame}
            title={"Trending"}
            url={`/trending`}
          />
          <LargeSidebarItem
            IconOrImgURL={ShoppingBag}
            title={"Shopping"}
            url={`/shopping`}
          />
          <LargeSidebarItem
            IconOrImgURL={Music2}
            title={"Music"}
            url={`/music`}
          />
          <LargeSidebarItem
            IconOrImgURL={Film}
            title={"Movies & TV"}
            url={`/movies-tv`}
          />
          <LargeSidebarItem IconOrImgURL={Radio} title={"Live"} url={`/live`} />
          <LargeSidebarItem
            IconOrImgURL={Gamepad2}
            title={"Gaming"}
            url={`/gaming`}
          />
          <LargeSidebarItem
            IconOrImgURL={Newspaper}
            title={"News"}
            url={`/news`}
          />
          <LargeSidebarItem
            IconOrImgURL={Trophy}
            title={"Sports"}
            url={`/sports`}
          />
          <LargeSidebarItem
            IconOrImgURL={Lightbulb}
            title={"Learning"}
            url={`/learning`}
          />
          <LargeSidebarItem
            IconOrImgURL={Shirt}
            title={"Fashion & Beauty"}
            url={`/fashion-beauty`}
          />
          <LargeSidebarItem
            IconOrImgURL={Podcast}
            title={"Podcasts"}
            url={`/podcasts`}
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
  IconOrImgURL: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgURL,
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
      {typeof IconOrImgURL === "string" ? (
        <img src={IconOrImgURL} className={"w-6 h-6 rounded-full"} />
      ) : (
        <IconOrImgURL className="w-6 h-6" />
      )}
      <div className="text-ellipsis whitespace-nowrap overflow-hidden">
        {title}
      </div>
    </a>
  );
}
