import { Box, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Deck = () => {
	const { users } = useContext(UserContext);

	return (
		<>
			<Box
				sx={{
					backgroundColor: 'white',
					padding: 2,
					mt: 3,
					borderRadius: 2,
					width: '95%',
					maxWidth: '95%',
					marginLeft: 'auto',
					marginRight: 'auto',
					flexGrow: 1,
					textAlign: 'center',
				}}
			>
				<Typography
					variant='h6'
					noWrap
					sx={{
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					{`Jugador ${users.playerOne.name}`}
				</Typography>
				<Typography>Cartas obtenidas</Typography>
				<Grid
					container
					spacing={{ xs: 2, md: 1 }}
					maxWidth='100%'
					justifyContent='center'
					alignItems='center'
				>
					{users.playerOne.cards.map((card, index) => (
						<Grid item xs={2} sm={4} md={1} key={index}>
							<img srcSet={card.image} width='100%' />
						</Grid>
					))}
				</Grid>
			</Box>
			<Box
				sx={{
					backgroundColor: 'white',
					padding: 2,
					mt: 3,
					borderRadius: 2,
					width: '95%',
					maxWidth: '95%',
					marginLeft: 'auto',
					marginRight: 'auto',
					flexGrow: 1,
					textAlign: 'center',
				}}
			>
				<Typography
					variant='h6'
					noWrap
					sx={{
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					{`Jugador ${users.playerTwo.name}`}
				</Typography>
				<Typography>Cartas obtenidas</Typography>
				<Grid
					container
					spacing={{ xs: 2, md: 1 }}
					maxWidth={'100%'}
					justifyContent='center'
					alignItems='center'
				>
					{users.playerTwo.cards.map((card, index) => (
						<Grid item xs={2} sm={4} md={1} key={index}>
							<img srcSet={card.image} width='100%' />
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default Deck;
