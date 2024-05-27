"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 border border-gray-600 rounded-full", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <MenuItem setActive={setActive} active={active} item="Out Cources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/cources">Courses</HoveredLink>
            <HoveredLink href="/cources">Basic Music Theory</HoveredLink>
            <HoveredLink href="/cources">Advanced Composition</HoveredLink>
            <HoveredLink href="/cources">Songwriting</HoveredLink>
            <HoveredLink href="/cources">Music Production</HoveredLink>
          </div>
        </MenuItem>
        <Link href={"/contact"}>
          <MenuItem setActive={setActive} active={active} item="Contact Us" />
        </Link>
      </Menu>
    </div>
  );
};

export default Navbar;
