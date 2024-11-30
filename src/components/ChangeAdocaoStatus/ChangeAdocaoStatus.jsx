
import { getLinkWithId } from "@/utils/getLinkWithId";
import { Button } from "../ui/button";
import { DialogDescription, DialogTitle, Dialog, DialogContent, DialogHeader, DialogTrigger, DialogFooter, DialogClose } from "../ui/dialog";
import { Input } from "../ui/input";
import { ControlledSelect } from "../ControlledSelect/ControlledSelect";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from 'prop-types';
import { updateAdocao } from "@/services/updateAdocao";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const adocaoSchema = z.object({
    status: z.coerce.string()
});

export function ChangeAdocaoStatus({ children, adocao, initialValues, onSubmit }) {

    const [open, setOpen] = useState(false);

    const { handleSubmit, control, formState, reset } = useForm({
        resolver: zodResolver(adocaoSchema),
        values: initialValues
    });

    const queryClient = useQueryClient();

    const { mutateAsync: submitChangeAdocaoStatusFn } = useMutation({
        mutationFn: onSubmit,
        onSuccess() {
            queryClient.invalidateQueries(['adocoes']);
            setOpen(false);
            reset()
        },
    });

    async function handleSubmitForm(data) {
        const newAdocao = { ...adocao };
        newAdocao.status = data.status;
        await submitChangeAdocaoStatusFn(newAdocao);
    }

    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent >
                {formState.errors.status && <h1>adiojasnidf</h1>}
                <DialogHeader>
                    <DialogTitle>Mudar status da adoção</DialogTitle>
                    <DialogDescription>Mude o status da adoção. Quanto tiver finalizado, clique em salvar.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit((data) => handleSubmitForm(data, adocao))}>
                    <div className="flex flex-col items-start flex-grow">
                        <label className="text-sm font-semibold mb-2">Pet</label>
                        <Input disabled placeholder={getLinkWithId(adocao.pet.nome, adocao.pet.id)} />
                    </div>

                    <div className="flex flex-col items-start flex-grow">
                        <label className="text-sm font-semibold mb-2">Adotante</label>
                        <Input disabled placeholder={getLinkWithId(adocao.adotante.nome, adocao.adotante.id)} />
                    </div>

                    <div className="flex flex-col items-start flex-grow">
                        <label className="text-sm font-semibold mb-2">Status</label>
                        <ControlledSelect
                            id="status"
                            control={control}
                            name="status"
                            options={["SOLICITACAO_ENVIADA", "EM_ANALISE", "APROVADO"]} />
                    </div>
                    <DialogFooter className="pt-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-primary-500 hover:bg-primary-400">Salvar</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog >
    </>

}

ChangeAdocaoStatus.propTypes = {
    children: PropTypes.any,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.any,
    adocao: PropTypes.object
}
