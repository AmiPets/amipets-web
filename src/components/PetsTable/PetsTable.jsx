
import { useEffect, useState } from "react"
import { Combobox } from "../Combobox/Combobox"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table"
import { PencilIcon, PlusCircle, Search, SpeechIcon, Trash2 } from "lucide-react"
import { PopoverCheckboxGroup } from "../PopoverCheckboxGroup/PopoverCheckboxGroup"
import axios from "axios"

import { getFormattedPetStatus } from "../../utils/getFormattedPetStatus.js";
import { getFormattedDate } from "@/utils/getFormattedDate"
import { capitalize } from "@/utils/capitalize"
import { useForm } from "react-hook-form"


export function PetsTable() {

    const [inputId, setInputId] = useState("");
    const [inputName, setInputName] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            id: "",
            name: "",
            species: [],
            sizes: [],
            status: []
        }
    })

    const [pets, setPets] = useState([]);

    const species = ["Gato", "Cachorro", "Coelho"];
    const sizes = ["Pequeno", "Médio", "Grande"];
    const status = ["Livre", "Reservado", "Adotado"];

    const mapForFilters = {
        "Pequeno": "pequeno",
        "Médio": "médio",
        "Grande": "grande",
        "Livre": "0",
        "Reservado": "1",
        "Adotado": "2"
    }

    useEffect(() => {
        console.log(JSON.stringify(normalizeFilters(species)));
        const getPets = async () => {
            const pets = await axios.get("http://localhost:8000/api/pets", {
            })
            setPets(pets.data);
            console.log(pets.data);
        }
        getPets();
    }, []);

    function normalizeFilters(filterArray) {
        return filterArray.map((x) => {
            if (!mapForFilters[x]) {
                return x.toLowerCase();
            }
            else {
                return mapForFilters[x];
            }
        });
    }

    function searchPets(data) {

        console.log(data);

        // console.log("sasdasd:" + (!inputName ? "" : inputName));
        // console.log(normalizeFilters(selectedSpecies));
        // console.log(normalizeFilters(selectedSizes));
        // console.log(normalizeFilters(selectedStatus));

        // const getPets = async () => {
        //     const pets = await axios.get("http://localhost:8000/api/pets", {
        //         params: {
        //             ...(inputName !== "" && {
        //                 nome: inputName
        //             }),
        //             especie: JSON.stringify(normalizeFilters(selectedSpecies)),
        //             tamanho: JSON.stringify(normalizeFilters(selectedSizes)),
        //             status: JSON.stringify(normalizeFilters(selectedStatus))
        //         }
        //     })
        //     setPets(pets.data);
        //     console.log(pets.data);
        // }
        // getPets();

    }

    function handleCleanFilters() {
        setInputId("");
        setInputName("");
        setSelectedSpecies([]);
        setSelectedSizes([]);
        setSelectedStatus([]);
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-4">
            <div className="flex justify-between items-center mb-4">
                <form className="flex items-center gap-2" onSubmit={handleSubmit(searchPets)}>
                    <Input name="id" placeholder="ID do pet" {...register("id")}></Input>
                    <Input name="nome" placeholder="Nome do pet" {...register("name")}></Input>
                    <Combobox content={species} selectedValues={selectedSpecies} setSelectedValues={setSelectedSpecies}>
                        Espécie
                    </Combobox>
                    <PopoverCheckboxGroup options={status} control={control} name="status" >
                        Status
                    </PopoverCheckboxGroup>
                    <PopoverCheckboxGroup options={sizes} control={control} name="sizes" >
                        Tamanho
                    </PopoverCheckboxGroup>
                    <Button type="submit" variant="outline">
                        <Search />
                        Filtrar resultados
                    </Button>
                    <Button type="submit" variant="outline" onClick={handleCleanFilters}>

                        Limpar Filtros
                    </Button>
                </form>
            </div>
            <div className="border-t pt-2">
            </div>
            <div className="border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >ID</TableHead>
                            <TableHead>Foto</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Espécie</TableHead>
                            <TableHead >Data de Nascimento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tamanho</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            pets.map((pet) => {
                                return <TableRow key={pet.id}>
                                    <TableCell>{pet.id}</TableCell>
                                    <TableCell>
                                        <div className="w-20 h-20 rounded-3xl overflow-hidden flex justify-center items-center">
                                            <img src={pet.foto} alt={`foto de ${pet.nome}`} className="w-full h-full object-cover" />
                                        </div>
                                    </TableCell>
                                    <TableCell>{pet.nome}</TableCell>
                                    <TableCell>{capitalize(pet.especie)}</TableCell>
                                    <TableCell>{getFormattedDate(pet.dataNascimento)}</TableCell>
                                    <TableCell>{getFormattedPetStatus(pet.status)}</TableCell>
                                    <TableCell>{pet.tamanho ? capitalize(pet.tamanho) : "-"}</TableCell>
                                    <TableCell><PencilIcon className="w-4" /></TableCell>
                                    <TableCell><Trash2 className="w-4" /> </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <Button> <PlusCircle /> Cadastrar Pet</Button>
        </div>
    )
}