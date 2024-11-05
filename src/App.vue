<script setup lang="ts">
import { reactive } from "vue";
import { NForm, NFormItem, NInput, NInputNumber, NButton, NSpace } from "naive-ui";
import type { Card, TransactionBonuses } from "@/store/types";

type TransactionBonusData = {
	interfaceId: string
	type: string
	value: number
};

const cardDefaults: Card = {
	name: "",
	transactionBonuses: {},
	centsPerPoint: 1,
	redemtionModifier: 1
};
const cardInput = reactive<Card>({ ...cardDefaults });
const transactionBonusData = reactive<TransactionBonusData[]>([]);

const generateUID = () => {
	const firstPart = (Math.random() * 46656) | 0;
	const secondPart = (Math.random() * 46656) | 0;
	return [firstPart, secondPart].map((x) => x.toString(36).slice(-3)).join("");
};

const addTransactionBonus = () => {
	transactionBonusData.push({
		interfaceId: generateUID(),
		type: "",
		value: 1
	});
};

const mapToStoreData = (bonusData: TransactionBonusData[]): TransactionBonuses => {
	const asStore: TransactionBonuses = {};
	bonusData
		.filter(({ type }) => !!type)
		.forEach((data) => asStore[data.type] = data.value);
	return asStore;
};

const remove = (interfaceId: string) => {
	const index = transactionBonusData.findIndex((data) => data.interfaceId === interfaceId);
	transactionBonusData.splice(index, 1);
};

const submit = () => {
	const storeData = mapToStoreData(transactionBonusData);
	cardInput.transactionBonuses = Object.assign({}, { ...storeData });
};
</script>

<template>
	<n-form :model="cardInput">
		<n-form-item label="Card Name" path="name">
			<n-input v-model:value="cardInput.name" />
		</n-form-item>
		<n-space v-for="data in transactionBonusData" :key="data.interfaceId">
			<n-form-item>
				<n-input v-model:value="data.type" />
			</n-form-item>
			<n-form-item>
				<n-input-number v-model:value="data.value" />
			</n-form-item>
			<n-button @click="remove(data.interfaceId)" />
		</n-space>
		<n-button @click="addTransactionBonus" type="tertiary">
			Add Transaction Bonus
		</n-button>
		<n-button @click="submit" type="primary">
			Add Card
		</n-button>
	</n-form>
</template>
