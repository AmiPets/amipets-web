
import { api } from "@/lib/apiWrapper";

export async function updateAdocao(adocao) {

    console.log("mooiiir");
    console.log(adocao);

    const params = {};

    if (adocao.status) {
        console.log(adocao.status);
    }

    console.log('FIZ UM PUT 2');
    
    await api.put(`adocao/${adocao.id}`, adocao);

    console.log('FIZ UM PUT');

    // if (adocao.name) {
    //     params.nome = adocao.name;
    // }

    // if (adocao.description) {
    //     params.descricao = adocao.description;
    // }

    // if (adocao.birthDate) {
    //     params.dataNascimentoa = adocao.birthDate;
    // }

    // if (adocao.specie) {
    //     params.especie = adocao.specie;
    // }

    // if (adocao.size) {
    //     params.tamanho = adocao.size;
    // }

    // if (adocao.status) {
    //     params.status = adocao.status;
    // }

    // if (adocao.personalities && adocao.personalities.length > 0) {
    //     params.personalidade = adocao.personalities;
    // }

    // console.log(params);

}