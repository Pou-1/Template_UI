interface ColorsProps {
    colors: string[];
  }
  
  function Colors({ colors }: ColorsProps) {
    return (
      <div className="flex-center gap-x-2 w-full h-full">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`rounded-xl w-40 h-40 group cursor-pointer hover:h-80 trans-fast`}
            style={{ backgroundColor: color }}
          >
            <p className="hidden group-hover:flex pl-3 font-mono pt-5 text-white">
              {color}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
  export default Colors;
  