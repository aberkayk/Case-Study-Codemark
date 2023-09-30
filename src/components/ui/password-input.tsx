import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = (props: InputProps) => {
  const [type, setType] = useState<"text" | "password">("password");

  return (
    <div className="relative">
      <Input {...props} type={type} />
      <Button
        variant="ghost"
        type="button"
        className="absolute right-0 top-0"
        onClick={() => setType(type === "text" ? "password" : "text")}
      >
        {type === "password" ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
