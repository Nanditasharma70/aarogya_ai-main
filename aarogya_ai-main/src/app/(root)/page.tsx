/* eslint-disable @next/next/no-img-element */
"use client";

import CustomCarousel from "@/components/Carousel1";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Disease } from "@/models/Disease";
import { Doctor } from "@/models/Doctor";
import { Department } from "@/models/utils/Department";
import { faArrowLeft, faArrowRight, faCheckCircle, faHandHolding, faHandHoldingHeart, faHospital, faUserDoctor, faVialVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set } from "mongoose";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";


export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [departmentData, setDepartmentData] = useState<Department[]>([]);
  const [diseaseData, setDiseaseData] = useState<Disease[]>([]);
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [locationData, setLocationData] = useState<String[]>([]);
  
  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-departments");
      const data = await response.json()
      setDepartmentData(data.data);

      if(data.data.length === 0){
        setErrorMessage("No departments found");
      }

      setSuccessMessage("Departments fetched successfully");
      
    } catch (error: any) {
      setErrorMessage("Error fetching departments: " + error.toString());
      console.error(error);
    } finally{
      setLoading(false);
    }
  }
  , [setDepartmentData]);

  const fetchDiseases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-disease")
      const data = await response.json();
      setDiseaseData(data.data);
      
      if(data.data.length === 0 || data.data === undefined){
        setErrorMessage("No diseases found");
      }

      setSuccessMessage("Diseases fetched successfully");

    } catch (error: any) {
      setErrorMessage("Error fetching diseases: " + error.toString());
      console.error(error);
    } finally{
      setLoading(false);
    }
  }
  , [setDiseaseData]);


  const fetchLocations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-locations")
      const jsonData = await response.json();
      setLocationData(jsonData.data);

      if(jsonData.data.length === 0 || jsonData.data === undefined){
        setErrorMessage("No locations found");
      }

      setSuccessMessage("Locations fetched successfully");
      
    } catch (error: any) {
      setErrorMessage("Error fetching locations: " + error.toString());
      setErrorMessage("Error fetching locations");
      console.error(error);
    } finally{
      setLoading(false);
    }
  }, [setLocationData]);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-doctors")
      const data = await response.json();
      setDoctorData(data.data);

      if(data.data.length === 0 || data.data === undefined){
        setErrorMessage("No doctors found");
      }

      setSuccessMessage("Doctors fetched successfully");
    } catch (error: any) {
     setErrorMessage("Error fetching doctors: " + error.toString());
      console.error(error);
    } finally{
      setLoading(false);
    }
  }
  , [setDoctorData, setErrorMessage, setSuccessMessage]);

  


  useEffect(() => {

    fetchDepartments();
    fetchDiseases();
    fetchLocations();
  
  }, [fetchDepartments, fetchDiseases, fetchLocations, fetchDoctors])



  const dummySkills = [
    {
      id: 1,
      image: "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      image: "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      image: "data:image/jpeg;base64,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",
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpa6PL6cTtTqHo8OpsFc01gn3USmhLA9yVFA&s",
    },
    {
      id: 5,
      image: "https://t4.ftcdn.net/jpg/02/18/39/49/360_F_218394966_Nrv1qTeQxsZgJ5WaHnZHqd7vd2Xvxr8A.jpg",
    },
    {
      id: 6,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTry8Q-5Gah3q1tEs20wE1Y8I04VB8TafSreMX_1L56Eo1JaR1t3X76WZG0MfFmn6-BWzU&usqp=CAU",
    },
  ];



  let displayedDoctors = dummySkills.slice(currentIndex, currentIndex + 3);

  const handlArrowClick = (direction : string) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? dummySkills.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex === dummySkills.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handlArrowClick2 = (direction : string) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? dummySkills.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex === dummySkills.length - 1 ? 0 : prevIndex + 1));
    }
  };

 

  return (
    <>

              

   {/* <FormError message={departmentData.length === 0 ? "No departments found" : ""} /> */}

   {/* {
    errorMessage &&
    <FormError message={errorMessage} />
   } */}

   {
    successMessage &&
    <FormSuccess message={successMessage} />
   }

    <div className="bg-blue-100">
    <div className='pt-20 max-w-screen-xl flex relative flex-col justify-center items-center bg-blue-100 ml-40'>

        <div className='flex bg-blue-100 flex-col-reverse md:flex-row justify-around max-w-0.7 w-full rounded-2xl'>

            <div className=' flex-col items-center justify-around  w-full md:w-1/2'>

                <h1 className='bg-cyan-900 inline-block text-transparent bg-clip-text text-2xl font-semibold tracking-wide'>
                Skip the travel! Take Online
                </h1>
                <br />
                <br />
                <h1 className='bg-cyan-900 inline-block text-transparent bg-clip-text text-5xl font-semibold tracking-normal'>
                Doctor <span className="text-blue-400">Consultation</span>
                </h1>
                <br />

                 <div className='mt-3 text-xl text-gray-500 gap-4 flex-col flex' >
                <p className='flex flex-wrap gap-3 font-semibold'>
                Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
                </p>
            </div>
                <br />
                <div className='flex flex-col md:flex-row gap-5'>
                  <Link href='/consult'>
                    <Button className='border-2 rounded-3xl px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white w-52'>
                      Consult Aarogya AI
                    </Button>
                    </Link>
                </div>


            <br />
            </div>
            <div className='flex justify-center items-center'>
                <img
                src="https://www.carezindagi.com/assets/designer/themes/default/template-autom/images/care-doctor.png"
                alt='Loading image'
                className='rounded-3xl bg-clip-border w-10/12 mb-10'
               
                />
            </div>


            <div className='flex flex-col items-center justify-center mt-48 min-h-full'>
            <div className='flex flex-row md:absolute md:left-0 justify-between bottom-0 bg-gray-50 p-4 rounded-t-lg w-full max-w-screen-xl px-10 py-10 z-50 shadow-lg'>
                    <div className='flex justify-center items-center'>
                    {/* <SearchBar value="Ex Doctor, Hospital" /> */}
                    <Link href={"/symptoms"}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-3xl px-4 py-3 font-semibold">Book Doctor by Symptoms</Button>
                    </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                    {/* <SearchBar value="Ex Surgeon, Cardiologist" /> */}
                    <Link href={"/consult-ai"}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-3xl px-4 py-3 font-semibold">Book Doctor by AI</Button>
                    </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                    {/* <SearchBar value="Set Your location" /> */}
                    <Link href={"/find-doctor"}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-3xl px-4 py-3 font-semibold">Book Doctor by Search</Button>
                    </Link>
                    </div>
                    {/* <div className='flex justify-center items-center'>
                    <Link href={"/consult-ai"}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-3xl">Get Department by AI</Button>
                    </Link>
                    </div> */}
                    {/* <div className='flex justify-center items-center'>
                    <Button className='text-white bg-blue-500 bg-opacity-90 px-4 py-3 w-32 rounded-3xl hover:bg-blue-700'>Search</Button>
                    </div> */}
                </div> 
                </div>
                </div>
        </div>
        </div>

         <div className="flex items-center justify-center gap-5 pt-10 pb-4 w-full">
      <div className="max-w-screen-lg p-4 bg-white">
      <div className="flex justify-center items-center p-5">
      </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
              <CustomCarousel category="Carousel1" />
          </div>
      </div>
      </div>

      <div className="specialization-box flex flex-col bg-blue-50">
        <div className="flex items-center justify-center">
      <h2 className="text-3xl font-bold mb-7 mt-10 text-blue-900">Find By Specialisation</h2>
      </div>
      <div className="flex flex-wrap gap-7 justify-center items-center max-w-screen-2xl my-2">

        { departmentData &&
          departmentData.map((department, index) => {
            return (
              <div key={index} className="flex flex-col items-center justify-center w-1/5">
                <div className="bg-white rounded-xl p-4">
                  <Image
                    src={department.image || "/images/department-placeholder.png"}
                    alt="Department"
                    width={100}
                    height={100}
                  ></Image>
                  <h2 className="text-gray-600">{department.name}</h2>
                </div>
              </div>
            
            )
          })
        }

      </div>
      <div className="flex items-center justify-center m-5">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">View All</button>
      </div>
    </div> 

    <div className="flex items-center justify-center gap-5 pt-10 pb-4 w-full">
      <div className="max-w-screen-lg p-4 bg-white">
      <div className="flex justify-center items-center p-5">
      </div>
      <div className="flex items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 mt-10 text-blue-900">Our Medical Specialist</h2>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
     {displayedDoctors.map((skill) => (
      // eslint-disable-next-line react/jsx-key
      <div className="flex flex-col justify-center items-center">
        <div key={skill.id} className="border h-96 w-80 border-gray-300 p-4 rounded-t-full bg-blue-200 flex flex-col justify-center items-center ">
          <img src={skill.image} alt='/' className='h-full rounded-t-full w-full' />
        </div>
        <h1 className="text-gray-600">Hiuohpbini</h1>
        <h2 className="text-gray-400">yfugiviy</h2>
        </div>
      ))}
      </div>
      <div className="flex items-center justify-center gap-5 pb-4">
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => handlArrowClick("left")} className="text-white p-3 text-lg hover:text-black rounded-full bg-blue-500"  />
      <FontAwesomeIcon icon={faArrowRight} onClick={() => handlArrowClick("right")} className="text-white p-3 text-lg hover:text-black rounded-full bg-blue-500"  />
      </div>
      </div>
      </div>

      <div className="patient-caring-div flex flex-row items-center justify-around p-10 bg-blue-100 rounded-lg shadow-lg">
      <div className="images-container flex">
          <img 
        className=" h-full w-full p-2 mt-48  bg-white"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuVDSad2_L3jYUAkgahwD569AtgZgvz3KWw&s" />
        <img 
        className=" h-full w-full p-2  bg-white"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3W4sOaT1cgXgSEBQJ8rY8VYA3tAddUQdkA&s-8" />
      </div>
      <div className="text-container ml-4 w-1/3">
      <p className="text-blue-400 font-bold mb-2">HELPING PATIENTS FROM AROUND THE GLOBE!!</p>
        <h2 className="text-4xl font-extrabold mb-2 tracking-wide">Patient <span className="text-blue-400">Caring</span></h2>
        <p className="text-gray-500 mb-2 text-base">Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner.We hope you will allow us to care for you and strive to be the first and best choice for healthcare.</p>
        <ul className="list-disc flex flex-col gap-y-4 text-blue-950 font-semibold text-lg">
          <div><FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-lg" /> Stay Updated About Your Health</div>
          <div><FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-lg"  /> Check Your Results Online</div>
          <div><FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-lg"  /> Manage Your Appointments</div>
        </ul>
      </div>
    </div>

    <div className="flex items-center justify-center gap-5 pt-4 pb-4 w-full">
      <div className="max-w-screen-lg p-4 bg-white">
      <div className="flex justify-center items-center p-5">
      </div>
      <div className="flex items-center justify-center flex-col">
      <h2 className="text-base font-bold mb-4 mt-4 text-blue-400">Blog & News</h2>
      <h2 className="text-3xl font-bold mb-4 text-blue-900">Read Our Latest News</h2>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
     {displayedDoctors.map((skill) => (
      // eslint-disable-next-line react/jsx-key
      <div className="flex flex-col justify-center items-center">
        <div key={skill.id} className="border h-60 w-80 border-gray-300 p-4 rounded-sm bg-blue-200 flex flex-col justify-center items-center ">
          <img src={skill.image} alt='/' className='h-full w-full' />
        </div>
        <h1 className="text-gray-600">Hiuohpbini</h1>
        <h2 className="text-gray-400">yfugiviy</h2>
        </div>
      ))}
      </div>
      <div className="flex items-center justify-center gap-5 pb-4">
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => handlArrowClick2("left")} className="text-white p-3 text-lg hover:text-black rounded-full bg-blue-500"  />
      <FontAwesomeIcon icon={faArrowRight} onClick={() => handlArrowClick2("right")} className="text-white p-3 text-lg hover:text-black rounded-full bg-blue-500"  />
      </div>
      </div>
      </div>

      <div className="our-family-page flex flex-wrap items-center justify-center bg-blue-50">
      {/* Left side - Family page description */}
      <div className="left-side w-full md:w-1/3 p-8 flex justify-center flex-col pl-7">
      <h2 className="text-sm font-semibold mb-4 text-blue-400">CARING FOR THE HEALTH OF YOU AND YOUR FAMILY.</h2>
        <h2 className="text-4xl font-extrabold mb-4 text-blue-950">Our Families</h2>
        <p className="text-gray-400">
        We will work with you to develop individualised care plans, including management of chronic diseases. If we cannot assist, we can provide referrals or advice about the type of practitioner you require. We treat all enquiries sensitively and in the strictest confidence..
        </p>
      </div>

      {/* Right side - Family members photos */}
      <div className="right-side w-full md:w-1/3 p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="text-4xl text-blue-400" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Happy Patients</p>
          </div>
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
          <FontAwesomeIcon icon={faHospital} className="text-4xl text-orange-600" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Hospitals</p>
          </div>
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
          <FontAwesomeIcon icon={faVialVirus} className="text-4xl text-yellow-500" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Laboratories</p>
          </div>
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
            <FontAwesomeIcon icon={faUserDoctor} className="text-4xl text-green-400" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Expert Doctor</p>
          </div>
        </div>
      </div>
    </div>

    <FAQ />
    </>
  );
}

