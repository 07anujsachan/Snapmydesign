/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
 import RichTextEditor from "./RichTextEditor";
import { useState, useEffect } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Trash2,
  PlusCircle,
  ArrowUpDown,
  CircleHelp,
} from "lucide-react";

type Experience = {
  name: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  completed: boolean;
};

export default function Editor({ data }: any) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setExperiences(data);
    }
  }, [data]);

  const handleEdit = (exp: Experience) => {
    setExpanded(exp.name === expanded ? null : exp.name);
    setFormData(expanded === exp.name ? null : { ...exp });
    setIsAdding(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : prev
    );
  };

  const handleSubmit = () => {
    if (formData) {
      setExperiences((prev) =>
        prev.some((exp) => exp.name === formData.name)
          ? prev.map((exp) => (exp.name === formData.name ? formData : exp))
          : [...prev, formData]
      );
      setExpanded(null);
      setFormData(null);
      setIsAdding(false);
    }
  };

  const handleDelete = (name: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.name !== name));
    setExpanded(null);
    setFormData(null);
  };

  const handleAddExperience = () => {
    setExpanded(null);
    setIsAdding(true);
    setFormData({
      name: "",
      location: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      completed: false,
    });
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-16">Snapmydesign</h1>
      <div className="max-w-2xl mx-auto mt-6 p-10 rounded-xl bg-white  shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(0,0,0,0.1)] mt-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex justify-between items-center">
            <BriefcaseBusiness size={40} />
            <div>
              <h1 className="text-3xl font-bold w-12 ml-8">
                Professional Experience
              </h1>
              <h3 className="text-2xl font-black italic ml-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                PREMIUM
              </h3>
            </div>
          </div>
          <div className="flex">
            <ArrowUpDown size={45} />
            <CircleHelp size={45} className="mx-6" />
            <Trash2 className="text-red-500" size={45} />
          </div>
        </div>

        {data.work.map((exp: any) => (
          <div
            key={exp.name}
            className="mt-4 border p-3 rounded-md bg-[#FAFAFA]"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleEdit(exp)}
            >
              <span className="font-medium">{exp.name}</span>
              <div className="flex items-center gap-2">
                {expanded === exp.name && (
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(exp.name);
                    }}
                  />
                )}
                {expanded === exp.name ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {expanded === exp.name && formData && (
              <div className="mt-4 p-4 border rounded-md">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="block w-full p-3 border rounded mt-2"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="block w-full p-3 border rounded mt-2"
                />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="block w-full p-3 border rounded mt-2"
                />
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder="Start Date"
                  className="block w-full p-3 border rounded mt-2"
                />
                <input
                  type="text"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  placeholder="End Date"
                  className="block w-full p-3 border rounded mt-2"
                />
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                    className="mr-2 h-7 w-7 rounded-lg"
                  />
                  I Currently work here
                </label>
                <RichTextEditor
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="block w-full p-2 border rounded mt-2"
                />

                <button
                  onClick={handleSubmit}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  {isAdding ? "Submit Details" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Experience Button */}
        <button
          onClick={handleAddExperience}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          <PlusCircle />
          Add Experience
        </button>

        {/* Form for Adding New Experience */}
        {isAdding && formData && (
          <div className="mt-4 p-4 border rounded-md">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Company Name"
              className="block w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="block w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              className="block w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="Start Date"
              className="block w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="End Date"
              className="block w-full p-2 border rounded mt-2"
            />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="mr-2 accent-black"
              />
              I Currently work here
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="block w-full p-2 border rounded mt-2"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
