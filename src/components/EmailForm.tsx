import axios from "axios";
import { useState } from "react";

const EmailForm: React.FC<{
  id: string;
}> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "api/files/email",
        data: {
          id,
          emailFrom,
          emailTo,
        },
      });

      setMessage(data.message);
    } catch (error) {
      setMessage(error.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3">
      <h3>You can also send the file through mail</h3>
      <form
        className="flex flex-col items-center justify-center w-full p-2 space-y-3"
        onSubmit={handleEmail}
      >
        <input
          type="email"
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          placeholder="Email from"
          required
          onChange={(e) => setEmailFrom(e.target.value)}
          value={emailFrom}
        />
        <input
          type="email"
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          placeholder="Email to"
          required
          onChange={(e) => setEmailTo(e.target.value)}
          value={emailTo}
        />
        <button className="button" type="submit">
          Email
        </button>
      </form>

      {message && <p className="font-medium text-red-500">{message}</p>}
    </div>
  );
};

export default EmailForm;
