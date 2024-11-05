export type Card = {
	name: string
	transactionBonuses: TransactionBonuses
	centsPerPoint: number
	redemtionModifier: number
}

export type TransactionBonuses = Record<string, number>
