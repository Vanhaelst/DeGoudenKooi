import Image from "next/image";

export const Loader = () => {
  return (
    <div className="fixed flex justify-center items-center w-full h-[100vh] pointer-events-none">
      <Image
        src="/loader.gif"
        alt="loading"
        width={128}
        height={128}
        className="w-28	"
      />
      <svg
        className="hidden"
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={100}
        height={100}
        viewBox="0 0 100 100"
      >
        <path
          className="fill-primary-500"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};
