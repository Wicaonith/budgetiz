import { EnumSectionType } from "src/app/models/enum/enumSectionType";
import { Section } from "src/app/models/section";

export const TEST_SECTION : Section[] = [
    {
        id: 1,
        name: "Salaire",
        type: EnumSectionType.Revenu,
    },
    {
        id: 2,
        name: "Autres",
        type: EnumSectionType.Revenu,
    },
    {
        id: 3,
        name: "Habitat",
        type: EnumSectionType.Charge,
    },
    {
        id: 4,
        name: "Services",
        type: EnumSectionType.Charge,
    },
    {
        id: 5,
        name: "Impôts",
        type: EnumSectionType.Charge,
    },
    {
        id: 6,
        name: "Santé",
        type: EnumSectionType.Charge,
    },
    {
        id: 7,
        name: "Vie courante",
        type: EnumSectionType.Charge,
    },
    {
        id: 8,
        name: "Transport",
        type: EnumSectionType.Charge,
    },
    {
        id: 9,
        name: "Imprévu",
        type: EnumSectionType.Provision,
    },
    {
        id: 10,
        name: "Prévu",
        type: EnumSectionType.Provision,
    },
    {
        id: 11,
        name: "Autres",
        type: EnumSectionType.Provision,
    }
]