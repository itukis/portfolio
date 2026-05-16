import { TECH_LINKS, techPattern } from "../utils/techLinks";

const LinkedText = ({ children }) => {
  if (typeof children !== "string") return children;
  const parts = children.split(techPattern);
  if (parts.length === 1) return children;
  return <>
    {parts.map((part, i) =>
      TECH_LINKS[part]
        ? <a key={i} href={TECH_LINKS[part]} target="_blank" rel="noopener noreferrer" className="tech-link">{part}</a>
        : <span key={i}>{part}</span>
    )}
  </>;
};

export default LinkedText;
