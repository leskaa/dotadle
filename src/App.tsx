import DotadleLogo from "./assets/DotadleAlphaLogo.png";

function App() {
  return (
    <div className="app h-full w-full min-h-screen">
      <header className="pt-5 flex place-content-center">
        <img src={DotadleLogo} alt="Dotadle Logo" />
      </header>
    </div>
  );
}

export default App;
