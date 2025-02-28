import { RingLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"
    }}>
      <RingLoader color="#3498db" size={150} />
    </div>
  );
}

export default LoadingScreen;