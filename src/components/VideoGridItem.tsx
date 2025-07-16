

type VideoGridItemProps = {
    id: string,
    title: string,
    thumbnailUrl: string,
    videoUrl: string
    channel: {
        id: string,
        name: string,
        profileUrl: string
    },
    views: number,
    postedAt: Date,
    duration: number,

}
const VideoGridItem = ({ id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl }: VideoGridItemProps) => {
    return <div className="flex flex-col gap-2">
        <a href={`/watch?v=${id}`} className="relative aspect-video">
            <img src={thumbnailUrl} alt="video thumbnail" className="block object-cover w-full h-full rounded-xl" />

            <div className="absolute bottom-1 right-1 text-secondary-text text-small bg-secondary-dark rounded px-0.5">{duration}</div>
        </a>
    </div>
}

export default VideoGridItem