import { useState } from "react";

export default function useForm(submitHandler, initalValues) {
  const [values, setValues] = useState(initalValues);

  const onChange = (e) => {
    let target = e.target.name;

    if (e.target.value <= 0) {
      e.target.value = "";
    }
    if (target === "make") {
      setValues((state) => ({
        ...state,
        [target]: e.target.value,
        model: "",
      }));
    } else if (target === "photos") {
      const selectedPhotos = Array.from(e.target.files);
      setValues((state) => ({
        ...state,
        [target]: selectedPhotos
      }));
    } else {
      setValues((state) => ({
        ...state,
        [target]: e.target.value,
      }));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
console.log(values);
    submitHandler(values);
  };
  return {
    values,
    onChange,
    onSubmit,
  };
}
