import { api } from "@/lib/apiWrapper";

export async function fetchPets(filters) {

    const params = {};

    if (filters.id) {
        params.id = filters.id;
    }

    if (filters.name) {
        params.nome = filters.name;
    }

    if (filters.species && filters.species.length > 0) {
        params.especie = JSON.stringify(filters.species);
    }

    if (filters.sizes && filters.sizes.length > 0) {
        params.tamanho = JSON.stringify(filters.sizes);
    }

    if (filters.status && filters.status.length > 0) {
        params.status = JSON.stringify(filters.status);
    }

    console.log(params);

    const pets = await api.get("pets", {
        params: params
    });
    console.log(pets.data);
    return pets.data;
}