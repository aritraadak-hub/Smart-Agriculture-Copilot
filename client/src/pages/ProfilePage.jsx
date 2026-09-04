import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  ShieldCheck,
  Calendar,
  Sprout,
  Edit3,
  CheckCircle2,
  Camera,
  Layers,
  Sparkles,
  LogOut
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Rajesh Kumar',
    email: user?.email || 'farmer@demo.com',
    phone: user?.phone || '+91 9876543210',
    state: user?.state || 'Punjab',
    district: user?.district || 'Ludhiana',
    preferredLanguage: user?.preferredLanguage || language || 'en',
    // Farm Information
    farmName: 'Green Valley Agro Farm',
    totalArea: '12.5 Acres',
    soilType: 'Alluvial Clay Loam',
    primaryCrop: 'Wheat (HD-2967) / Rice (Basmati 1121)',
    irrigationType: 'Sub-surface Drip & Canal Feed',
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Farmer profile & farm details updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-transparent flex text-slate-900 dark:text-slate-100">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-darkagri-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Farmer Identity & Account Overview
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Farmer Profile & Portfolio
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-xs rounded-xl hover:bg-rose-200 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: FARMER INFORMATION & AVATAR BANNER */}
        <div className="p-8 rounded-3xl bg-emerald-900 text-white shadow-saas border border-emerald-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Profile Image Placeholder Container */}
          <div className="md:col-span-3 flex flex-col items-center justify-center space-y-3">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full bg-emerald-800 border-4 border-emerald-500 shadow-xl flex items-center justify-center overflow-hidden text-emerald-200">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Farmer Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-14 h-14" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full shadow-lg border-2 border-emerald-900 cursor-pointer">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <span className="px-3 py-0.5 bg-emerald-950 text-emerald-300 font-extrabold text-[10px] uppercase rounded-full border border-emerald-700 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Farmer
            </span>
          </div>

          {/* Farmer Details */}
          <div className="md:col-span-9 space-y-3">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-white">{profileData.name}</h2>
              <p className="text-xs text-emerald-200 flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-emerald-400" /> {profileData.district}, {profileData.state}, India
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-800 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Email Address</span>
                <span className="font-semibold text-white truncate block">{profileData.email}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Phone Number</span>
                <span className="font-semibold text-white block">{profileData.phone}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Preferred Language</span>
                <span className="font-semibold text-white uppercase block">
                  {profileData.preferredLanguage === 'hi' ? 'Hindi (हिंदी)' : profileData.preferredLanguage === 'bn' ? 'Bengali (বাংলা)' : 'English (EN)'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 2: EDITABLE PROFILE & FARM INFORMATION */}
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Farmer Information Card */}
          <div className="lg:col-span-6 saas-card p-6 space-y-4">
            <div className="border-b border-slate-100 dark:border-darkagri-border pb-3 flex items-center justify-between">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" /> Personal & Contact Information
              </h3>
              <span className="badge-emerald font-bold">Personal Bio</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  disabled={!isEditing}
                  value={profileData.name}
                  onChange={handleChange}
                  className="saas-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditing}
                    value={profileData.email}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    disabled={!isEditing}
                    value={profileData.phone}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    disabled={!isEditing}
                    value={profileData.state}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    disabled={!isEditing}
                    value={profileData.district}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Preferred Language</label>
                <select
                  name="preferredLanguage"
                  disabled={!isEditing}
                  value={profileData.preferredLanguage}
                  onChange={(e) => {
                    handleChange(e);
                    setLanguage(e.target.value);
                  }}
                  className="saas-input"
                >
                  <option value="en">English (EN)</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="bn">Bengali (বাংলা)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Farm Information Card */}
          <div className="lg:col-span-6 saas-card p-6 space-y-4">
            <div className="border-b border-slate-100 dark:border-darkagri-border pb-3 flex items-center justify-between">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" /> Farm Land & Agriculture Details
              </h3>
              <span className="badge-emerald font-bold">Land Portfolio</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Farm Name</label>
                <input
                  type="text"
                  name="farmName"
                  disabled={!isEditing}
                  value={profileData.farmName}
                  onChange={handleChange}
                  className="saas-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Acreage</label>
                  <input
                    type="text"
                    name="totalArea"
                    disabled={!isEditing}
                    value={profileData.totalArea}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Soil Type</label>
                  <input
                    type="text"
                    name="soilType"
                    disabled={!isEditing}
                    value={profileData.soilType}
                    onChange={handleChange}
                    className="saas-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Primary Crop Cultivated</label>
                <input
                  type="text"
                  name="primaryCrop"
                  disabled={!isEditing}
                  value={profileData.primaryCrop}
                  onChange={handleChange}
                  className="saas-input"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Irrigation Method</label>
                <input
                  type="text"
                  name="irrigationType"
                  disabled={!isEditing}
                  value={profileData.irrigationType}
                  onChange={handleChange}
                  className="saas-input"
                />
              </div>

              {isEditing && (
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </form>

      </main>
    </div>
  );
};
