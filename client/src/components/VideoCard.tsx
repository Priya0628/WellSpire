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
    <div className="video-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
      <div className="aspect-video relative bg-gray-100">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full rounded-t-xl"
          allowFullScreen
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {duration}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-medium text-primary">{channel}</span>
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{views}</span>
        </div>
      </div>
    </div>
  );
}
