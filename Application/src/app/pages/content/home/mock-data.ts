import { BankAccount } from "src/app/models/bankAccount";
import { DataTransaction } from "src/app/models/dataTransaction";
import { EnumBankAccountType } from "src/app/models/enum/enumBankAccountType";
import { EnumSectionType } from "src/app/models/enum/enumSectionType";
import { Section } from "src/app/models/section";

export const TEST_DATAS : DataTransaction[] = [
    {
        id: 1,
        month: "Janvier",
        amount: 750,
        section: new Section("Loyer" , [], EnumSectionType.Charge),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 2,
        month: "Janvier",
        amount: 230,
        section: new Section("Emprunt voiture" , [], EnumSectionType.Charge),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 3,
        month: "Février",
        amount: 120,
        section: new Section("Électricité" , [], EnumSectionType.Charge),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    },
    {
        id: 4,
        month: "Janvier",
        amount: 12,
        section: new Section("Spotify" , [], EnumSectionType.Charge),
        account: new BankAccount("CC", EnumBankAccountType.Courant),
    }
]