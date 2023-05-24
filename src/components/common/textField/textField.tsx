import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { InputProps } from "./types";
import { ERR_BLANK, ERR_EMAIL } from "./textFieldString";
import moment from "moment";

export interface ISubmitResult {
  value: string | number;
  error?: boolean;
  success?: boolean;
}

const FormTextField = (props: InputProps) => {
  const {
    type,
    label,
    placeholder,
    Value,
    onChangeText,
    Required,
    CustomErrorLine,
    hidden,
    isError,
  } = props;

  const [name, setName] = useState<ISubmitResult>({
    value: Value ? Value : "",
    error: false,
    success: false,
  });
  console.log(name);
  const [error, setError] = useState("");

  const handleChangeText = (e: any) => {
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      if (type === "email") {
        const emailTest =
          /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+(?:.[a-zA-Z0-9-]+)*$/;
        if (data.length > 0) {
          if (!emailTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "text") {
        const textTest = /^[a-zA-Z ]*$/gm;
        if (data.length > 0) {
          if (!textTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "textarea") {
        if (data.length > 0) {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "alpha") {
        const alphaTest = /^[a-zA-Z0-9 ]*$/gm;
        if (data.length > 0) {
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "num") {
        const alphaTest = /^[0-9]*$/gm;
        if (data.length > 0) {
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "percentage") {
        const alphaTest = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/gm;
        if (data.length > 0) {
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "price") {
        const alphaTest = /\d{1,3}[,\\.]?(\\d{1,2})?/g;
        if (data.length > 0) {
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "date" || "Edate") {
        if (data) {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "website") {
        const websiteRegex =
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        if (data.length > 0) {
          if (!websiteRegex.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "uanno") {
        const uanNo = /^[0-9]{12,14}$/;
        if (data.length > 0) {
          if (!uanNo.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "unionno") {
        const unionno = /^[0-9A-Za-z]{1,14}$/;
        if (data.length > 0) {
          if (!unionno.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError(ERR_BLANK);
          const value = {
            value: data,
            success: false,
          };
          onChangeText(value);
          setName(value);
        }
      }
    } else if (!Required) {
      if (type === "email") {
        if (data.length > 0) {
          const emailTest =
            /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+(?:.[a-zA-Z0-9-]+)*$/;
          if (!emailTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "text") {
        if (data.length > 0) {
          const textTest = /^[a-zA-Z ]*$/gm;
          if (!textTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "textarea") {
        if (data.length > 0) {
          const textRegex = /[\w[\]`!@#$%&*()={}:;<>+'-]*/gm;
          if (!textRegex.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "alpha") {
        if (data.length > 0) {
          const alphaTest = /^[a-zA-Z0-9 ]*$/gm;
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "num") {
        if (data.length > 0) {
          const alphaTest = /^[0-9]*$/gm;
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "percentage") {
        if (data.length > 0) {
          const alphaTest = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/gm;
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "price") {
        if (data.length > 0) {
          const alphaTest = /\d{1,3}[,\\.]?(\\d{1,2})?/g;
          if (!alphaTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "date" || "Edate") {
        if (data) {
          const dateTest = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gm;
          if (!dateTest.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "website") {
        if (data.length > 0) {
          const websiteRegex =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
          if (!websiteRegex.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "uanno") {
        if (data.length > 0) {
          const uanNo = /^[0-9]{12,14}$/;
          if (!uanNo.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      } else if (type === "unionno") {
        if (data.length > 0) {
          const unionno = /^[0-9A-Za-z]{1,14}$/;
          if (!unionno.test(String(data).toLowerCase())) {
            const value = {
              value: data,
              success: false,
            };
            onChangeText(value);
            setName(value);
          } else {
            setError("");
            const value = {
              value: data,
              success: true,
            };
            onChangeText(value);
            setName(value);
          }
        } else {
          setError("");
          const value = {
            value: data,
            success: true,
          };
          onChangeText(value);
          setName(value);
        }
      }
    }
  };

  const handleBlurText = (e: any) => {
    const text = e.target.value;
    const data = text.trimStart();
    if (Required) {
      if (type === "email") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const emailTest =
            /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+(?:.[a-zA-Z0-9-]+)*$/;
          if (!emailTest.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "text") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const textSRegex = /^[a-zA-Z ]*$/gm;
          if (!textSRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "textarea") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const textSRegex = /[\w[\]`!@#$%&*()={}:;<>+'-]*/gm;
          if (!textSRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "alpha") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const alphaRegex = /^[a-zA-Z0-9 ]*$/gm;
          if (!alphaRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "num") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const alphaRegex = /^[0-9 ]*$/gm;
          if (!alphaRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "percentage") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const alphaRegex = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/gm;
          if (!alphaRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "price") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          onChangeText(value);
          setName(value);
        } else {
          const alphaRegex = /\d{1,3}[,\\.]?(\\d{1,2})?/g;
          if (!alphaRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : "Error");
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "date" || "Edate") {
        if (!data) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "website") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const websiteRegex =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
          if (!websiteRegex.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "uanno") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const uanNo = /^[0-9]{12,14}$/;
          if (!uanNo.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      } else if (type === "unionno") {
        if (data.length <= 0) {
          setError(ERR_BLANK);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          const unionno = /^[0-9A-Za-z]{1,14}$/;
          if (!unionno.test(String(data).toLowerCase())) {
            setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
            const value = {
              ...name,
              error: true,
              success: false,
            };
            setName(value);
            onChangeText(value);
          } else {
            setError("");
            const value = {
              ...name,
              error: false,
              success: true,
            };
            setName(value);
            onChangeText(value);
          }
        }
      }
    } else if (!Required && data.length > 0) {
      if (type === "email") {
        const emailTest =
          /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+(?:.[a-zA-Z0-9-]+)*$/;
        if (!emailTest.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "text") {
        const textSRegex = /^[a-zA-Z ]*$/gm;
        if (!textSRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "textarea") {
        const textSRegex = /[\w[\]`!@#$%&*()={}:;<>+'-]*/gm;
        if (!textSRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "alpha") {
        const alphaRegex = /^[a-zA-Z0-9 ]*$/gm;
        if (!alphaRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "num") {
        const alphaRegex = /^[0-9 ]*$/gm;
        if (!alphaRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "percentage") {
        const alphaRegex = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/gm;
        if (!alphaRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "price") {
        const alphaRegex = /\d{1,3}[,\\.]?(\\d{1,2})?/g;
        if (!alphaRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "date" || "Edate") {
        const dateTest = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gm;
        if (!dateTest.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : "Error");
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "website") {
        const websiteRegex =
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        if (!websiteRegex.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "uanno") {
        const uanNo = /^[0-9]{12,14}$/;
        if (!uanNo.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      } else if (type === "unionno") {
        const unionno = /^[0-9A-Za-z]{1,14}$/;
        if (!unionno.test(String(data).toLowerCase())) {
          setError(CustomErrorLine ? CustomErrorLine : ERR_EMAIL);
          const value = {
            ...name,
            error: true,
            success: false,
          };
          setName(value);
          onChangeText(value);
        } else {
          setError("");
          const value = {
            ...name,
            error: false,
            success: true,
          };
          setName(value);
          onChangeText(value);
        }
      }
    }
  };

  console.log(moment().format("YYYY-MM-DD"))
  const yesterday = moment().subtract(1, 'day');
  // const disablePastDt = (current:any) => {
  //   return current.isAfter(yesterday);
  // };
  return (
    <Box
      sx={{
        maxWidth: "100%",
      }}
    >
      {type === 'Edate'  ? (
        <TextField
          fullWidth
          // InputProps={{inputProps: { min: disablePastDt,} }}
          id="date"
          label={label}
          type="date"
          // defaultValue={Value ? Value : name.value}
          value={Value ? Value : name.value}
          // defaultValue="2019-05-24"
          // inputProps={{ min: moment().format("YYYY-MM-DD")}}
          inputProps={{ min: "2023-01-01"}}
          InputLabelProps={{
            shrink: true,
          }}
          required={Required}
          onChange={handleChangeText}
          onBlur={(e) => {
            handleBlurText(e);
          }}
          helperText={
            error && (
              <span className="d-block text-end" style={{ color: "#FF0000" }}>
                {error}
              </span>
            )
          }
          size="medium"
        />
      ) :
      type === "date"  ? (
        <TextField
          fullWidth
          // InputProps={{inputProps: { min: disablePastDt,} }}
          id="date"
          label={label}
          type="date"
          // defaultValue={Value ? Value : name.value}
          value={Value ? Value : name.value}
          // defaultValue="2019-05-24"
          // inputProps={{ min: moment().format("YYYY-MM-DD")}}
          InputLabelProps={{
            shrink: true,
          }}
          required={Required}
          onChange={handleChangeText}
          onBlur={(e) => {
            handleBlurText(e);
          }}
          helperText={
            error && (
              <span className="d-block text-end" style={{ color: "#FF0000" }}>
                {error}
              </span>
            )
          }
          size="medium"
        />
      ) :
        (
        <TextField
            hidden={hidden}
            
          fullWidth
          label={label}
          id="fullWidth"
          placeholder={placeholder}
          type={type}
          required={Required}
          value={Value ? Value : name.value}
          onChange={handleChangeText}
          onBlur={(e) => {
            handleBlurText(e);
          }}
          helperText={
            error &&
            isError && (
              <span className="d-block text-end" style={{ color: "#FF0000" }}>
                {error}
              </span>
            )
          }
          size="medium"
        />
      )}
    </Box>
  );
};

export default FormTextField;
