import { Droplet } from "lucide-react";
import React, { use, useState } from "react";
import { useForm, useWatch } from 'react-hook-form';
import { AuthContext } from "../../../Context/AuthContext";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import axios from "axios";




const LoginRegistration = () => {
   const location = useLocation();


 const navigate = useNavigate();
  const{createUser, signInUser,updateUserProfile }=use(AuthContext)

const [registerSuccess, setRegisterSuccess] = useState("");

  const {fullDistrict, fullUpazila}=useLoaderData()



   const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const {
  register: registerLogin,
  handleSubmit:handleSubmitLogin,

} = useForm();
const selectedDistrict = useWatch({
  control,
  name:"district"
})


const filteredUpazilas = fullUpazila.filter(
  u=>u.district_id===selectedDistrict
);



const axiosSecure = UseAxiosSecure();



const handleLogin=(data)=>{
 signInUser(data.email, data.password)
 .then(res=>{

  
   navigate(location?.state || '/')
  console.log("login successful", res)
   reset();
 })
 .catch(error=>{
  console.log(error)
 })
}
const handleRegister = async (data) => {
  try {
    
    await createUser(data.email, data.password);

   setRegisterSuccess("Account created successfully!");

    const formData = new FormData();
    formData.append("image", data.photo[0]);

    const imgRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_API}`,
      formData
    );

    const photoURL = imgRes.data.data.url; 


    await updateUserProfile({
      displayName: data.fullName,
      photoURL,
    });


    const districtName = fullDistrict.find(d => d.id === data.district)?.name;
    const upazilaName = fullUpazila.find(u => u.id === data.upazila)?.name;

  
    const donorInfo = {
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      password:data.password,
      profileUrl: photoURL, 
      bloodGroup: data.bloodGroup,
      district: districtName,
      upazila: upazilaName,
      status: "active",
      role: "donor",
      createdAt: new Date(),
    };

    await axiosSecure.post("/donors", donorInfo);
setTimeout(() => {
  setActiveTab("login");
  setRegisterSuccess("");
  reset();
}, 300);
   
  } catch (error) {
    console.error("Registration failed:", error);
  }
};




  const [activeTab, setActiveTab] = useState("login");


  return (
    <div className="min-h-screen w-full flex">
      {/* ================= LEFT RED HERO SIDE ================= */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-b from-rose-700 to-rose-900 text-white items-center justify-center relative overflow-hidden">

        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-white/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-56 h-56 rounded-full border border-white/20 animate-pulse"></div>

        {/* Center content */}
        <div className="text-center px-10">
          <div ><Droplet className="w-16 h-16  rounded-full mx-auto mb-6"></Droplet></div>

          <h2 className="text-4xl font-bold mb-4">Become a Donor</h2>

          <p className="text-lg text-white/90 max-w-md">
            Register today and join thousands of life-savers.  
            Your contribution makes a difference.
          </p>
        </div>
      </div>

      {/* ================= RIGHT FORM SIDE ================= */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-rose-500 to-rose-800 bg-clip-text text-transparent">
            Welcome to BloodLink
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Login or create an account to continue
          </p>

          {/* Tabs */}
          <div className="flex mb-6 rounded-xl overflow-hidden ">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 font-light ${
                activeTab === "login"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 font-light ${
                activeTab === "register"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* ================ LOGIN FORM ================ */}
          {activeTab === "login" && (
            <form onSubmit={handleSubmitLogin(handleLogin)}>
              <div className="mb-4">
                <label className="block mb-1 font-light">Email</label>
                <input
                {...registerLogin('email')}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full border border-rose-100 px-3 py-2 rounded-lg bg-gray-50 
                  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-light">Password</label>
                <input
                {...registerLogin('password')}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full border border-rose-100 px-3 py-2 rounded-lg bg-gray-50
                  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg font-semibold"
              >
                Login
              </button>
            </form>
          )}

          {/* ================ REGISTER FORM ================ */}
          {activeTab === "register" && (
           <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">

  {/* Full Name */}
  <div>
    <label className="block mb-1 font-light">Full Name</label>
    {errors.fullName && (
  <p className="text-red-500 text-sm mt-1">
    {errors.fullName.message}
  </p>
)}

    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.015-8 4.5V21h16v-2.5c0-2.485-3.582-4.5-8-4.5z" />
        </svg>
      </span>

      <input
        type="text" {...register('fullName',{ required: "Name is required" })}
        placeholder="Enter your full name"
        className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
      />
    </div>
  </div>

  {/* Email */}
  <div>
    <label className="block mb-1 font-light">Email Address</label>
    {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email.message}
  </p>
)}

    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </span>
{/* email can not be uppercase */}
      <input
         {...register('email',{ required: "Email is required" })}
        type="email"
        placeholder="Enter your email"
        className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
      />
    </div>
  </div>
  

  {/* Avatar URL */}
  <div>
    <label className="block mb-1 font-light">Photo</label>
    <div className="relative">
      

    {/* Photo Field */}


  <input type="file" {...register('photo',{required:true})} className="file-input w-full" placeholder="Your Photo" />
  {errors.photo?.type==='required' && <p className='text-red-500'>Photo is required</p>}
    </div>
  </div>

  {/* Blood Group */}
  <div> <label className="block mb-1 font-light">Blood Group</label>
  {errors.bloodGroup && (
  <p className="text-red-500 text-sm mt-1">
    {errors.bloodGroup.message}
  </p>
)}

<select
  {...register("bloodGroup", {
    required: "Blood group is required",
  })}
  className="w-full border font-light border-rose-100 select rounded-xl bg-white
  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
>
  <option value="">Select blood group</option>
  <option value="A+">A+</option>
  <option value="A-">A−</option>
  <option value="B+">B+</option>
  <option value="B-">B−</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB−</option>
  <option value="O+">O+</option>
  <option value="O-">O−</option>
</select>
</div>

  {/* District + Upazila */}
  <div className="grid grid-cols-2 gap-4">
    {/* District */}
    <div>
      <label className="block mb-1 font-light">District</label>
      <select
      {...register('district',{ required: "District is required" })}
        className="select w-full border font-light border-rose-100 rounded-xl bg-white
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
      >
        <option>Select district</option>
        {fullDistrict.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
    </div>

    {/* Upazila */}
    <div>
      <label className="block mb-1 font-light">Upazila</label>
      <select
      {...register('upazila',{ required: " is required" })}
        
        className={`w-full rounded-xl outline-none font-light select
        ${
         selectedDistrict
            ? "border border-rose-100 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            : "bg-gray-200 border-gray-300 "
        }`}
      >
        
                    <option value="">{
                       selectedDistrict ? "Select Upazila" : "Select district first"
                       }</option>
                     {
                       filteredUpazilas.map((u)=>(
                         <option key={u.id} value={u.id}>
                           {u.name}
                         </option>
                       ))
                     }
      </select>
    </div>
  </div>

  {/* Password */}
 <input
  type="password"
  {...register("password", {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  })}
  placeholder="Create a password"
  className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
/>

{errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
)}

<input
  type="password"
  {...register("confirmPassword", {
    required: "Confirm password is required",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  })}
  placeholder="Confirm password"
  className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
/>

{errors.confirmPassword && (
  <p className="text-red-500 text-sm mt-1">
    {errors.confirmPassword.message}
  </p>
)}

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl text-lg font-semibold"
  >
    Create Account
  </button>
  {registerSuccess && (
  <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center font-medium">
    {registerSuccess}
  </div>
)}

</form>

          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;
