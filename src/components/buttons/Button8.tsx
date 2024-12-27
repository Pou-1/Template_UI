function Button() {
	return (
		<button className="relative w-40 h-20 overflow-hidden font-semibold group">
			<span className="absolute inset-0 bg-red-400 scale-0 rounded-md transition-transform duration-500 ease-in-out group-hover:scale-100"></span>
			<span className="relative z-10">Heyya</span>
		</button>
	);
}

export default Button;
