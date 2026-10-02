function ServiceGroup({ title, description, tags }) {
  return (
    // CHANGED: tags render as image cards (placeholder block when image is null)
    <div className="w-full  py-6 mb-2 border-b border-(--border)">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl">{title}</h3>
        <p>{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map(({ name, image }) => (
          <div
            key={name}
            className="group relative w-full border border-(--border) rounded-md overflow-hidden"
          >
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-48 sm:h-52 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            ) : (
              <div
                role="img"
                aria-label={name}
                className="w-full h-40 sm:h-44 bg-(--card)"
              />
            )}
            <p className="services absolute bottom-0 z-10 w-full px-2 py-1 text-center text-sm text-white bg-black/60">
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceGroup;