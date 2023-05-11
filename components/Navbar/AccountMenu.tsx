/* eslint-disable @next/next/no-img-element */
import { signOut } from "next-auth/react";

interface AccoutMenuProps {
  visible?: boolean;
}

export default function AccountMenuNavbar({ visible }: AccoutMenuProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute bg-black w-56 top-14 right-0 py-5 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex gap-3 items-center w-full">
          <img
            src="/images/default-blue.png"
            alt="image logo du profil"
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            Username
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          className="px-3 text-center text-white text-sm hover:underline"
          onClick={() => signOut()}
        >
          Se déconnecter
        </div>
      </div>
    </div>
  );
}
