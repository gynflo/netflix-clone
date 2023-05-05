import Input from "@/components/input";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="relative h-full w-full bg-no-repeat bg-center bg-fixed bg-cover bg-[url('/images/hero2.jpg')]">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="py-5 px-12">
          <Image
            src="/images/logo.png"
            alt="Logo de Netflix"
            height={96}
            width={96}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-lg rounded-md w-full">
            <h2 className="text-white text-center text-4xl mb-8 font-semibold">
              {variant === "login" ? "S'identifier" : "Créer un compte"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id={"name"}
                  onChange={(event: any) => setName(event.target.value)}
                  value={name}
                  label={"Username"}
                  type="text"
                />
              )}

              <Input
                id={"email"}
                onChange={(event: any) => setEmail(event.target.value)}
                value={email}
                label={"E-mail"}
                type="email"
              />
              <Input
                id={"password"}
                onChange={(event: any) => setPassword(event.target.value)}
                value={password}
                label={"Password"}
                type="password"
              />
            </div>
            <button className="py-4 bg-red-600 hover:bg-red-700 text-white rounded-md w-full mt-10">
              {variant === "register" ? "S'enregistrer" : "S'identifier"}
            </button>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Première visite sur Netflix ?"
                : "Vous avez déja un compte ?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "register" ? "Connectez-vous" : "Inscrivez-vous"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
