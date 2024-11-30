import Link from 'next/link';

export default function Textbox({placeholder_text, input_function}) {
  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="textbox w-[500px] h-[110px] relative transform-style-3d">
        <div className="textbox-box bg-transparent flex items-center justify-center box-shadow inset 0 0 0 3px #272343 h-full transform-style-3d">
          <div className="bg-[white] rounded-lg drop-shadow-xl shadow-black textbox-field flex flex-col p-4 align-self-stretch border-radius-5">
            <input
              onChange={(e) => input_function(e.target.value)}
              className="textbox-text w-full h-full outline-none bg-transparent p-2 text-black placeholder-black opacity-70"
              type="text"
              placeholder={placeholder_text}
            />
            <hr className='border-1 border-solid border-black'></hr>
          </div>
        </div>
      </div>
    </div>
  );
}
