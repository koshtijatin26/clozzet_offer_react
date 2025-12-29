import { useState } from 'react';
import axios from 'axios';
import { API_URL_SELLER } from '../utils/constants';

const STORES = {
  VEIRDO: {
    id: "6909f5f8f0854cec27a78536",
    sellerId: "6909f5f8f0854cec27a78533"
  },
  JUNEBERRY: {
    id: "6909f7fbf0854cec27a7859d",
    sellerId: "6909f7fbf0854cec27a7859a"
  }
};

function Home() {
  const [formData, setFormData] = useState({
    storeId: '',
    name: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    alert("Coupon code copied!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let sellerId = "";
      if (formData.storeId === STORES.VEIRDO.id) {
        sellerId = STORES.VEIRDO.sellerId;
      } else if (formData.storeId === STORES.JUNEBERRY.id) {
        sellerId = STORES.JUNEBERRY.sellerId;
      }

      const payload = {
        storeId: formData.storeId,
        seller: sellerId,
        name: formData.name,
        mobileNo: formData.phone,
        countryCode: "91"
      };

      const response = await axios.post(`${API_URL_SELLER}offerInquiry/create-offer-inquiry`, payload);

      if (response.data.success) {
        setCouponCode(response.data.data.couponCode);
        setIsSubmitted(true);
      } else {
        alert(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Error submitting form.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex justify-center items-center p-8 box-border text-center">
        <div className="bg-white p-12 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-[scaleIn_0.4s_ease-out] w-full max-w-[480px]">
          <h1 className="text-brand-blue mb-4 text-[1.75rem] font-bold mt-0">Thank You!</h1>
          <p className="text-gray-500 text-lg mb-6">Your offer claim has been submitted successfully.</p>

          {couponCode && (
            <div className="bg-[#f0f9ff] border-2 border-brand-blue border-dashed rounded-xl p-6 mb-6">
              <p className="text-[#555] text-sm font-semibold uppercase tracking-wider mb-2">Your Coupon Code</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-2xl font-bold text-brand-blue tracking-widest">{couponCode}</span>
              </div>
            </div>
          )}

          <button
            onClick={copyToClipboard}
            className="w-full p-4 bg-brand-blue text-white border-none rounded-xl text-[1.1rem] font-semibold cursor-pointer transition-transform duration-200 shadow-none hover:bg-brand-blue-hover hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(66,168,238,0.3)]"
          >
            Copy Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center p-8 box-border">
      <div className="bg-white p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] w-full max-w-[480px] text-left animate-[slideUp_0.6s_ease-out]">
        <h1 className="text-[1.75rem] text-[#1a1a1a] mb-2 font-bold mt-0">Submit to Claim Offer</h1>
        <p className="text-gray-500 mb-8 text-[0.95rem]">Enter your details to unlock exclusive rewards.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6 bg-transparent border-none p-0">
            <label className="block mb-3 font-semibold text-[#333] text-[0.9rem]">Store Name</label>
            <div className="flex gap-4">
              <label className={`flex items-center justify-center cursor-pointer font-semibold text-[1rem] text-[#555] bg-[#f8f9fa] border-2 border-[#e0e0e0] rounded-xl p-4 flex-1 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] relative hover:bg-white hover:border-[#b0d8f7] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${formData.storeId === STORES.VEIRDO.id ? 'bg-[#e6f4ff] border-brand-blue text-[#0c69d4] shadow-[0_4px_12px_rgba(66,168,238,0.15)]' : ''}`}>
                <input
                  type="radio"
                  name="storeId"
                  value={STORES.VEIRDO.id}
                  checked={formData.storeId === STORES.VEIRDO.id}
                  onChange={handleChange}
                  className="hidden"
                  required
                />
                Veirdo
              </label>
              <label className={`flex items-center justify-center cursor-pointer font-semibold text-[1rem] text-[#555] bg-[#f8f9fa] border-2 border-[#e0e0e0] rounded-xl p-4 flex-1 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] relative hover:bg-white hover:border-[#b0d8f7] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${formData.storeId === STORES.JUNEBERRY.id ? 'bg-[#e6f4ff] border-brand-blue text-[#0c69d4] shadow-[0_4px_12px_rgba(66,168,238,0.15)]' : ''}`}>
                <input
                  type="radio"
                  name="storeId"
                  value={STORES.JUNEBERRY.id}
                  checked={formData.storeId === STORES.JUNEBERRY.id}
                  onChange={handleChange}
                  className="hidden"
                  required
                />
                Juneberry
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-semibold text-[#333] text-[0.9rem]">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-4 border-2 border-[#e0e0e0] rounded-xl text-[1rem] text-[#333] transition-all duration-200 box-border bg-[#f8f9fa] focus:border-brand-blue focus:bg-white focus:outline-none focus:shadow-[0_0_0_4px_rgba(66,168,238,0.1)]"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 font-semibold text-[#333] text-[0.9rem]">Phone Number</label>
            <input
              maxLength={10}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9999999999"
              className="w-full p-4 border-2 border-[#e0e0e0] rounded-xl text-[1rem] text-[#333] transition-all duration-200 box-border bg-[#f8f9fa] focus:border-brand-blue focus:bg-white focus:outline-none focus:shadow-[0_0_0_4px_rgba(66,168,238,0.1)]"
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="w-full p-4 bg-brand-blue text-white border-none rounded-xl text-[1.1rem] font-semibold cursor-pointer transition-transform duration-200 shadow-none mt-4 hover:bg-brand-blue-hover hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(66,168,238,0.3)] disabled:bg-[#ccc] disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
            {isLoading ? 'Submitting...' : 'Claim Offer'}
          </button>
        </form>

        <div className="mt-4 text-center border-t border-gray-100 pt-4">
          <p className="text-gray-400 mb-4 text-xs font-semibold uppercase tracking-widest">Download the app</p>
          <div className="flex justify-center gap-4">
            <a href="https://play.google.com/store/apps/details?id=com.app.clozzet&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-1">
              <img src="/images/playstore.webp" alt="Get it on Play Store" className="h-10 w-auto" />
            </a>
            <a href="https://apps.apple.com/us/app/clozzet-fashion-in-minutes/id6747312453" target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-1">
              <img src="/images/appstore.webp" alt="Download on the App Store" className="h-10 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
