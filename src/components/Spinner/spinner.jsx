export default function Spinner() {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <iframe
        src="/images/loading.gif"
        width="680"
        height="680"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      
    </div>
  );
}
