
import React, { useState } from "react";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ServiceLeadDetails() {
  const navigate = useNavigate();
  const [serviceId, setServiceId] = useState("");
  const [imagetitle, setImageTitle] = useState("");
  const [imagedescription, setImageDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [videotitle, setVideoTitle] = useState("");
  const [videodescription, setVideoDescription] = useState("");
  const [documenttitle, setDocumentTitle] = useState("");
  const [documentdescription, setDocumentDescription] = useState("");
  const [howitworks, setHowItWorks] = useState("");
  const [tandc, setTandC] = useState("");
  const [faqs, setFaqs] = useState("");
  const [activeFlag, setActiveFlag] = useState(false);

  const handleFileUpload = (event, setFile) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("serviceId", serviceId);
    formData.append("imagetitle", imagetitle);
    formData.append("imagedescription", imagedescription);
    if (imageFile) formData.append("imageFile", imageFile);
    formData.append("videotitle", videotitle);
    formData.append("videodescription", videodescription);
    if (videoFile) formData.append("videoFile", videoFile);
    formData.append("documenttitle", documenttitle);
    formData.append("documentdescription", documentdescription);
    if (documentFile) formData.append("documentFile", documentFile);
    formData.append("howitworks", howitworks);
    formData.append("tandc", tandc);
    formData.append("faqs", faqs);
    formData.append("activeFlag", activeFlag ? "1" : "0");

    axios
      .post(
        "http://localhost:5000/serviceleaddetails/createServiceLead",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        //console.log(res);
        toast.success("Record Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
        // Reset form fields
        setServiceId("");
        setImageTitle("");
        setImageDescription("");
        setImageFile(null);
        setVideoTitle("");
        setVideoDescription("");
        setVideoFile(null);
        setDocumentTitle("");
        setDocumentDescription("");
        setDocumentFile(null);
        setHowItWorks("");
        setTandC("");
        setFaqs("");
        setActiveFlag(false);

        navigate("/servicetab");
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
        //console.log(err);
      });
  };

  return (
<></>
  );
}

export default ServiceLeadDetails;
