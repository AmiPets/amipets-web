import { api } from "@/lib/apiWrapper";

export async function fetchPets(filters) {

    const adocoes = await api.get("adocoes");

    return adocoes.data;
}