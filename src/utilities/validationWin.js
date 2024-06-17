import Swal from 'sweetalert2';
import { valueCards } from './constants';
const winPlayer = namePlayer => {
	Swal.fire({
		title: `¡Que buena suerte jugador ${namePlayer}!`,
		text: 'Ganaste la partida',
		icon: 'success',
	}).then(result => {
		window.location.href = '/';
	});
};

// Le paso las cartas que tenemos, y le paso si quiero buscar ternas o cuartas,
// y además cuántas ternas quiero que me busque
const getResultLadder = (cards, delta, n) => {
	let a = 0;
	let b = delta - 1;
	const waste = [];
	let result = 0;
	while (b < cards.length && result < n) {
		if (cards[b].value - cards[a].value === delta - 1) {
			a += delta;
			b += delta;
			result++;
		} else {
			waste.push(cards[a]);
			a++;
			b++;
		}
		if (b >= cards.length || result >= n) {
			waste.push(...cards.slice(a, cards.length));
		}
	}
	return { waste, quantity: (cards.length - waste.length) / delta };
};

const getResultOfNumbers = cards => {
	// Agrupar las cartas según número
	const groupCardsByNumber = Object.groupBy(cards, ({ value }) => value);
	const cardsWaste = [];
	const result = {
		terna: 0,
		cuarta: 0,
	};

	for (const group in groupCardsByNumber) {
		// Flag para controlar si se tuvo en cuenta el
		// grupo de cartas para el resultado final.
		let isCountGroup = false;

		// Contenido del grupo
		const value = groupCardsByNumber[group];

		// Si hay una o varias cuartas, sume la primera cuarta al resultado
		if (value.length === 4 && result.cuarta === 0) {
			result.cuarta++;
			// Indica que ese grupo de cartas ya está incluido en el resultado final
			isCountGroup = true;
		}

		// Si hay una terna
		if (value.length === 3) {
			// Sume la terna al resultado final
			result.terna++;
			// Indique que el grupo ya está incluido en el resultado final
			isCountGroup = true;
		}

		// Si hay una segunda cuarta
		if (value.length === 4 && !isCountGroup) {
			result.terna++;
			isCountGroup = true;
			// Sacar la carta sobrante de la cuarta y añadirla a un array
			// de sobrantes
			cardsWaste.push(value.pop());
		}

		// En caso de que no "sirva" ese grupo de cartas añadirlo a
		// un array de sobrantes
		if (!isCountGroup) cardsWaste.push(...value);
	}

	return { cardsWaste, result };
};

const getResultOfSuit = (cards, beforeResult) => {
	// Agrupar las cartas según suit
	const groupCardsBySuit = Object.groupBy(cards, ({ suit }) => suit);
	const cardsWaste = [];

	for (const group in groupCardsBySuit) {
		// Contenido del grupo
		let cardsBySuit = groupCardsBySuit[group];
		cardsBySuit = cardsBySuit.map(card => ({
			...card,
			value: valueCards[card.value],
		}));
		cardsBySuit.sort((a, b) => a.value - b.value);

		if (cardsBySuit.length < 3) {
			cardsWaste.push(...cardsBySuit);
		} else {
			if (beforeResult.cuarta) {
				// Cuente las ternas, sumar al resultado final y añada sobrantes
				const { waste, quantity } = getResultLadder(
					cardsBySuit,
					3,
					2 - beforeResult.terna,
				);
				beforeResult.terna = beforeResult.terna + quantity;
				cardsWaste.push(...waste);
			} else {
				// Busque si hay una cuarta, y sumar al resultado final
				let wasteGeneral = cardsBySuit;
				if (cardsBySuit.length >= 4) {
					const { waste: wasteFourth, quantity: quantityFourth } =
						getResultLadder(cardsBySuit, 4, 1);
					wasteGeneral = wasteFourth;
					beforeResult.cuarta = beforeResult.cuarta + quantityFourth;
				}

				if (cardsBySuit.length >= 3) {
					// Busque las ternas necesarias y sume al resultado final
					const { waste: wasteThird, quantity: quantityThird } =
						getResultLadder(wasteGeneral, 3, 2 - beforeResult.terna);
					beforeResult.terna = beforeResult.terna + quantityThird;
					cardsWaste.push(...wasteThird);
				}
			}
		}
	}

	return { cardsWaste, result: beforeResult };
};

export const validationWin = (
	namePlayerOne,
	namePlayerTwo,
	cardsPlayerOne,
	cardsPlayerTwo,
) => {
	/**
	 * Revisar ternas y cuartas sin escaleras
	 */
	const { result: resultOfNumPlayerOne, cardsWaste: cardsWasteOfNumPlayerOne } =
		getResultOfNumbers(cardsPlayerOne);

	const { result: resultOfNumPlayerTwo, cardsWaste: cardsWasteOfNumPlayerTwo } =
		getResultOfNumbers(cardsPlayerTwo);

	// Verificar si ganaron los dos
	if (
		resultOfNumPlayerOne.terna === 2 &&
		resultOfNumPlayerOne.cuarta === 1 &&
		resultOfNumPlayerTwo.terna === 2 &&
		resultOfNumPlayerTwo.cuarta === 1
	) {
		winPlayer(`${namePlayerOne} y ${namePlayerTwo}`);
		return;
	}

	// Verificar si ganó jugador 1
	if (resultOfNumPlayerOne.terna === 2 && resultOfNumPlayerOne.cuarta === 1)
		winPlayer(namePlayerOne);

	// Verificar si ganó jugador 2
	if (resultOfNumPlayerTwo.terna === 2 && resultOfNumPlayerTwo.cuarta === 1)
		winPlayer(namePlayerTwo);

	/**
	 * En caso de que ya no se haya ganado, verificar escaleras
	 */

	const { result: resultPlayerOne, cardsWaste: cardsWastePlayerOne } =
		getResultOfSuit(cardsWasteOfNumPlayerOne, resultOfNumPlayerOne);

	const { result: resultPlayerTwo, cardsWaste: cardsWastePlayerTwo } =
		getResultOfSuit(cardsWasteOfNumPlayerTwo, resultOfNumPlayerTwo);

	// Verificar si ganaron los dos
	if (
		resultPlayerOne.terna === 2 &&
		resultPlayerOne.cuarta === 1 &&
		resultPlayerTwo.terna === 2 &&
		resultPlayerTwo.cuarta === 1
	) {
		winPlayer(`${namePlayerOne} y ${namePlayerTwo}`);
		return;
	}

	// Verificar si ganó jugador 1
	if (resultPlayerOne.terna === 2 && resultPlayerOne.cuarta === 1)
		winPlayer(namePlayerOne);

	// Verificar si ganó jugador 2
	if (resultPlayerTwo.terna === 2 && resultPlayerTwo.cuarta === 1)
		winPlayer(namePlayerTwo);

	/**
	 * En caso de que ningún jugador ganó la partida
	 */
	return {
		cardsWastePlayerOne,
		cardsWastePlayerTwo,
	};
};
