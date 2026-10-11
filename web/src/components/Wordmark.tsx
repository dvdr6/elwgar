/** ELWGAR wordmark with the trademark superscript. */
export default function Wordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={className}>
      ELWGAR
      <sup className="ml-0.5 align-super text-[0.55em] font-medium">™</sup>
    </span>
  );
}
