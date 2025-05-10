import { TypographyMuted } from "@/components/TypographyMuted";

const Footer = () => {
  const text = `© ${new Date().getFullYear()} Andrea Procopio. All rights reserved.`;
  return (
    <footer className="w-full border-t border-border py-6 mt-10">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-1">
        <p className="text-sm font-medium text-foreground">ClarityFlow</p>
        <TypographyMuted text={text} />
      </div>
    </footer>
  );
};

export default Footer;
