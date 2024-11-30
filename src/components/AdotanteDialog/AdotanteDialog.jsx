
import { Dialog, DialogTitle, DialogClose, DialogDescription, DialogHeader, DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import PropTypes from 'prop-types';
import { useState } from "react";
import { fetchAdotante } from "@/services/fetchAdotante";

export function AdotanteDialog({ children, adotanteId }) {



    fetchAdotante(adotanteId);


    return <>
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="">

                <DialogHeader>
                    <DialogTitle>{ }</DialogTitle>
                    <DialogDescription>{ }</DialogDescription>
                </DialogHeader>

                <DialogFooter className="pt-2">
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-primary-500 hover:bg-primary-400">Salvar</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog >
    </>
}