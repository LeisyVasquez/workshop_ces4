import { Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const DrawCards = () => {
	const { drawCards, users } = useContext(UserContext);

	return (
		<Grid
			container
			direction='column'
			justifyContent='center'
			alignItems='center'
			sx={{ mt: 4 }}
		>
			<Grid item>
				<Button variant='contained' color='secondary'>
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
						onClick={drawCards}
					>
						{`Cartas ${users.attempts === 17 ? 16 : users.attempts}/16`}
					</Typography>
				</Button>
			</Grid>
		</Grid>
	);
};

export default DrawCards;
