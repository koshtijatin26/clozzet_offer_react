import { useState } from 'react';


function Home() {
  const [formData, setFormData] = useState({
    storeName: '',
    name: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex justify-center items-center p-8 box-border text-center">
        <div className="bg-white p-12 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-[scaleIn_0.4s_ease-out]">
          <h1 className="text-brand-blue mb-4 text-[1.75rem] font-bold mt-0">Thank You!</h1>
          <p className="text-gray-500 text-lg">Your offer claim has been submitted successfully.</p>
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
              <label className={`flex items-center justify-center cursor-pointer font-semibold text-[1rem] text-[#555] bg-[#f8f9fa] border-2 border-[#e0e0e0] rounded-xl p-4 flex-1 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] relative hover:bg-white hover:border-[#b0d8f7] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${formData.storeName === 'Store A' ? 'bg-[#e6f4ff] border-brand-blue text-[#0c69d4] shadow-[0_4px_12px_rgba(66,168,238,0.15)]' : ''}`}>
                <input
                  type="radio"
                  name="storeName"
                  value="Store A"
                  checked={formData.storeName === 'Store A'}
                  onChange={handleChange}
                  className="hidden"
                  required
                />
                Store A
              </label>
              <label className={`flex items-center justify-center cursor-pointer font-semibold text-[1rem] text-[#555] bg-[#f8f9fa] border-2 border-[#e0e0e0] rounded-xl p-4 flex-1 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] relative hover:bg-white hover:border-[#b0d8f7] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${formData.storeName === 'Store B' ? 'bg-[#e6f4ff] border-brand-blue text-[#0c69d4] shadow-[0_4px_12px_rgba(66,168,238,0.15)]' : ''}`}>
                <input
                  type="radio"
                  name="storeName"
                  value="Store B"
                  checked={formData.storeName === 'Store B'}
                  onChange={handleChange}
                  className="hidden"
                  required
                />
                Store B
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
      </div>
    </div>
  );
}

export default Home;
