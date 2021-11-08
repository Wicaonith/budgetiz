import { EnumSectionType } from "src/app/models/enum/enumSectionType";
import { Section } from "../models/section";
import { UnderSection } from "../models/underSection";

export const TEST_UNDERSECTION: UnderSection[] = [
    {
        name: "Salaire",
        section: new Section("Salaire", EnumSectionType.Revenu),
        inTab: true,
    },
    {
        name: "Remboursement",
        section: new Section("Salaire", EnumSectionType.Revenu),
        inTab: true,
    },
    {
        name: "Loyer",
        section: new Section("Salaire", EnumSectionType.Revenu),
        inTab: true,
    },
    {
        name: "Loyer",
        section: new Section("Habitat", EnumSectionType.Charge),
        inTab: true
    },
    {
        name: "Electricité",
        section: new Section("Habitat", EnumSectionType.Charge),
        inTab: true,
    }
]