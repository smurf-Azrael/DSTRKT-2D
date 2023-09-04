import { useState, useContext, useEffect, useRef } from "react";
import emailjs from 'emailjs-com';
import { Footer } from "@/widgets/layout";
import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
import MyContext from '../context/MyContext';

export default function () {
	const [isSubmitted, setSubmitted] = useState(false);
	const { isEnd, updateEnd } = useContext(MyContext);

	const [form, setForm] = useState({
		name: '',
		email: '',
		mobile: '',
		message: '',
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
		<div className="mb-4ml-auto mx-auto w-full px-4 text-center lg:w-1/3">
			<Typography variant="h1" className="text-[#C9F24F]">
				THANK YOU!
			</Typography>
			<Typography variant="small">
				We will reply to your email within 24 hours
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
					message: form.message,
				},
				'0McMDN86imVn1z5ou'
			)
			.then(
				() => {
					setSubmitted(true);
				},
				(error) => {
					console.error(error);

					alert('Ahh, something went wrong. Please try again.');
				}
			);
	}
	return (
		<>
			<div className="relative flex h-screen content-center items-center justify-center pb-32 ">
				<div className="absolute top-0 h-full w-full bg-white bg-cover bg-center" />
				<div className="max-w-8xl container relative mx-auto">
					<div className="flex flex-wrap items-center">
						{!isSubmitted ? (
							<div className="mb-4ml-auto mx-auto w-full px-4 text-center lg:w-3/5">
								<div className="uppercase text-[#C9F24F] text-[2rem] lg:[3rem]">
									Contact US
								</div>
								<div className="mb-8 lg:mb-16 text-[.5rem] lg:text-[1rem]">
									Feedback, collaboration or partnerships, please fill out the form below
								</div>
								<form onSubmit={onSubmit}>
									<div className="my-2 mb-12 flex gap-4">
										<div className="flex flex-col gap-2 lg:gap-6 w-full lg:w-1/2">
											<input
												className="h-10 rounded-xl bg-[#F1F1F1] p-2 text-center text-[.5rem] lg:text-[1rem]"
												placeholder="FULL NAME"
												name="name"
												value={form.name}
												onChange={handleChange}
											/>
											<input
												className="h-10 rounded-xl bg-[#F1F1F1] p-2 text-center text-[.5rem] lg:text-[1rem]"
												placeholder="EMAIL"
												name="email"
												value={form.email}
												onChange={handleChange}
											/>
											<input
												className="h-10 rounded-xl bg-[#F1F1F1] p-2 text-center text-[.5rem] lg:text-[1rem]"
												placeholder="MOBILE"
												name="mobile"
												value={form.mobile}
												onChange={handleChange}
											/>
											<textarea
												className="h-full w-full rounded-xl bg-[#F1F1F1] p-4 lg:hidden text-[.5rem] lg:text-[1rem]"
												placeholder="PLEASE WRITE YOUR MESSAGE..."
												name="message"
												value={form.message}
												onChange={handleChange}
											/>
										</div>

										<div className="hidden lg:block w-1/2">
											<textarea
												className="h-full w-full rounded-xl bg-[#F1F1F1] p-4 text-[.5rem] lg:text-[1rem]"
												placeholder="PLEASE WRITE YOUR MESSAGE..."
												name="message"
												value={form.message}
												onChange={handleChange}
											/>
										</div>
									</div>
									<Button
										className="rounded-full bg-[#C9F24F] px-10 font-bold text-black text-[.5rem] lg:text-[1rem]"
										type="submit"
									>
										Submit
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
		</>
	);
}
