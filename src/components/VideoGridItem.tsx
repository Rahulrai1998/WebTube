import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    channel: {
        id: string;
        name: string;
        profileUrl: string;
    };
    views: number;
    postedAt: Date;
    duration: number;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, { notation: "compact" })

const VideoGridItem = ({
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,
}: VideoGridItemProps) => {

    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!videoRef.current) return;
        if (isVideoPlaying) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isVideoPlaying])

    return (
        <div className="flex flex-col gap-2" onMouseEnter={() => setIsVideoPlaying(true)} onMouseLeave={() => setIsVideoPlaying(false)}>
            <a href={`/watch?v=${id}`} className="relative aspect-video">
                <img
                    src={thumbnailUrl}
                    alt="video thumbnail"
                    className={`block object-cover w-full h-full ${isVideoPlaying ? "rounded-none" : "rounded-xl"}  transition-[border-radius] duration-200`}
                />

                <div className="absolute bottom-1 right-1 text-secondary-text text-small bg-secondary-dark rounded px-0.5">
                    {formatDuration(duration)}
                </div>
                <video src={videoUrl} muted playsInline ref={videoRef} className={`block h-full  object-cover  absolute inset-0 transition-opacity ${isVideoPlaying ? "opacity-100  delay-200" : "opacity-0"} duration-200`} />
            </a>
            <div className="flex gap-2">
                <a href={`/@${channel.id}`} className={"flex-shrink-0"}>
                    <img
                        src={channel?.profileUrl}
                        alt="channel profile image"
                        className="w-11 h-11 rounded-full"
                    />
                </a>
                <div className="flex flex-col">
                    <a href={`/watch?v=${id}`} className="font-bold">{title}</a>
                    <a href={`/@${channel.id}`} className="text-secondary-text text-sm">{channel.name}</a>
                    <div className="text-secondary-text text-sm">{VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}</div>
                </div>
            </div>

        </div>
    );
};

export default VideoGridItem;
