import { valueCards } from './constants';
import { validationWin } from './validationWin';

const addCardToPlayer = (cardsWasteBefore, cardsWasteAfter, newCard, cards) => {
	if (cardsWasteBefore.length + 1 !== cardsWasteAfter.length) {
		cards.push(newCard);
		const cardDelete = cardsWasteAfter.pop();
		const newCards = cards.filter(card => card.code !== cardDelete.code);
		return { newCards, cardsWasteAfter };
	} else {
		let isCoupleNumber = false;
		let indexCoupleNumber = 0;

		for (let i = 0; i < cardsWasteBefore.length; i++) {
			const card = cardsWasteBefore[i];
			if (card.value === newCard.value) {
				isCoupleNumber = true;
				indexCoupleNumber = i;
				break;
			}
		}

		if (isCoupleNumber) {
			const waste = cardsWasteBefore.filter(
				(_, index) => index !== indexCoupleNumber,
			);
			const cardDelete = waste.pop();
			waste.push(newCard, cardsWasteBefore[indexCoupleNumber]);
			const newCards = cards.filter(card => card.code !== cardDelete.code);
			newCards.push(newCard);
			return { newCards, cardsWasteAfter: waste };
		}

		let isCoupleLadder = false;
		let indexLadder = 0;

		for (let i = 0; i < cardsWasteBefore.length; i++) {
			const card = cardsWasteBefore[i];
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
			const waste = cardsWasteBefore.filter(
				(_, index) => index !== indexLadder,
			);
			const cardDelete = waste.pop();
			waste.push(newCard, cardsWasteBefore[indexLadder]);
			const newCards = cards.filter(card => card.code !== cardDelete.code);
			newCards.push(newCard);
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
	const {
		cardsWastePlayerOne: cardsAfterWastePlayerOne,
		cardsWastePlayerTwo: cardsAfterWastePlayerTwo,
	} = validationWin(
		namePlayerOne,
		namePlayerTwo,
		[...cardsPlayerOne, newCardPlayerOne],
		[...cardsPlayerTwo, newCardPlayerTwo],
	);

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
