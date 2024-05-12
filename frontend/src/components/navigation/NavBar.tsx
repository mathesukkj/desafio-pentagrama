import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed py-4 bg-slate-800 text-white top-0 w-full flex  items-center justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/cities">Cidades</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/neighborhoods">Bairros</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/roads">Ruas</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
