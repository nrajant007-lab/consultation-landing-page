import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-center px-4 pb-2 pt-6">
      <Image src="/logo.png" alt="Multi Equipment Trade and Services P. Ltd." width={856} height={708} priority className="h-20 w-auto sm:h-24" />
    </header>
  );
}
