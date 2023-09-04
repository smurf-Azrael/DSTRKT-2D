import emailjs from 'emailjs-com';
import bgImg from "@/assets/images/background.png";
import {
	Button,
	Typography,
} from "@material-tailwind/react";
import { useState, useContext, useEffect, useRef } from "react";
import { Footer } from "@/widgets/layout";
import MyContext from '../context/MyContext';

export function SignUp() {
	const [isSigned, setSign] = useState(false);
	const { isEnd, updateEnd } = useContext(MyContext);
	const [form, setForm] = useState({
		name: '',
		email: '',
	});

	const footer = useRef(null);
	let startY = 0;

	useEffect(() => {
		updateEnd(false);
		const footer_part = footer.current;

		footer_part.style.transform = `translateY(${100}vh)`;

		const handleScroll = (e) => {
			console.log(e.deltaY)
			if (e.deltaY > 0) {
				footer_part.style.transform = `translateY(${0}vh)`;
				footer_part.style.transition = "transform 1s ease";
			} else if (e.deltaY < 0) {
				footer_part.style.transform = `translateY(${100}vh)`;
				footer_part.style.transition = "transform 2s ease";
			}
		}
		const handleTouchStart = (e) => {
			startY = e.touches[0].clientY;
		};

		const handleTouchMove = (e) => {
			const deltaY = startY - e.touches[0].clientY;
			console.log(deltaY);
			handleScroll({ deltaY });
			startY = e.touches[0].clientY;
		};

		window.addEventListener("wheel", handleScroll);
		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchmove", handleTouchMove);

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [])

	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const afterSubmit = (
		<div className="mb-4ml-auto m-auto w-full px-4 text-center lg:w-1/3">
			<Typography variant="h1" color="white">
				THANK YOU!
			</Typography>
			<Typography variant="small" color="white">
				You have been added to our waitlist. An email will be sent out before
				the launch!
			</Typography>
		</div>
	);

	function onSubmit(e) {
		e.preventDefault();
		emailjs
			.send(
				'service_tmzrod3',
				'template_q6mw5yc',
				{
					from_name: form.email,
					to_email: 'cawsonoliver33@gmail.com',
					message: 'Sign Up',
				},
				'0McMDN86imVn1z5ou'
			)
			.then(
				() => {
					setSign(true);
				},
				(error) => {
					console.error(error);

					alert('Ahh, something went wrong. Please try again.');
				}
			);
	}
	return (
		<div className="relative h-screen overflow-hidden">
			<div className='flex items-center justify-center w-full h-full'>
				<div className="absolute top-0 h-full w-full bg-gradient-to-b from-[#6360C7] to-[#8782CD] bg-cover bg-center " />
				<img
					src={bgImg}
					className="absolute my-auto w-[200vw] max-w-[200vw] md:w-[75vw] md:max-w-[75vw]"
				/>
				<div className="absolute inset-0 h-full w-full object-cover backdrop-blur-[10px]" />
				<div className="w-full container relative m-auto">
					<div className="flex flex-wrap items-center">
						{!isSigned ? (
							<div className="mb-4ml-auto m-auto px-4 text-center xl:w-1/3 md:w-1/2">
								<div className="uppercase text-white sm:text-[3.5rem] text-[4rem] leading-none">
									Sign Up
								</div>
								<div className="uppercase text-white sm:text-[1.5rem] text-[2rem] leading-none">
									Early Access
								</div>
								<form
									className="mt-16 flex flex-col items-center gap-4"
									onSubmit={onSubmit}
								>
									<input
										className="h-10 w-full rounded-xl bg-[#F1F1F1] p-2 text-center"
										placeholder="FULL NAME"
										name="name"
										value={form.name}
										onChange={handleChange}
									/>
									<input
										className="h-10 w-full rounded-xl bg-[#F1F1F1] p-2 text-center"
										placeholder="EMAIL"
										name="email"
										value={form.email}
										onChange={handleChange}
									/>

									<Button
										className="w-1/2 rounded-full bg-[#C9F24F] px-10 font-bold text-black"
										type="submit"
									>
										SIGN UP
									</Button>
								</form>
							</div>
						) : (
							afterSubmit
						)}
					</div>
				</div>
			</div>
			<div ref={footer}>
				<Footer />
			</div>

			<div className={`w-screen h-screen fixed flex justify-center items-center bg-[#C9F24F] z-[111] ${isEnd ? 'top-[100vh]' : 'top-0 animate-[loading-down_1s_ease-in-out_forwards]'}`}>
				<div className="text-black uppercase text-[2rem]">Loading...</div>
			</div>
			<div className={`w-screen h-screen fixed flex justify-center items-center top-[100vh] bg-[#C9F24F] z-[111] ${isEnd ? 'animate-[loading-up_1s_ease-in-out_forwards]' : ''}`}>
				<div className="text-black uppercase text-[2rem]">Loading...</div>
			</div>
		</div>
	);
}

export default SignUp;
