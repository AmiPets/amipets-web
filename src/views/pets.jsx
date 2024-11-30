import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import PetCard from "@/components/petCard";
import { api } from "@/lib/apiWrapper";
import { PetsFilters } from '@/components/PetsFilters/PetsFilters';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPets } from '@/services/fetchPets';

export default function PetGallery() {
  // const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchPets = async () => {
  //   try {
  //     const response = await api.get("pets");
  //     const data = response.data;

  //     if (Array.isArray(data)) {
  //       const formattedData = data.map((pet) => ({
  //         id: pet.id,
  //         nome: pet.nome,
  //         especie: pet.especie,
  //         dataNasc: pet.dataNascimento
  //           ? new Date(pet.dataNascimento).toLocaleDateString("pt-BR")
  //           : "N/A",
  //         tamanho: pet.tamanho || "N/A",
  //         personalidade: pet.personalidade?.join(", ") || "N/A",
  //         imagem: pet.foto || "https://via.placeholder.com/150",
  //       }));

  //       setPets(formattedData);
  //     } else {
  //       console.error("Resposta inesperada da API:", data);
  //     }

  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Erro ao buscar os pets:", error.message);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPets();
  // }, []);

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  let species = JSON.parse(searchParams.get('species'));
  let sizes = JSON.parse(searchParams.get('sizes'));
  let status = JSON.parse(searchParams.get('status'));

  const { data: pets } = useQuery({
    queryKey: ['pets', id, name, species, sizes, status],
    queryFn: () => fetchPets({
      id,
      name,
      species,
      sizes,
      status
    }),
  });


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto mt-8 px-4">
        <PetsFilters showStatus={false} />
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {pets &&
            pets.map((pet) => (
              <PetCard
                key={pet.id}
                id={pet.id}
                nome={pet.nome}
                especie={pet.especie}
                dataNasc={pet.dataNasc}
                tamanho={pet.tamanho}
                personalidade={pet.personalidade}
                imagem={pet.foto}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
