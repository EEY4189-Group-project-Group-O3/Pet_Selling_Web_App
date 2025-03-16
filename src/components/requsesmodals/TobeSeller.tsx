"use client";
import { useState } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Box,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { axios_instance } from "../../connection/client";

interface TobeSellerProps {
  setClose: () => void;
}
const TobeSeller = ({ setClose }: TobeSellerProps) => {
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    address: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    setError(false);
    setSuccess(false);
    axios_instance
      .post("user/seller-request/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setMsg("Request sent successfully");
        setTimeout(() => {
          setClose();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setMsg("Request failed. Try again later");
      });
  };

  return (
    <ModalContent>
      <ModalHeader>Do you want to be seller</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <p className="mb-2">Please fill bellow form to be a seller</p>
        <Box className="flex flex-col gap-2 mb-2">
          <Input
            placeholder="Name"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Contact number"
            value={formData?.contact_number}
            onChange={(e) =>
              setFormData({ ...formData, contact_number: e.target.value })
            }
          />
          <Input
            placeholder="address"
            value={formData?.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <Textarea
            placeholder="Small description about what are you going to sell"
            value={formData?.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Box>
        {error || success ? (
          <Alert status={error ? "error" : success ? "success" : "info"}>
            <AlertIcon />
            <AlertTitle>
              {error ? "Error" : success ? "Success" : ""}
            </AlertTitle>
            <AlertDescription>{msg}</AlertDescription>
          </Alert>
        ) : null}

        <Box className="flex gap-2 mt-2 justify-end">
          <Button colorScheme="orange" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button colorScheme="blue" mr={3} onClick={setClose}>
            Close
          </Button>
        </Box>
      </ModalBody>
    </ModalContent>
  );
};

export default TobeSeller;
