/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { WorkExperience } from "@/types";
import {
  ArrowUpDown,
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export default function Editor({ data, setInfoData }: any ) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [formData, setFormData] = useState<WorkExperience | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const generateId = () =>
    `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleEdit = (exp: WorkExperience) => {
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

  const handleDescriptionChange = (content: string) => {
    console.log("Editor Content Updated:", content);
    setFormData((prev: any) => ({
      ...prev,
      description: content,
    }));
  };
 
  const handleSubmit = (id: any) => {
    if (formData) {
      setInfoData((prev: any) => {
        if (!prev || !prev.work) return prev;
        console.log(formData);
        return {
          ...prev,
          work: prev.work.map((exp: any) =>
            exp.id === id ? { ...exp, ...formData } : exp
          ),
        };
      });

      setExpanded(null);
      setFormData(null);
      setIsAdding(false);
      console.log(data);
    }
  };

  const handleAdd = (newExp: WorkExperience) => {
    setInfoData((prev: any) => {
      if (!prev) return { work: [newExp] };

      return {
        ...prev,
        work: prev.work ? [...prev.work, newExp] : [newExp],
      };
    });

    setExpanded(null);
    setFormData(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setInfoData((prev: any) => {
      if (!prev || !prev.work) return prev;

      return {
        ...prev,
        work: prev.work.filter((exp: WorkExperience) => exp.id !== id),
      };
    });

    setExpanded(null);
    setFormData(null);
  };

  const handleAddExperience = () => {
    setExpanded(null);
    setIsAdding(true);
    setFormData({
      id: "",
      name: "",
      location: "",
      position: "",
      startDate: "",
      endDate: "",
      description: [],
      completed: false,
    });
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-16">Snapmydesign</h1>
      <div className="max-w-2xl mx-auto  p-10 rounded-xl bg-white  shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(0,0,0,0.1)] mt-24">
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
            <ArrowUpDown size={38}  />
            <CircleHelp size={38} className="mx-6" />
            <Trash2 className="text-red-500" size={38} />
          </div>
        </div>

        {data.work.map((exp: any) => (
          <div key={exp.id} className="mt-6 border p-3 rounded-md bg-[#FAFAFA]">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleEdit(exp)}
            >
              <span className="text-xl font-medium">{exp.name}</span>
              <div className="flex items-center gap-2">
                {expanded === exp.name && (
                  <Trash2
                    className="text-red-500 cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(exp.id);
                    }}
                  />
                )}
                {expanded === exp.name ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {expanded === exp.name && formData && (
              <div className="mt-4 p-4 border rounded-md ">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="block w-full p-3 border rounded mt-3 text-xl font-medium"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="block w-full p-3 border rounded mt-3 text-xl font-medium"
                />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="block w-full p-3 border rounded mt-3 text-xl font-medium"
                />
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="Start Date"
                    className="block w-full p-3 border rounded mt-3 mr-2 text-xl font-medium"
                  />
                  <p>-</p>
                  <input
                    type="text"
                    name="endDate"
                    value={!formData.completed ? formData.endDate : "Present"}
                    onChange={handleChange}
                    placeholder="End Date"
                    className="block w-full p-3 border rounded mt-3 ml-2 text-xl font-medium"
                  />
                </div>
                <label className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    name="completed"
                    checked={
                      formData.endDate == "Present"
                        ? !formData.completed
                        : formData.completed
                    }
                    onChange={handleChange}
                    className="mr-2 h-7 w-7 rounded-lg text-xl font-medium "
                  />
                  I Currently work here
                </label>
                <RichTextEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />

                <button
                  onClick={() => handleSubmit(exp.id)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md text-xl font-semibold"
                >
                  {isAdding ? "Submit Details" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleAddExperience}
          className="mt-4 flex items-center font-semibold text-2xl gap-3 px-4 py-2 w-full justify-center bg-blue-500 text-white rounded-md"
        >
          <PlusCircle />
          Add Experience
        </button>

        {isAdding && formData && (
          <div className="mt-4 p-4 border rounded-md bg-[#FAFAFA]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Company Name"
              className="block w-full p-3  border rounded mt-3 text-xl font-medium"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="block w-full p-3 border rounded mt-3 text-xl font-medium"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              className="block w-full p-3 border rounded mt-3 text-xl font-medium"
            />
            <div className=" flex justify-between items-center">
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Start Date"
                className="block w-full p-3 mr-1 border rounded mt-3 text-xl font-medium"
              />
              <p>-</p>
              <input
                type="text"
                name="endDate"
                value={!formData.completed ? formData.endDate : "Present"}
                onChange={handleChange}
                placeholder="End Date"
                className="block w-full p-3 ml-1 border rounded mt-3 text-xl font-medium"
              />
            </div>
            <label className="flex items-center mt-3">
              <input
                type="checkbox"
                name="completed"
                checked={
                  formData.endDate == "Present"
                    ? !formData.completed
                    : formData.completed
                }
                onChange={handleChange}
                className="mr-2 w-6 h-6 accent-black text-xl font-medium"
              />
              I Currently work here
            </label>
            <RichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
            />
            <button
              onClick={() => handleAdd({ ...formData, id: generateId() })}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md text-xl font-semibold"
            >
              Submit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
