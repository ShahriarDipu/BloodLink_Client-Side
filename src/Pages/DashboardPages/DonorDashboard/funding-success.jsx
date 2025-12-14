import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function FundingSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    axios.post("/fundings", {
      userEmail: user.email,
      amount: Number(localStorage.getItem("donationAmount")),
      stripeSessionId: sessionId,
    });
  }, []);

  return <h1>🎉 Thank you for your donation!</h1>;
}


// const { data: fundings = [] } = useQuery({
//   queryKey: ["fundings"],
//   queryFn: async () => {
//     const res = await axios.get("/fundings");
//     return res.data;
//   },
// });

// const totalFunding = fundings.reduce(
//   (sum, f) => sum + f.amount,
//   0
// );
