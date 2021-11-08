import { EnumSectionType } from "src/app/models/enum/enumSectionType";
import { Section } from "src/app/models/section";

export const TEST_SECTION : Section[] = [
    {
        name: "Salaire",
        type: EnumSectionType.Revenu,
    },
    {
        name: "Autres",
        type: EnumSectionType.Revenu,
    },
    {
        name: "Habitat",
        type: EnumSectionType.Charge,
    },
    {
        name: "Services",
        type: EnumSectionType.Charge,
    },
    {
        name: "Impôts",
        type: EnumSectionType.Charge,
    },
    {
        name: "Santé",
        type: EnumSectionType.Charge,
    },
    {
        name: "Vie courante",
        type: EnumSectionType.Charge,
    },
    {
        name: "Transport",
        type: EnumSectionType.Charge,
    },
    {
        name: "Imprévu",
        type: EnumSectionType.Provision,
    },
    {
        name: "Prévu",
        type: EnumSectionType.Provision,
    },
    {
        name: "Autres",
        type: EnumSectionType.Provision,
    }
]