import { useEffect, useState, useRef, useContext } from "react";
import {
	Typography
} from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import CharacterCarousel from "./home.character";
import MyContext from '../context/MyContext';
import gsap from 'gsap';

const SvgImg = () => {
	return (
		<svg viewBox="0 0 1024 138" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0 0H51.9249V137.601H0V0ZM133.015 0L166.712 71.3489L135.587 137.584H55.7068V115.171H93.969L114.582 71.3319L91.584 22.3967H55.7068V0H133.015Z"
				fill="white"
			/>
			<path
				d="M208.347 0V31.2769L220.834 57.6109H300.118L323.116 106.359V137.618H270.987V106.359L258.704 80.0246H179.42L156.422 31.2769V0H208.347ZM205.655 97.2909L213.986 115.171H267.41V137.584H162.061V97.2909H205.655ZM323.116 0V40.3106H279.505L270.987 22.4308H212.112V0H323.116Z"
				fill="white"
			/>
			<path
				d="M498.329 0V40.3106H454.717L446.199 22.4308H383.559L375.229 40.3106H331.617V0H498.329ZM440.85 25.1068V44.8104L441.055 137.584H388.925V25.1238H440.85V25.1068Z"
				fill="white"
			/>
			<path
				d="M506.847 0H558.772V137.601H506.847V0ZM673.558 0V44.8274L652.741 89.0583H600.611L621.429 44.8274V22.4137H562.553V0H673.558ZM652.349 92.7911L673.558 137.601H621.429L610.918 115.188H562.553V92.774H652.349V92.7911Z"
				fill="white"
			/>
			<path
				d="M682.076 0H734.001V137.601H682.076V0ZM827.561 92.774L848.771 137.584H796.641L786.13 115.171H737.766V92.757H827.561V92.774ZM848.771 0L806.744 89.0413H754.819L796.641 0H848.771Z"
				fill="white"
			/>
			<path
				d="M1024 0V40.3106H980.389L971.871 22.4308H909.23L900.9 40.3106H857.289V0H1024ZM966.505 25.0897V44.8104L923.098 137.584H870.968L914.58 44.8104V25.1068H966.505V25.0897Z"
				fill="white"
			/>
		</svg>
	);
};

export function Home() {
	const [isLoading, setLoading] = useState(true);
	const [isMainLoading, setMainLoading] = useState(true);
	const { isEnd, updateEnd } = useContext(MyContext);

	const curtain = useRef(null);
	const title = useRef(null);
	const characters = useRef(null);
	const footer = useRef(null);

	useEffect(() => {
		updateEnd(false);
		setTimeout(() => setLoading(false), 1500);
		setTimeout(() => setMainLoading(false), 3500);

		const curtain_part = curtain.current;
		const title_part = title.current;
		const characters_part = characters.current;
		const footer_part = footer.current;

		let scrollPosition = 0;
		let delta_characters = 80;
		let delta_title = 70;
		let end_flag = false;
		let startY = 0;

		if (window.innerWidth > 700) {
			console.log("pc");
			title_part.style.transform = `translateY(${100}%)`;
			characters_part.style.transform = `translateY(${100}%)`;

		} else {
			console.log("mobile")
			end_flag = true;
			delta_characters = 0;
			delta_title = 0;
		}
		footer_part.style.transform = `translateY(${100}vh)`;


		const handleScroll = (e) => {
			console.log(end_flag);
			if (end_flag) {
				console.log("ererer")
				if (e.deltaY > 0) {
					footer_part.style.transform = `translateY(${0}vh)`;
					footer_part.style.transition = "transform 1s ease";
				} else if (e.deltaY < 0) {
					footer_part.style.transform = `translateY(${100}vh)`;
					footer_part.style.transition = "transform 2s ease";
				}
			}

			if (window.innerWidth > 700) {
				if (e.deltaY > 0 && end_flag == true) {
				} else {
					scrollPosition -= e.deltaY / 10;
					end_flag = false;
				}
			}

			if (scrollPosition <= 0 && window.innerWidth > 700) {

				if (delta_characters >= 0 && delta_characters <= 80) {
					characters_part.style.transition = "transform 0.6s ease-out";
					characters_part.style.transform = `translateY(${delta_characters}%)`;
					delta_characters = 80 + scrollPosition / 2;
				} else if (delta_characters < 0) {
					delta_characters = 0;
					end_flag = true;
				} else if (delta_characters > 80) {
					delta_characters = 80;
				}

				if (delta_title >= 0 && delta_title <= 70) {
					title_part.style.transition = "transform 0.6s ease-out";
					title_part.style.transform = `translateY(${delta_title}%)`;
					delta_title = 70 + scrollPosition / 2;
				} else if (delta_title < 0) {
					delta_title = 0;
				} else if (delta_title > 70) {
					delta_title = 70;
				}
			} else if (scrollPosition > 0) {
				scrollPosition = 0;
			}
		};

		const handleTouchStart = (e) => {
			startY = e.touches[0].clientY;
		};

		const handleTouchMove = (e) => {
			const deltaY = startY - e.touches[0].clientY;
			// if (!end_flag) {
			// 	scrollPosition -= deltaY / 25;
			// }
			console.log(deltaY);
			handleScroll({ deltaY });
			startY = e.touches[0].clientY;
		};
		if (!isLoading && isMainLoading) {
			gsap.to(
				curtain_part,
				{
					y: '-100%',
					duration: 2,
					delay: 1,
					ease: "Power0.easeNone",
				}
			);
			if (window.innerWidth > 700) {
				gsap.fromTo(
					characters_part,
					{ y: '110%' },
					{
						y: '80%',
						duration: 2,
						delay: 1,
						ease: "Power0.easeNone",
					}
				);
				gsap.fromTo(
					title_part,
					{ y: '110%' },
					{
						y: '70%',
						duration: 2,
						delay: 1,
						ease: "Power0.easeNone",
					}
				);
			}

		}

		if (!isMainLoading) {
			window.addEventListener("wheel", handleScroll);
			window.addEventListener("touchstart", handleTouchStart);
			window.addEventListener("touchmove", handleTouchMove);
		}

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [isLoading, isMainLoading]);

	return (
		<div className="relative">
			<div className="h-screen">
				<div className="relative flex content-center items-center justify-center pt-32">
					<div className="absolute top-0 h-screen w-full bg-gradient-to-b from-[#6360C7] to-[#8782CD] bg-cover bg-center" />
					<div className="container relative mx-auto">
						<div className="flex flex-wrap items-center">
							<div
								className="mx-auto flex w-full flex-col justify-items-center text-center"
								ref={title}
							>
								<div className="m-auto flex w-[70vw] md:w-[60vw] items-center justify-center">
									<SvgImg />
								</div>
								<div className="my-6 text-[.5rem] uppercase text-white sm:text-[.8rem] md:text-[1rem] xl:text-[1.5rem]">
									The new dimension on streetwear
								</div>
							</div>
						</div>
					</div>
				</div>
				<div ref={characters}>
					<CharacterCarousel />
				</div>
			</div>
			<div ref={footer}>
				<Footer />
			</div>
			<div className="absolute top-0 z-[111] h-screen w-screen" ref={curtain}>
				<div className="absolute top-0 h-screen w-full bg-gradient-to-b from-[#6360C7] to-[#8782CD] bg-cover bg-center" />
				<div className="max-w-8xl container relative mx-auto flex h-full flex-col ">
					<div className="flex h-full flex-wrap items-center">
						<div className="ml-auto mr-auto flex w-full flex-col justify-items-center px-4 text-center lg:w-8/12">
							{!isLoading ? (
								<SvgImg />
							) : (
								<Typography
									variant="h4"
									color="black"
									className="mb-6 font-black uppercase"
								>
									Loading...
								</Typography>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* <div className={`w-screen h-screen fixed flex justify-center items-center bg-[#C9F24F] z-[111] ${isEnd ? 'top-0 animate-[loading-down_1s_ease-in-out_forwards]' : 'top-[100vh]'}`}>
				<div className="text-black uppercase text-[2rem]">Loading...</div>
			</div> */}
			<div className={`w-screen h-screen fixed flex justify-center items-center top-[100vh] bg-[#C9F24F] z-[111] ${isEnd ? 'animate-[loading-up_1s_ease-in-out_forwards]' : ''}`}>
				<div className="text-black uppercase text-[2rem]">Loading...</div>
			</div>
		</div>
	);
}

export default Home;