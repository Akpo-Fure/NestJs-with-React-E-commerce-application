import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import BodyComponent from "../Reusable-Components/Body/Body";

function App() {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const signIn = async () => {
    const response = await axios.post(
      "http://127.0.0.1:3000/auth/signin",
      formData
    );
    return response;
  };

  const { mutate, isLoading } = useMutation(signIn, {
    onSuccess(data) {
      document.cookie = data.data.token;
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      <BodyComponent>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <p>Email Address</p>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            />

            {isLoading ? (
              <button type="submit" onClick={handleSubmit}>
                Signin in....
              </button>
            ) : (
              <button type="submit" onClick={handleSubmit}>
                Sign in
              </button>
            )}
          </form>
        </div>
      </BodyComponent>
    </>
  );
}

export default App;
