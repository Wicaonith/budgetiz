import { EnumSectionType } from "src/app/models/enum/enumSectionType";
import { Section } from "../models/section.model";
import { Undersection } from "../models/undersection";

export const TEST_UNDERSECTION: Undersection[] = [
    {
        id: 1,
        name: "Salaire",
        section: new Section(1, "Salaire", EnumSectionType.Revenu),
        inTab: true,
    },
    {
        id: 2,
        name: "Remboursement",
        section: new Section(1, "Salaire", EnumSectionType.Revenu),
        inTab: true,
    },
    {
        id: 3,
        name: "Loyer",
        section: new Section(1, "Salaire", EnumSectionType.Revenu),
        inTab: true,
    },
    {
        id: 4,
        name: "Loyer",
        section: new Section(2, "Habitat", EnumSectionType.Charge),
        inTab: true
    },
    {
        id: 5,
        name: "Electricité",
        section: new Section(2, "Habitat", EnumSectionType.Charge),
        inTab: true,
    }
]