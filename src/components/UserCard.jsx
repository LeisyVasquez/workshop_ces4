import { Grid, TextField } from '@mui/material';
import './UserCard.css';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserCard = () => {
	const { setUsers } = useContext(UserContext);

	return (
		<div className='slide-container'>
			<Grid container spacing={20} columns={16}>
				<Grid item xs={8}>
					<div className='wrapper'>
						<div className='clash-card archer'>
							<div className='clash-card__image clash-card__image--archer'>
								<img
									src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer.png'
									alt='archer'
								/>
							</div>
							<div className='clash-card__unit-name'>Jugador 1</div>
							<div className='clash-card__unit-description'>
								<TextField
									id='outlined-basic'
									name='playerOne'
									placeholder='Ingrese nombre jugador 1'
									label='Jugador uno'
									variant='outlined'
									onChange={e =>
										setUsers(prevUsers => ({
											...prevUsers,
											playerOne: {
												...prevUsers.playerOne,
												name: e.target.value,
											},
										}))
									}
								/>
							</div>
						</div>
					</div>
				</Grid>
				<Grid item xs={8}>
					<div className='wrapper'>
						<div className='clash-card wizard'>
							<div className='clash-card__image clash-card__image--wizard'>
								<img
									src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard.png'
									alt='wizard'
								/>
							</div>
							<div className='clash-card__unit-name'>Jugador 2</div>
							<div className='clash-card__unit-description'>
								<TextField
									id='outlined-basic'
									name='playerTwo'
									label='Jugador dos'
									placeholder='Ingrese nombre jugador 2'
									variant='outlined'
									onChange={e =>
										setUsers(prevUsers => ({
											...prevUsers,
											playerTwo: {
												...prevUsers.playerTwo,
												name: e.target.value,
											},
										}))
									}
								/>
							</div>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default UserCard;
