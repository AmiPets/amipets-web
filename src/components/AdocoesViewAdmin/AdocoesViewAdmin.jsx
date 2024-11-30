
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table"
import { Ellipsis, PencilIcon, PlusCircle, Search, Trash2 } from "lucide-react"
import { getFormattedPetStatus } from "../../utils/getFormattedPetStatus.js";
import { getStatusCode } from "../../utils/getStatusCode";
import { getFormattedDate } from "@/utils/getFormattedDate"
import { capitalize } from "@/utils/capitalize"
import { useForm } from "react-hook-form"
import axios from "axios"
import { DialogDescription } from "@radix-ui/react-dialog"
import { PetFormDialog } from "../PetFormDialog/PetFormDialog"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { fetchPets } from "@/services/fetchPets"
import { PetState } from "@/utils/PetState"
import { PetsFilters } from "../PetsFilters/PetsFilters"
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/apiWrapper";
import { sendPetToAPI } from "@/services/sendPetToAPI";
import { updatePet } from "@/services/updatePet";
import { PetsResume } from "../PetsResume/PetsResume";
import { getLinkWithId } from "@/utils/getLinkWithId";
import { fetchAdocoes } from "@/services/fetchAdocoes";
import { AdotanteDialog } from "../AdotanteDialog/AdotanteDialog";
import { ChangeAdocaoStatus } from "../ChangeAdocaoStatus/ChangeAdocaoStatus";
import { updateAdocao } from "@/services/updateAdocao";

export function AdocoesViewAdmin() {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const name = searchParams.get('name');
    let species = JSON.parse(searchParams.get('species'));
    let sizes = JSON.parse(searchParams.get('sizes'));
    let status = JSON.parse(searchParams.get('status'));

    const navigate = useNavigate();

    const handleNavigateToPets = (id) => {
        navigate(`/admin/pets?id=${id}`);
    }

    const { data: adocoes } = useQuery({
        queryKey: ['adocoes'],
        queryFn: () => fetchAdocoes(),
    });

    async function handleSubmitForm(data) {
        try {
            await updateAdocao(data);
            alert('Adoção editada com sucesso');
        }
        catch (err) {
            console.log(err);
            alert(err);
            alert('Erro ao editar adoção');
        }
    }

    return (

        <div className="w-full p-10 flex flex-col">

            <h1 className="text-3xl font-bold mb-4">Adoções</h1>

            <div className="flex justify-between space-x-10">
                <div className="flex flex-col flex-grow space-y-4">

                    <div className="border rounded-lg p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Foto do pet</TableHead>
                                    <TableHead>Pet</TableHead>
                                    <TableHead>Adotante</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Data da adoção</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {
                                    adocoes && adocoes.map((adocao) => {
                                        return <TableRow key={adocao.pet.id}>
                                            <TableCell>
                                                <div className="w-20 h-20 rounded-3xl overflow-hidden flex justify-center items-center">
                                                    <img src={adocao.pet.foto} alt={`foto de ${adocao.pet.nome}`} className="w-full h-full object-cover" />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button type="button" variant="link" onClick={() => handleNavigateToPets(adocao.pet.id)} >
                                                    {getLinkWithId(adocao.pet.nome, adocao.pet.id)}
                                                </Button>
                                            </TableCell>
                                            <TableCell>

                                                <AdotanteDialog adotanteId={adocao.adotante.id}>
                                                    <Button type="button" variant="link" >
                                                        {getLinkWithId(adocao.adotante.nome, adocao.adotante.id)}
                                                    </Button>
                                                </AdotanteDialog>

                                            </TableCell>
                                            <TableCell>{capitalize(adocao.status)}</TableCell>
                                            <TableCell>{(adocao.dataAdocao)}</TableCell>
                                            <TableCell>
                                                {getFormattedPetStatus(adocao.pet.status)}
                                            </TableCell>
                                            <TableCell>{capitalize(adocao.pet.tamanho)}</TableCell>
                                            <TableCell>
                                                <ChangeAdocaoStatus
                                                    adocao={adocao}
                                                    onSubmit={handleSubmitForm}
                                                    initialValues={{
                                                        status: adocao.status
                                                    }}
                                                >
                                                    <Button type="button" variant="ghost"><PencilIcon className="w-4" /></Button>
                                                </ChangeAdocaoStatus>

                                                {/* <PetFormDialog
                                                    key={pet.id}
                                                    description={"Edite as informações do pet no sistema. Clique em salvar quando tiver finalizado."}
                                                    title={"Editar pet"}
                                                    onSubmit={editPet}
                                                    initialValues={{
                                                        id: pet.id,
                                                        name: pet.nome,
                                                        specie: pet.especie,
                                                        birthDate: getFormattedDate(pet.dataNascimento),
                                                        size: capitalize(pet.tamanho),
                                                        description: pet.descricao,
                                                        status: getFormattedPetStatus(pet.status),
                                                        personalities: pet.personalidade && pet.personalidade.map((x) => { return { value: x } })
                                                    }}
                                                >
                                                </PetFormDialog> */}

                                            </TableCell>
                                            <TableCell>
                                                <Trash2 className="w-4" />
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>

        </div>

    )
}