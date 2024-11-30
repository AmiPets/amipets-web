import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PetCard from '@/components/petCard';
import { api } from '@/lib/apiWrapper';
import { useQuery } from '@tanstack/react-query';
import { fetchPets } from '@/services/fetchPets';
import { PetsFilters } from '@/components/PetsFilters/PetsFilters';
import { useSearchParams } from 'react-router-dom';

export default function PetGallery() {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);
  const [searchParams] = useSearchParams();

  // Parâmetros da URL para filtros
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  let species = JSON.parse(searchParams.get('species') || '[]');
  let sizes = JSON.parse(searchParams.get('sizes') || '[]');
  let status = JSON.parse(searchParams.get('status') || '[]');

  // Fetching de dados usando React Query
  const { data: queryPets, isFetching } = useQuery({
    queryKey: ['pets', id, name, species, sizes, status],
    queryFn: () =>
      fetchPets({
        id,
        name,
        species,
        sizes,
        status,
      }),
    enabled: !!(id || name || species.length || sizes.length || status.length), // Somente executa caso existam filtros
  });

  // Fetch de dados padrão quando não há filtros
  const fetchPetsWithoutFilters = async () => {
    setLoading(true);
    try {
      const response = await api.get('pets');
      const data = response.data;

      if (Array.isArray(data)) {
        const formattedData = data.map((pet) => ({
          id: pet.id,
          nome: pet.nome,
          especie: pet.especie,
          dataNasc: pet.dataNascimento
            ? new Date(pet.dataNascimento).toLocaleDateString('pt-BR')
            : 'N/A',
          tamanho: pet.tamanho || 'N/A',
          personalidade: pet.personalidade?.join(', ') || 'N/A',
          imagem: pet.foto || 'https://via.placeholder.com/150',
        }));
        setPets(formattedData);
      } else {
        console.error('Resposta inesperada da API:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar os pets:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Decidir entre dados filtrados ou padrão
  useEffect(() => {
    if (isFetching) {
      setLoading(true);
    } else if (queryPets) {
      setPets(queryPets);
      setLoading(false);
    } else {
      fetchPetsWithoutFilters();
    }
  }, [queryPets, isFetching]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Filtros */}
      <div className="container mx-auto mt-8 px-4">
        <PetsFilters showStatus={false} />
      </div>

      {/* Lista de Pets */}
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-gray-700">Carregando...</p>
          ) : pets.length > 0 ? (
            pets.map((pet) => (
              <PetCard
                key={pet.id}
                id={pet.id}
                nome={pet.nome}
                especie={pet.especie}
                dataNasc={pet.dataNasc}
                tamanho={pet.tamanho}
                personalidade={pet.personalidade}
                imagem={pet.imagem}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700">
              Nenhum pet encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
