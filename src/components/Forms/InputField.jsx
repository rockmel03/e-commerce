import React, { useId } from "react";

const InputField = React.forwardRef(
  ({ label, type = "text", className, ...rest }, ref) => {
    const id = useId();

    return (
      <>
        {label && (
          <label htmlFor={id} className="text-xl font-semibold">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={` w-full px-2 py-3 rounded-md border-none outline-none ${className}`}
          {...rest}
        />
      </>
    );
  }
);

export default InputField;
