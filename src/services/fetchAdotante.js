import { api } from "@/lib/apiWrapper";

export async function fetchAdotante(id) {

    const adotante = await api.get(`adotante/${id}`);

    console.log(adotante.data);

    return adotante.data;
}