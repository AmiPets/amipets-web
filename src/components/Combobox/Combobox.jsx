
import { useState } from "react"
import { Button } from "../ui/button"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import PropTypes from 'prop-types';


export function Combobox({ content = [], selectedValues = [], setSelectedValues, children }) {

    const [isOpened, setIsOpened] = useState(false);

    const addValue = (value) => {

        const index = selectedValues.indexOf(value);

        // Se o valor ainda não está selecionado no ComboBox
        if (index === -1) {
            setSelectedValues((oldValues) => {
                const newValues = [...oldValues];
                newValues.push(value);
                console.log(newValues);
                return newValues;
            });
        }
        // Se o valor já está selecionado no ComboBox
        else {
            setSelectedValues((oldValues) => {
                const newValues = [...oldValues];
                newValues.splice(index, 1);
                console.log(newValues);
                return newValues;
            });
        }

    }


    return (

        <>
            <Popover open={isOpened} onOpenChange={setIsOpened}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={``}
                    >
                        {children}
                        {isOpened ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52">
                    <Command>
                        <CommandInput placeholder="Selecione espécie"></CommandInput>
                        <CommandList>
                            <CommandEmpty>Nenhum resultado.</CommandEmpty>
                            <CommandGroup heading="">
                                {
                                    content.map((menuValue, index) => {
                                        return <CommandItem
                                            key={index}
                                            value={menuValue}
                                            onSelect={(value) => addValue(value)}
                                            className={`flex justify-between`}
                                        >
                                            {menuValue}
                                            {selectedValues.includes(menuValue) && <Check />}
                                        </CommandItem>
                                    })
                                }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover >
        </>

    );

}

Combobox.propTypes = {
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedValues: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.string
}