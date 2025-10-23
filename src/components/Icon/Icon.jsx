function Icon({ id, className, size = 16 }) {
  return (
    <svg className={className} width={size} height={size} aria-hidden="true">
      <use href={`/sprite.svg#${id}`} xlinkHref={`/sprite.svg#${id}`} />
    </svg>
  );
}

export default Icon;
