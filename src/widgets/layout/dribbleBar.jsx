import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import MyContext from '../../context/MyContext';

// const components = {
//   about: About,
//   insider: InsiderAccess,
//   exclusive: ExclusiveDrops,
//   community: Community,
//   signUp: SignUp,
// };

const content = {
	'about': [
		'Welcome to DSTRKT',
		'The new age streetwear marketplace.',
		'',
		'Step into DSTRKT where the latest streetwear drops',
		'become your quest, and each purchase is a triumph.',
		'',
		'We are transforming how you shop.',
	],
	'exclusive drops': [`
    Say goodbye to missing out on limited-edition releases. We curate a
    carefully selected range of the most coveted streetwear drops, ensuring
    you stay ahead of the game.
  `],
	'insider access': [`
    Gain access to insider news, brand collaborations, and exclusive releases.
    We’ve built strong relationships with top streetwear brands to bring you
    insider perks and opportunities you won’t find anywhere else.
  `],
	'community': [`
    Connect with a passionate community of like-minded individuals who
    share your love for streetwear
  `],
}

let prevDribble = null;

function DribbleBar({ tab }) {
	const { openDribble, updateDribble } = useContext(MyContext);

	const handleClose = () => {
		prevDribble = openDribble;
		updateDribble(null);
	}
	return (
		<div className={`relative z-[10000] h-screen w-full bg-[#C9F24F] p-10 transition duration-1000 ease-in-out ${openDribble ? '-translate-y-[100vh]' : ''}`}>
			<button className="absolute right-8 uppercase text-black hidden md:block" onClick={handleClose}>
				close
			</button>
			<section className="flex h-full flex-col items-center justify-center px-10 lg:py-32 xl:px-52">
				{(openDribble || prevDribble) && content[openDribble || prevDribble].map((text, index) => (
					<div key={index} className='min-h-[1em] text-center text-[1rem] sm:text-[1.5rem] lg:text-[2rem]'>
						{text}
					</div>
				))}
				<button className="sm:block md:hidden" onClick={handleClose}>
					<div className='uppercase text-center mt-16 text-[1rem] sm:text-[1.5rem] lg:text-[2rem]'>
						Back to Menu
					</div>
				</button>
			</section>
		</div>
	);
}
// function Community() {
//   return (
//     <Typography variant="h3">
//       CLOSE Connect with a passionate community of like-minded individuals who
//       share your love for streetwear
//     </Typography>
//   );
// }
// function InsiderAccess() {
//   return (
//     <Typography variant="h3">
//       Gain access to insider news, brand collaborations, and exclusive releases.
//       We’ve built strong relationships with top streetwear brands to bring you
//       insider perks and opportunities you won’t find anywhere else.
//     </Typography>
//   );
// }

// function ExclusiveDrops() {
//   return (
//     <Typography variant="h3">
//       Say goodbye to missing out on limited-edition releases. We curate a
//       carefully selected range of the most coveted streetwear drops, ensuring
//       you stay ahead of the game.
//     </Typography>
//   );
// }
// function About() {
//   return (
//     <Typography variant="h3">
//       Welcome to DSTRKT The new age streetwear marketplace. Step into DSTRKT
//       where the latest streetwear drops become your quest, and each purchase is
//       a triumph. We are transforming how you shop.
//     </Typography>
//   );
// }
// function SignUp() {
//   return <></>;
// }

// DribbleBar.propTypes = {
//   tab: PropTypes.oneOf([
//     "about",
//     "insider",
//     "home",
//     "community",
//     "exclusive",
//     "signUp",
//   ]),
// };
// DribbleBar.defaultProps = {
//   tab: "about",
// };
export default DribbleBar;
