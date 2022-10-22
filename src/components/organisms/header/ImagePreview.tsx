import { FC, useEffect, useState } from "react";
import * as CSS from "csstype";
import { Button } from "@chakra-ui/react";

type ImagePreviewProps = {
  file: File | null;
};

export const ImagePreview: FC<ImagePreviewProps> = ({ file, ...props }) => {
  const [url, setUrl] = useState<string>("");
  const isLoading = file && !url;

  const avatarStyle: CSS.Properties = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "100%",
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const res = reader?.result;
      if (res && typeof res === "string") {
        setUrl(res);
      }
    };
    reader.readAsDataURL(file);

    return () => {
      reader = null;
    };
  }, [file]);

  return file ? (
    isLoading ? (
      //   <span style={ {height: '100px'}}></span>
      <Button style={{ height: "100px" }} isLoading={true} />
    ) : (
      <img style={avatarStyle} src={url} alt={file.name} {...props} />
    )
  ) : null;
};
