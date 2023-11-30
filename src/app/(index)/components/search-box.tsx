"use client";

import {useRouter, useSearchParams} from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevenimos que la página se refresque al enviar el formulario
    event.preventDefault();

    // Obtenemos el valor del input
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const query = event.currentTarget.query.value;

    // Redireccionamos al index con una query
    router.push(`/?q=${query}`);
  }

  return (
    <form className="mb-4 inline-flex gap-2" onSubmit={handleSubmit}>
      {/* Inicializamos el input para que contenga el valor actual de la query */}
      <input className="px-2" defaultValue={searchParams.get("q") || ""} name="query" />
      <button className="bg-white/20 p-2" type="submit">
        Search
      </button>
    </form>
  );
}
