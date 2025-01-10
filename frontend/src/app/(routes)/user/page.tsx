// "use client"; // This is a client component 👈🏽

const UserPage = () => {
  const sentence = `Lorem Ipsum is dummy text, of the printing industry.`;
  const words = sentence.split(" ");
  return (
    <div className="user-page container mx-auto bg-stone-950">
      {words.map((word, wordIdx) => (
        <div
          key={wordIdx}
          className="inline-block font-bold text-5xl opacity-0 animate-fadeIn"
          style={{ animationDelay: `${wordIdx * 100}ms` }}
        >
          {Array.from(word).map((letter, letterIdx) => (
            <span key={`${wordIdx}-${letterIdx}`}>{letter}</span>
          ))}
          {/* Space after each word */}
          <span className="inline-block">&nbsp;</span>
          <span>
            <br />
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
