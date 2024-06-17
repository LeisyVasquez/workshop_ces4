import { useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { validationWin } from '../utilities/validationWin';
import { addCardToDecks } from '../utilities/addCardToDeck';
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
	const [users, setUsers] = useState({
		deckId: '',
		attempts: 0,
		playerOne: {
			name: 'uno',
			cards: [],
			cardsWaste: [],
		},
		playerTwo: {
			name: 'dos',
			cards: [],
			cardsWaste: [],
		},
	});

	const startGame = async () => {
		try {
			// Crear una baraja
			const deckResponse = await axios.get(
				'https://deckofcardsapi.com/api/deck/new/shuffle',
			);
			const deckId = deckResponse.data.deck_id;

			setUsers(prevUsers => ({
				...prevUsers,
				deckId,
			}));

			// Arrastrar cartas primer jugador
			const cardsPlayerOne = await axios.get(
				`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`,
			);

			cardsPlayerOne.data.cards.sort(function (a, b) {
				if (a.value > b.value) return 1;
				if (a.value < b.value) return -1;
				return 0;
			});

			setUsers(prevUsers => ({
				...prevUsers,
				playerOne: {
					...prevUsers.playerOne,
					cards: cardsPlayerOne.data.cards,
				},
			}));

			// Arrastrar cartas segundo jugador
			const cardsPlayerTwo = await axios.get(
				`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`,
			);

			cardsPlayerTwo.data.cards.sort(function (a, b) {
				if (a.value > b.value) return 1;
				if (a.value < b.value) return -1;
				return 0;
			});

			setUsers(prevUsers => ({
				...prevUsers,
				playerTwo: {
					...prevUsers.playerTwo,
					cards: cardsPlayerTwo.data.cards,
				},
			}));
			const { cardsWastePlayerOne, cardsWastePlayerTwo } = validationWin(
				users.playerOne.name,
				users.playerTwo.name,
				cardsPlayerOne.data.cards,
				cardsPlayerTwo.data.cards,
			);

			// Guardar cartas sobrantes en el estado
			setUsers(prevUsers => ({
				...prevUsers,
				playerOne: {
					...prevUsers.playerOne,
					cardsWaste: cardsWastePlayerOne,
				},
				playerTwo: {
					...prevUsers.playerTwo,
					cardsWaste: cardsWastePlayerTwo,
				},
			}));
		} catch (error) {
			console.error('Error iniciando el juego:', error);
		}
	};

	const drawCards = async () => {
		if (users.attempts === 16) {
			Swal.fire({
				title: `Ya terminó el juego`,
				text: 'No hubo ningún ganador',
				icon: 'info',
			}).then(result => {
				window.location.href = '/';
			});
		}

		setUsers(prevUsers => ({
			...prevUsers,
			attempts: prevUsers.attempts + 1,
		}));
		// To-do: Cuando se acaben los intentos mostrar mensajes
		const newCards = await axios.get(
			`https://deckofcardsapi.com/api/deck/${users.deckId}/draw/?count=2`,
		);

		const {
			newCardsPlayerOne,
			cardsWasteAfterPlayerOne,
			newCardsPlayerTwo,
			cardsWasteAfterPlayerTwo,
		} = addCardToDecks(
			newCards.data.cards,
			users.playerOne.name,
			users.playerTwo.name,
			users.playerOne.cardsWaste,
			users.playerTwo.cardsWaste,
			users.playerOne.cards,
			users.playerTwo.cards,
		);

		setUsers(prevUsers => ({
			...prevUsers,
			playerOne: {
				...prevUsers.playerOne,
				cards: newCardsPlayerOne,
				cardsWaste: cardsWasteAfterPlayerOne,
			},
			playerTwo: {
				...prevUsers.playerTwo,
				cards: newCardsPlayerTwo,
				cardsWaste: cardsWasteAfterPlayerTwo,
			},
		}));
	};

	return (
		<UserContext.Provider
			value={{
				users,
				setUsers,
				startGame,
				drawCards,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
