import { Button, Grid } from '@mui/material';
import UserCard from '../components/UserCard';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
	const { startGame } = useContext(UserContext);

	return (
		<>
			<UserCard />
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				<Grid item>
					<Button
						component={Link}
						to='/play'
						variant='contained'
						color='secondary'
						onClick={startGame}
					>
						Iniciar partida
					</Button>
				</Grid>
			</Grid>
		</>
	);
}

export default Login;
