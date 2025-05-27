interface VideoCardProps {
  title: string;
  description: string;
  channel: string;
  views: string;
  duration: string;
  embedUrl: string;
}

export default function VideoCard({ title, description, channel, views, duration, embedUrl }: VideoCardProps) {
  return (
    <div className="video-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video relative">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{channel}</span>
          <span className="text-xs text-gray-500">{views}</span>
        </div>
      </div>
    </div>
  );
}
