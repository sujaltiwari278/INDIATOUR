function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div
      className="
      bg-gradient-to-r
      from-orange-500
      via-orange-400
      to-blue-700
      text-white
      rounded-[32px]
      p-10
      shadow-2xl
      mb-8
      border
      border-white/20
    "
    >
      <p className="text-orange-100 text-lg font-medium mb-2">
        INDIA TOUR
      </p>

      <h1 className="text-5xl font-extrabold mb-3">
        {title}
      </h1>

      <p className="text-orange-50 text-lg max-w-3xl">
        {subtitle}
      </p>
    </div>
  );
}

export default PageHeader;