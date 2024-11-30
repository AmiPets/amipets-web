import { api } from "@/lib/apiWrapper";

export async function fetchAdocoes(filters) {

    const adocoes = await api.get("adocoes");

    return adocoes.data;
}