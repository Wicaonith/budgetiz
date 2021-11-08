import { BankAccount } from "../models/bankAccount";
import { EnumBankAccountType } from "../models/enum/enumBankAccountType";

export const TEST_BANKACCOUNT : BankAccount[] = [
    {
        name: "Compte Courant",
        type: EnumBankAccountType.Courant,
    },
    {
        name: "Livret A",
        type: EnumBankAccountType.Epargne,
    }
]