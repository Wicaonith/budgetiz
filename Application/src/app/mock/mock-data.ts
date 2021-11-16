import { BankAccount } from "src/app/models/bankAccount";
import { DataTransaction } from "src/app/models/dataTransaction";
import { EnumBankAccountType } from "src/app/models/enum/enumBankAccountType";
import { EnumSectionType } from "src/app/models/enum/enumSectionType";
import { Section } from "src/app/models/section.model";
import { Undersection } from "../models/undersection";

export const TEST_DATAS: DataTransaction[] = [
    {
        id: 1,
        month: "Janvier",
        amount: 750,
        section: new Section(1, "Habitat", EnumSectionType.Charge),
        undersection: new Undersection(1, "Loyer", new Section(1, "Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 2,
        month: "Janvier",
        amount: 230,
        section: new Section(1, "Habitat", EnumSectionType.Charge),
        undersection: new Undersection(2, "Électricité", new Section(1, "Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 3,
        month: "Janvier",
        amount: 120,
        section: new Section(1, "Habitat", EnumSectionType.Charge),
        undersection: new Undersection(3, "Eau", new Section(1, "Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 4,
        month: "Janvier",
        amount: 12,
        section: new Section(1, "Habitat", EnumSectionType.Charge),
        undersection: new Undersection(4, "Assurance Habitation", new Section(1, "Habitat", EnumSectionType.Charge), true),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    }
]