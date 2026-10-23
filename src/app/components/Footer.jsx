const socials = [
  ["https://www.instagram.com/anaheim.std/", "Instagram"],
  ["https://www.behance.net/AnaheimStd", "Behance"],
  ["mailto:hi@anaheim.ltd", "hi@anaheim.ltd"],
];

const Footer = () => (
  <footer className="w-full bg-[var(--bg)] border-t border-white/10 px-8 py-12">
    <ul className="flex flex-wrap gap-x-10 gap-y-3">
      {socials.map(([href, label]) => (
        <li key={href}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>

    <p className="mt-12 text-sm text-white/40">© {new Date().getFullYear()} Anaheim Studio. All rights reserved.</p>
  </footer>
);

export default Footer;
