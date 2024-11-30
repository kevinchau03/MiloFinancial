export default function button({button_text}){
    return(
        <div className="drop-shadow-lg m-4">
            <button className="relative overflow-hidden group px-6 py-2 font-bold text-black bg-[#f47c5c] bg-opacity-10 rounded-md">
            <span className="absolute inset-0 w-full h-full bg-[#f47c5c] opacity-30 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left"></span>
            {button_text}
            </button>
        </div>
    );
}