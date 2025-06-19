import redxLogo from "./../assets/redx_logo.png";

export const RedxHeader = () => {
  return (
    <header className="md:grid bg-primary md:grid-cols-2 p-4">
      <img className="h-24 mx-auto md:mx-0" src={redxLogo} alt="REDX Logo" />
      <div className="font-serif my-auto">
        <h1 className="text-white text-xl font-bold">Full Stack Test</h1>
      </div>
      <p className="text-xs md:text-sm text-white col-span-2 mt-2">
        <i className="bi-pencil me-1" />
        Updated by Benson Bird
      </p>
    </header>
  );
};
