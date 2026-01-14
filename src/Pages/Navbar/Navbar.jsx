import { Menu, ChevronDown} from "lucide-react";
import { use, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate} from "react-router";
import { Droplet } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../Hooks/UseAxiosSecure";

export const Navbar = () => {
 const {user,logOut}=use(AuthContext)
const axiosSecure = UseAxiosSecure()  

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
const logo =<>
  <NavLink
      to="/"
      className="flex items-center gap-2"
    
    >
      {/* ICON BOX */}
      <div
        className="
          bg-gradient-to-br from-rose-400 to-rose-800
          p-2.5 rounded-xl shadow-md
          flex items-center justify-center
        "
      >
        <Droplet
          className="   w-5 h-5 text-white"
         
       
        />
      </div>

      {/* TEXT */}
      <span
        className="
          text-xl font-bold
          bg-gradient-to-r from-rose-400 to-rose-800
          bg-clip-text text-transparent
        "
      >
        BloodLink
      </span>
    </NavLink>
</>
const links=<>
 <div className="grid grid-cols-1 sm:flex">
   <li>
 <NavLink to="/">
  Home
 </NavLink>
  </li>
<li>
   <NavLink to="/donationRequests">
   Donation Requests
 </NavLink>

</li>
<li>
   <NavLink to="/searchDonors">
 Search Donors
 </NavLink>

</li>
<li>
  <NavLink to="/blog">
Blog
 </NavLink>
</li>
<li>
  <NavLink to="/about">
About
 </NavLink>
</li>
 </div>
    
</>


  

const handleLogOut =()=>{
  logOut()
  .then(res=>{
    console.log("Log Out Successful")
  })
  .catch(error=>{
    console.log(error)
  })
}
  



  const navigate = useNavigate();
 


const { data: userData,isLoading: roleLoading, isLoading } = useQuery({
  queryKey: ["donorRole", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get("/donors/role", {
      params: { email: user.email }
    });

    console.log("Role from DB:", res.data.role);
    return res.data;
  },
  enabled: !!user?.email,
  refetchOnWindowFocus: true,

});





const handleDashboard = () => {
  if (!user) {
    console.log("No user found → redirecting to login");
    return navigate("/login");
  }
//  if (roleLoading) return;
  if (isLoading) {
    console.log("User role is still loading… Please wait");
    return; // prevent navigation before DB role loads
  }

  const role =userData?.role;
  console.log("Role fetched from DB:", role);

  if (role === "admin") {
    console.log("Navigating to ADMIN dashboard");
    navigate("/adminDashboard");
  } 
  else if (role === "volunteer") {
    console.log("Navigating to VOLUNTEER dashboard");
    navigate("/volunteerDashboard");
  } 
  else {
    console.log("Navigating to DONOR dashboard");
    navigate("/donorDashboard");
  }
};



  return (
   
   <>
   <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 
      ${scrolled ? "  bg-gradient-to-r from-rose-100 to-rose-200 shadow-md" : "bg-white shadow-sm"}`}
    >

  <div className="max-w-[90%] mx-auto navbar">

    {/* LEFT */}
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>

        <ul
          tabIndex={-1}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          {links}
        </ul>
      </div>


{logo}

    </div>

    {/* CENTER (Desktop Only) */}
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {links}
      </ul>
    </div>

{
  user ?     <div className="navbar-end">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full ">
            <img
              alt="User Avatar"
              src={user.photoURL}
            />
            
          </div>
    
        </div>
      

        <ul
          tabIndex={-1}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
       
        <li>  <Link
        //  to="dashboard"
        onClick={handleDashboard}
         ><a>Dashboard</a></Link></li>
          <li><a onClick={handleLogOut}>Logout</a></li>
        </ul>
      </div>
    </div>
:

<div className="navbar-end">
  <NavLink
    to="/loginRegistration"
    className="
      px-5 py-2.5
      rounded-xl
      bg-gradient-to-r from-rose-500 to-rose-700
      text-white
      font-medium
      shadow-md
      hover:from-rose-600 hover:to-rose-800
      transition
      duration-200
    "
  >
    Sign In
  </NavLink>
</div>

}
  
    {/* RIGHT */}

  </div>
</div>



   </>
  );
};
