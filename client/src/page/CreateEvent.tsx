import React, { useState } from "react";
import {
  DatePicker,
  TimePicker,
  Switch,
  Upload,
  Button,
  InputNumber,
} from "antd";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import PopupModal from "../component/PopupAlert";
import { useEventContext } from "../context/EventContext";
import { API_BASE_URL } from '../config/api';
import dayjs from "dayjs";

const { Dragger } = Upload;

const categories = [
  "Academic",
  "Cultural",
  "Career",
  "Competition",
  "Social",
  "Sport",
  "Workshop",
  "Volunteer",
];

const CreateEvent: React.FC = () => {
const navigate = useNavigate();
const { addEvent } = useEventContext();

  const [form, setForm] = useState({
    title: "",
    location: "",
    hours: "",
    organizer: "",
    phone: "",
    description: "",
    date: null as any,
    time: null as any,
    maxCapacityUnlimited: true,
    maxCapacityNumber: 0,
    walkIn: false,
    reminder: false,
    reminderDays: 1,
    reminderTime: null as any,
    poster: null as File | null,
    proposal: null as File | null,
    categories: [] as string[],
  });
  
  const [loading, setLoading] = useState(false);

	const [modal, setModal] = useState<{
		show: boolean;
		title: string;
		message: React.ReactNode;
		onConfirm?: () => void;
  		confirmColor?: "green" | "red" | "blue"; // <-- exact type
		}>({
		show: false,
		title: "",
		message: "",
		
	});


  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCategoryToggle = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const handleFileChange = (key: string, info: any) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      handleChange(key, file);
    }
  };

  
  const handleCancel = () => {
  setModal({
    show: true,
    title: "Cancel Event Creation?",
    message: (
      <>
        This will remove event you entered.<br />
        Do you want to continue?
      </>
    ),
    onConfirm: () => {
      setModal(prev => ({ ...prev, show: false }));
      navigate("/organizer/dashboard");
    },
  });
};


const handleSubmit = () => {
  // Validation
  if (!form.title || !form.location || !form.description || !form.organizer || !form.phone || !form.date || !form.time || form.categories.length === 0) {
    alert('Please fill in all required fields');
    return;
  }
  
  if (!form.poster) {
    alert('Please upload poster file');
    return;
  }
  
  setModal({
    show: true,
    title: "Save Event?",
    message: <>Do you want to save this event?</>,
    confirmColor: "green",
    onConfirm: async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        
        // Required fields
        formData.append('title', form.title);
        formData.append('location', form.location);
        formData.append('description', form.description);
        formData.append('eventBy', form.organizer);
        formData.append('eventContactEmail', localStorage.getItem('userEmail') || form.organizer + '@example.com');
        formData.append('eventContactPhone', form.phone);
        formData.append('walkIn', form.walkIn.toString());
        
        // Date/Time - combine date and time
        const startDateTime = dayjs(form.date)
          .hour(dayjs(form.time).hour())
          .minute(dayjs(form.time).minute())
          .toISOString();
        formData.append('startsAt', startDateTime);
        formData.append('endsAt', startDateTime);
        
        // Categories - send all selected categories
        form.categories.forEach(cat => {
          formData.append('eventCategory', cat.toUpperCase());
        });
        
        // Optional fields
        if (form.hours) formData.append('activityHour', form.hours);
        if (!form.maxCapacityUnlimited && form.maxCapacityNumber) {
          formData.append('capacity', form.maxCapacityNumber.toString());
        }
        
        // Files
        if (form.poster) formData.append('poster', form.poster);
        if (form.proposal) formData.append('filePdf', form.proposal);
        
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/events/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          setModal(prev => ({ ...prev, show: false }));
          navigate("/organizer/success");
        } else {
          setModal(prev => ({ ...prev, show: false }));
          alert('Error: ' + result.message);
        }
      } catch (error) {
        console.error('Error creating event:', error);
        setModal(prev => ({ ...prev, show: false }));
        alert('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });
};

  return (
<div className="flex flex-col min-h-screen bg-bg-light">
  <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] lg:top-[50px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
      {/* Back Button */}
      <div className="flex justify-start mb-4 lg:mb-0">
        <button
          onClick={() => navigate("/organizer/dashboard")}
          className="flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-[10px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
      </div>

      {/* Navbar Centered */}
      <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
        <Navbar />
      </div>
    </div>

	 <div className="flex justify-center px-[25px] sm:px-[35px] lg:pt-[80px]">
  		<div className="w-full max-w-[1200px] bg-white rounded-[20px] shadow-md p-6 sm:p-8 md:p-10 mt-[30px] lg:mt-[50px] mb-[10px]">
		<h1 className="font-bold text-[30px] mb-5">Create Event</h1>

        {/* Event Title */}
        <div className="mb-4">
          <label className="font-medium">Event Title</label>
          <input
            type="text"
  			className="w-full border rounded-lg mt-1 p-2 hover:border-[#3EBAD0] focus:border-[#3EBAD0] focus:ring-2 focus:ring-[#3EBAD0]/20"
            placeholder="Enter Event Name"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Location & Activity Hours */}
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-medium">Location</label>
            <input
              type="text"
              className="w-full border rounded-lg mt-1 p-2 "
              placeholder="Enter Location"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">
              Activity Hours <span className="text-support3">(Optional)</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-lg mt-1 p-2 "
              placeholder="Enter Activity Hours"
              value={form.hours}
              onChange={(e) => handleChange("hours", e.target.value)}
            />
          </div>
        </div>

        {/* Organizer Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-medium">Organizer Name</label>
            <input
              type="text"
              className="w-full border rounded-lg mt-1 p-2 "
              placeholder="Enter Organizer Name"
              value={form.organizer}
              onChange={(e) => handleChange("organizer", e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Organizer Phone Number</label>
            <input
              type="text"
              className="w-full border rounded-lg mt-1 p-2 "
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="font-medium">Description</label>
          <textarea
            className="w-full border rounded-lg mt-1 p-2"
            placeholder="Enter Description"
            rows={3}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-medium">Date</label>
            <DatePicker
              className="w-full mt-1 custom-date-picker"
              onChange={(date) => handleChange("date", date)}
              suffixIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 md:size-7 mr-[4px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          <div>
            <label className="font-medium">Time</label>
            <TimePicker
              className="w-full mt-1 custom-time-picker"
              onChange={(time) => handleChange("time", time)}
			  suffixIcon={
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
				className="size-6 md:size-7 mr-[4px]">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>
			  }
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <label className="font-medium">Event Category</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryToggle(cat)}
                className={`px-3 py-1 rounded-full border font-medium ${
                  form.categories.includes(cat)
                    ? "bg-primary text-white border-primary "
                    : "bg-white text-text-black border-support4 hover:bg-[#3EBAD0]/50 hover:border-[#3EBAD0]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4 mb-6">
          {/* --- Maximum Capacity --- */}
          <div>
            <div className="flex items-center gap-3">
              <span className="font-medium">Maximum Capacity</span>
              <Switch
				checked={form.maxCapacityUnlimited}
				onChange={(checked) => handleChange("maxCapacityUnlimited", checked)}
				/>

              <span
				className={`text-sm font-medium ${
					form.maxCapacityUnlimited ? "text-primary" : "text-support3"
				}`}
				>
				{form.maxCapacityUnlimited ? "Unlimited" : "Limited"}
				</span>

            </div>

            {!form.maxCapacityUnlimited && (
              <div className="flex items-center gap-3 mt-3">
                <InputNumber
				  className="custom-input-number"
                  min={0}
                  value={form.maxCapacityNumber}
                  onChange={(v) => handleChange("maxCapacityNumber", v)}
                />
                <span className="text-support3 text-sm">
                  Maximum {form.maxCapacityNumber ?? 0} participants allowed
                </span>
              </div>
            )}
          </div>

          {/* --- Walk in --- */}
          <div className="flex items-center gap-3">
			<span className="font-medium">Walk-in status</span>
			<Switch
				checked={form.walkIn}
				onChange={(v) => handleChange("walkIn", v)}
			/>
			<span
				className={`text-sm font-medium ${
				form.walkIn ? "text-[#3EBAD0]" : "text-support3"
				}`}
			>
				{form.walkIn ? "ON" : "OFF"}
			</span>
			</div>


          {/* --- Reminder --- */}
          <div>
            <div className="flex items-center gap-3">
				<span className="font-medium">Reminder</span>
				<Switch
					checked={form.reminder}
					onChange={(v) => handleChange("reminder", v)}
				/>
				<span
					className={`text-sm font-medium ${
					form.reminder ? "text-[#3EBAD0]" : "text-support3"
					}`}
				>
					{form.reminder ? "ON" : "OFF"}
				</span>
				</div>


            {form.reminder && (
				<div className="flex items-center gap-3 mt-3">
					<InputNumber
					className="custom-input-number"
					min={0}
					value={form.reminderDays}
					onChange={(v) => handleChange("reminderDays", v)}
					/>
					<span className="text-support3 text-sm">
					Reminder {form.reminderDays ?? 0} day(s) before event starts
					</span>
				</div>
				)}
          </div>
        </div>

        {/* File Upload */}
		<div className="mb-6">
		<label className="flex gap-1 font-medium">
			Poster <div className="text-support3 mb-[10px]"> (Optional) </div>
		</label>
		<Dragger
			beforeUpload={() => false}
			onChange={(info) => handleFileChange("poster", info)}
			maxCount={1}
			className="mt-2"
		>
			<div className="flex flex-col items-center justify-center">
			<p className="ant-upload-drag-icon">
				<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-12 h-12 text-center text-night-default"
				>
				<path
					fillRule="evenodd"
					d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
					clipRule="evenodd"
				/>
				<path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
				</svg>
			</p>
			<p className="ant-upload-text text-text-black text-center">
				Choose a file or drag & drop it here
			</p>
			<p className="ant-upload-hint text-support3 text-center">
				JPEG and PNG formats, up to 50MB
			</p>
			<button
              className="flex gap-[10px] mt-[15px] bg-primary hover:bg-primaryhover text-white font-semibold px-[15px] py-[5px] rounded-[8px] flex-shrink-0"
            >
			  Browse File
            </button>
			</div>
		</Dragger>
		</div>


        <div className="mb-8">
          <label className="flex gap-1  font-medium mb-[10px]">Event Proposal <div className="text-support3"> (Optional) </div> </label>
          <Dragger
			beforeUpload={() => false}
			onChange={(info) => handleFileChange("proposal", info)}
			maxCount={1}
			className="mt-2"
			accept=".pdf"
		>
			<div className="flex flex-col items-center justify-center">
			<p className="ant-upload-drag-icon">
				<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-12 h-12 text-center text-night-default"
				>
				<path
					fillRule="evenodd"
					d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
					clipRule="evenodd"
				/>
				<path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
				</svg>
			</p>
			<p className="ant-upload-text text-text-black text-center">
				Choose a file or drag & drop it here
			</p>
			<p className="ant-upload-hint text-support3 text-center">
				PDF formats, up to 50MB
			</p>
			<button
              className="flex gap-[10px] mt-[15px] bg-primary hover:bg-primaryhover text-white font-semibold px-[15px] py-[5px] rounded-[8px] flex-shrink-0"
            >
			  Browse File
            </button>
			</div>
		</Dragger>
        </div>

        {/* Buttons */}
		<div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 font-semibold text-[14px] sm:text-[16px]">
          <button 
			onClick={handleCancel}
		  	className="px-5 py-2 bg-support1 hover:bg-support2 text-support3 rounded-[8px] w-full sm:w-auto">
			Cancel
			</button>
			<button 
			    onClick={handleSubmit}
				disabled={loading}
				className="bg-night-default hover:bg-night-hover disabled:bg-gray-400 text-white px-5 py-2 rounded-[8px] w-full sm:w-auto">
			{loading ? 'Creating...' : 'Submit'}
			</button>
        </div>
      </div>
	  </div>
	  {/* Popup Modal */}
		{modal.show && (
		<PopupModal
			title={modal.title}
			message={modal.message}
			onConfirm={modal.onConfirm}
			confirmText="Yes" 
			cancelText="Back"
			confirmColor={modal.confirmColor} // pass the color
			onCancel={() => setModal(prev => ({ ...prev, show: false }))}
		/>
		)}

	   <footer className="flex items-center justify-center py-[20px] text-[14px] font-normal mt-auto bg-bg-light">
        © 2025 Schedio. All rights reserved.
      </footer>
    </div>
  );
};

export default CreateEvent;
