import ChromaKeyVideo from "../components/ChromaKeyTest";

function ChromaPage() {
  return (
    <div className="page-wrapper">
      <ChromaKeyVideo
        camera
        facingMode="environment"
        keyColor={{ r: 0, g: 177, b: 64 }}
        tolerance={80}
        width={640}
        height={360}
        />
    </div>
  );
}

export default ChromaPage;
