import Link from "next/link";
import Image from "next/image";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

async function Navbar() {
  const user = await currentUser();
  if (user) await syncUser(); // POST

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              {/* Logo - her modda aynı boyutta olacak şekilde */}
              <div className="w-8 h-8 relative">
                <Image
                  src="/logo-dark.png"
                  alt="Postigo Logo"
                  fill
                  className="block dark:hidden object-contain"
                  sizes="32px"
                />
                <Image
                  src="/logo-light.png"
                  alt="Postigo Logo"
                  fill
                  className="hidden dark:block object-contain"
                  sizes="32px"
                />
              </div>
              <span className="text-xl font-bold text-primary font-mono tracking-wider">
                Postigo
              </span>
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

