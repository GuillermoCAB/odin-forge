"use client";
import { Button, InvisibleButton } from "@/components/atoms";
import React, { useState, useRef, useEffect } from "react";

interface CodeInputProps {
  onCodeComplete: (code: string) => void;
  onResend: () => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  onCodeComplete,
  onResend,
}) => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(6).fill(null)
  );

  const handleChange = (value: string, index: number) => {
    const filteredValue = value.replace(/[^a-zA-Z0-9]/gi, "");
    if (filteredValue) {
      const newCode = [...code];
      newCode[index] = filteredValue.slice(0, 1);
      setCode(newCode);
      const firstEmptyIndex = newCode.findIndex((val) => val === "");

      if (index < 5) {
        console.log("firstEmptyIndex", firstEmptyIndex);
        setTimeout(() => {
          inputRefs.current[firstEmptyIndex]?.focus();
        }, 50);
      }

      if (newCode.every((val) => val !== "") && newCode.length === index + 1) {
        setTimeout(() => {
          onCodeComplete(newCode.join(""));
        }, 50);
      }
    }
  };

  const handleBackspace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/gi, "");
    if (pasteData.length === 6) {
      const newCode = pasteData.split("");
      setCode(newCode);
      onCodeComplete(newCode.join(""));
    }
  };

  const handleFocus = (index: number) => {
    const firstEmptyIndex = code.findIndex((val) => val === "");

    console.log("firstEmptyIndex focus", firstEmptyIndex);
    if (firstEmptyIndex !== -1 && !code[index]) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div>
      <div className="w-full flex justify-between items-center my-6">
        {code.map((singleCode, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            maxLength={1}
            value={singleCode.toUpperCase()}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            onPaste={(e) => handlePaste(e)}
            onFocus={() => handleFocus(index)}
            className="w-10 h-10 border border-black flex justify-center items-center text-center"
          />
        ))}
      </div>
      <Button
        text="Verificar"
        size="medium"
        onClick={() => onCodeComplete(code.join(""))}
        isLoading={isLoading}
      />
      <InvisibleButton
        text="Resend the code"
        className="mt-6 mx-auto"
        onClick={onResend}
        isLoading={isLoading}
      />
    </div>
  );
};
