import { BankAccount } from "src/app/models/bankAccount";
import { DataTransaction } from "src/app/models/dataTransaction";
import { EnumBankAccountType } from "src/app/models/enum/enumBankAccountType";
import { EnumSectionType } from "src/app/models/enum/enumSectionType";
import { Section } from "src/app/models/section";
import { UnderSection } from "../models/underSection";

export const TEST_DATAS : DataTransaction[] = [
    {
        id: 1,
        month: "Janvier",
        amount: 750,
        section: new Section("Habitat", EnumSectionType.Charge),
        underSection : new UnderSection("Loyer", new Section("Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 2,
        month: "Janvier",
        amount: 230,
        section: new Section("Habitat", EnumSectionType.Charge),
        underSection : new UnderSection("Électricité",  new Section("Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 3,
        month: "Janvier",
        amount: 120,
        section: new Section("Habitat", EnumSectionType.Charge),
        underSection : new UnderSection("Eau",  new Section("Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 4,
        month: "Janvier",
        amount: 12,
        section: new Section("Habitat", EnumSectionType.Charge),
        underSection : new UnderSection("Assurance Habitation",  new Section("Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    }
]