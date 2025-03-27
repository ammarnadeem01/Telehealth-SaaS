import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QRisrAUyWhv2BJJEZuloD30bghszbUNPHimu7Q3OV8FiMaQtfsc41TowmAZW14kTd42LaVcp9qnFgGrCnvHX1g000KfwbCX0M"
);

const CheckoutForm: React.FC<{ appointmentId: string }> = ({
  appointmentId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch Payment Intent
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [appointmentId]);

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      alert("Payment failed: " + result.error.message);
    } else {
      // Confirm Payment in Backend
      await fetch("http://localhost:3000/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId }),
      });

      alert("Payment successful!");
    }
  };

  return (
    <div>
      <CardElement />
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white p-2 mt-4 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

const Payment: React.FC<{ appointmentId: string }> = ({ appointmentId }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm appointmentId={appointmentId} />
  </Elements>
);

export default Payment;
