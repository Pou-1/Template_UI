function Button() {
	return (
		<button className="relative flex-center w-40 h-20 rounded-md text-red-400 font-semibold group">
			<span className="absolute inset-0 bg-white scale-0 rounded-md transition-transform duration-1000 ease-in-out origin-top-right group-hover:scale-100"></span>
			<span className="relative z-10 flex-center w-[9.5rem] h-[4.5rem] bg-secondary rounded-md">
				Heyya
			</span>
		</button>
	);
}

export default Button;
