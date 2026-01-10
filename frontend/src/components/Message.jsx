export default function Message({ role, text }) {
  return (
    <div className={`message ${role}`}>
      <pre>{text}</pre>
    </div>
  );
}
