import { valueCards } from './constants';
import { validationWin } from './validationWin';

const addCardToPlayer = (cardsWasteBefore, cardsWasteAfter, newCard, cards) => {
	console.log(
		'Longitud 1',
		cardsWasteBefore.length,
		'Longitud 2',
		cardsWasteAfter.length,
	);
	if (cardsWasteBefore.length + 1 !== cardsWasteAfter.length) {
		console.log('Holi 1');
		cards.push(newCard);
		const cardDelete = cardsWasteAfter.pop();
		const newCards = cards.filter(card => card.code !== cardDelete.code);
		return { newCards, cardsWasteAfter };
	} else {
		console.log('Voy a buscar pares');
		let isCoupleNumber = false;
		let indexCoupleNumber = 0;

		for (let i = 0; i < cardsWasteBefore.length; i++) {
			const card = cardsWasteBefore[i];
			if (card.value === newCard.value) {
				console.log('Condición 1');
				isCoupleNumber = true;
				indexCoupleNumber = i;
				break;
			}
		}

		if (isCoupleNumber) {
			console.log('Condición 2');
			const waste = cardsWasteBefore.filter(
				(_, index) => index !== indexCoupleNumber,
			);
			console.log(waste);
			const cardDelete = waste.pop();
			console.log(waste);
			console.log(cardDelete);
			waste.push(newCard, cardsWasteBefore[indexCoupleNumber]);
			console.log(waste);
			const newCards = cards.filter(card => card.code !== cardDelete.code);
			newCards.push(newCard);
			console.log(newCards);
			return { newCards, cardsWasteAfter: waste };
		}

		let isCoupleLadder = false;
		let indexLadder = 0;

		console.log('sobrantes', cardsWasteBefore);
		for (let i = 0; i < cardsWasteBefore.length; i++) {
			const card = cardsWasteBefore[i];
			console.log(card.suit);
			console.log(newCard.suit);
			console.log(card.suit === newCard.suit);
			console.log(valueCards[newCard.value] + 1);
			console.log(card.value);
			console.log(valueCards[newCard.value] - 1);

			if (
				card.suit === newCard.suit &&
				(valueCards[newCard.value] + 1 === card.value ||
					valueCards[newCard.value] - 1 === card.value)
			) {
				isCoupleLadder = true;
				indexLadder = i;
				break;
			}
		}

		if (isCoupleLadder) {
			console.log('Sirvo para par de escalera');
			const waste = cardsWasteBefore.filter(
				(_, index) => index !== indexLadder,
			);
			console.log(waste);
			const cardDelete = waste.pop();
			console.log(waste);
			console.log(cardDelete);

			waste.push(newCard, cardsWasteBefore[indexLadder]);
			console.log(waste);

			const newCards = cards.filter(card => card.code !== cardDelete.code);
			newCards.push(newCard);
			console.log(newCards);

			return { newCards, cardsWasteAfter: waste };
		}
	}
	return {
		newCards: cards,
		cardsWasteAfter: cardsWasteBefore,
	};
};

export const addCardToDecks = (
	newCards,
	namePlayerOne,
	namePlayerTwo,
	cardsWastePlayerOne,
	cardsWastePlayerTwo,
	cardsPlayerOne,
	cardsPlayerTwo,
) => {
	const newCardPlayerOne = newCards[0];
	const newCardPlayerTwo = newCards[1];
	console.log('Nuevas cartas', newCardPlayerOne, newCardPlayerTwo);
	const {
		cardsWastePlayerOne: cardsAfterWastePlayerOne,
		cardsWastePlayerTwo: cardsAfterWastePlayerTwo,
	} = validationWin(
		namePlayerOne,
		namePlayerTwo,
		[...cardsPlayerOne, newCardPlayerOne],
		[...cardsPlayerTwo, newCardPlayerTwo],
	);
	console.log('1', cardsAfterWastePlayerOne);
	console.log('2', cardsAfterWastePlayerTwo);

	const {
		newCards: newCardsPlayerOne,
		cardsWasteAfter: cardsWasteAfterPlayerOne,
	} = addCardToPlayer(
		cardsWastePlayerOne,
		cardsAfterWastePlayerOne,
		newCardPlayerOne,
		cardsPlayerOne,
	);

	const {
		newCards: newCardsPlayerTwo,
		cardsWasteAfter: cardsWasteAfterPlayerTwo,
	} = addCardToPlayer(
		cardsWastePlayerTwo,
		cardsAfterWastePlayerTwo,
		newCardPlayerTwo,
		cardsPlayerTwo,
	);

	return {
		newCardsPlayerOne,
		cardsWasteAfterPlayerOne,
		newCardsPlayerTwo,
		cardsWasteAfterPlayerTwo,
	};
};
