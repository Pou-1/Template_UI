function Button() {
	return (
		<button className="relative h-10 w-40 overflow-hidden drop-shadow-md font-semibold group">
			<span className="absolute inset-0 bg-transparent group-hover:bg-secondary scale-0 rounded-full trans-fast group-hover:scale-100"></span>
			<span className="relative z-10">Heyya</span>
		</button>
	);
}

export default Button;
