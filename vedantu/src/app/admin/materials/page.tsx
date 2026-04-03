"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  Video,
  Star,
  Download,
  Clock,
  Eye,
  EyeOff,
  Loader2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { getItems, addItem, updateItem, deleteItem } from "@/lib/firestoreService";
import { StudyMaterialFull } from "@/types";

const SUBJECTS = [
  { id: "all", name: "All Subjects" },
  { id: "math", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "english", name: "English" },
  { id: "social", name: "Social Studies" },
  { id: "hindi", name: "Hindi" },
];

const CLASSES = [
  { id: "all", name: "All Classes" },
  { id: "6", name: "Class 6" },
  { id: "7", name: "Class 7" },
  { id: "8", name: "Class 8" },
  { id: "9", name: "Class 9" },
  { id: "10", name: "Class 10" },
  { id: "11", name: "Class 11" },
  { id: "12", name: "Class 12" },
];

const TYPES = [
  { id: "notes", name: "Notes" },
  { id: "video", name: "Video" },
  { id: "formula", name: "Formula Sheet" },
  { id: "guide", name: "Guide" },
  { id: "mcq", name: "MCQ Bank" },
  { id: "solutions", name: "Solutions" },
];

const FORMATS = ["PDF", "MP4", "DOCX", "PPTX", "ZIP"];

const emptyForm: Partial<StudyMaterialFull> = {
  title: "",
  subject: "math",
  classLevel: "10",
  type: "notes",
  format: "PDF",
  size: "",
  pages: undefined,
  duration: "",
  downloads: 0,
  rating: 4.5,
  description: "",
  chapters: [],
  preview: true,
  fileUrl: "",
  status: "active",
};

export default function MaterialsManagement() {
  const [materials, setMaterials] = useState<StudyMaterialFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterialFull | null>(null);
  const [formState, setFormState] = useState<Partial<StudyMaterialFull>>(emptyForm);
  const [chaptersInput, setChaptersInput] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (selectedMaterial) {
      setFormState(selectedMaterial);
      setChaptersInput((selectedMaterial.chapters || []).join("\n"));
    } else {
      setFormState(emptyForm);
      setChaptersInput("");
    }
  }, [selectedMaterial]);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const data = await getItems<StudyMaterialFull>("study_materials");
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const chapters = chaptersInput.split("\n").filter((c) => c.trim() !== "");
    const payload = {
      ...formState,
      chapters,
      downloads: Number(formState.downloads) || 0,
      rating: Number(formState.rating) || 0,
      pages: formState.pages ? Number(formState.pages) : undefined,
    };

    setIsSaving(true);
    try {
      if (selectedMaterial?.id) {
        await updateItem("study_materials", selectedMaterial.id, payload);
        alert("Material updated successfully!");
      } else {
        await addItem("study_materials", payload);
        alert("Material added successfully!");
      }
      setIsModalOpen(false);
      fetchMaterials();
    } catch (error) {
      alert("Failed to save material.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this material?")) {
      try {
        await deleteItem("study_materials", id);
        alert("Material deleted successfully!");
        fetchMaterials();
      } catch (error) {
        alert("Failed to delete material.");
      }
    }
  };

  const openAddModal = () => {
    setSelectedMaterial(null);
    setIsModalOpen(true);
  };

  const openEditModal = (material: StudyMaterialFull) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="text-red-500" size={18} />;
      default: return <FileText className="text-blue-500" size={18} />;
    }
  };

  const filtered = materials.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSubject = filterSubject === "all" || m.subject === filterSubject;
    return matchSearch && matchSubject;
  });

  const totalDownloads = materials.reduce((sum, m) => sum + (m.downloads || 0), 0);
  const avgRating =
    materials.length > 0
      ? (materials.reduce((sum, m) => sum + (m.rating || 0), 0) / materials.length).toFixed(1)
      : "—";

  return (
    <AdminLayout title="Study Materials Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Study Materials</h1>
            <p className="text-gray-500 mt-1">
              Manage free study resources {loading && "(Loading...)"}
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Material
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500 text-sm">Total Materials</p>
            <p className="text-2xl font-bold mt-1">{materials.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500 text-sm">Active</p>
            <p className="text-2xl font-bold mt-1 text-green-600">
              {materials.filter((m) => (m.status || "active") === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500 text-sm">Total Downloads</p>
            <p className="text-2xl font-bold mt-1">{totalDownloads.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-gray-500 text-sm">Avg Rating</p>
            <p className="text-2xl font-bold mt-1 flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              {avgRating}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Materials Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No materials found.</p>
              <button
                onClick={openAddModal}
                className="mt-4 text-blue-600 hover:underline text-sm"
              >
                Add your first material
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject / Class</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Downloads</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(m.type)}
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{m.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{m.format} • {m.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="capitalize">{m.subject}</span>
                        {m.classLevel !== "all" && <span className="ml-1 text-gray-400">• Class {m.classLevel}</span>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">{m.type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5 text-gray-400" />
                          {(m.downloads || 0).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                          {m.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                          (m.status || "active") === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {(m.status || "active") === "active" ? (
                            <><CheckCircle className="w-3 h-3" /> Active</>
                          ) : (
                            <><AlertCircle className="w-3 h-3" /> Draft</>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(m)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(m.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold">{selectedMaterial ? "Edit Material" : "Add Material"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    required
                    type="text"
                    value={formState.title || ""}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Class 10 Maths Complete Notes"
                  />
                </div>

                {/* Subject + Class */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select
                      value={formState.subject || "math"}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {SUBJECTS.filter(s => s.id !== "all").map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Level *</label>
                    <select
                      value={formState.classLevel || "10"}
                      onChange={(e) => setFormState({ ...formState, classLevel: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CLASSES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Type + Format */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      value={formState.type || "notes"}
                      onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {TYPES.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Format *</label>
                    <select
                      value={formState.format || "PDF"}
                      onChange={(e) => setFormState({ ...formState, format: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {FORMATS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Size + Pages/Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File Size *</label>
                    <input
                      required
                      type="text"
                      value={formState.size || ""}
                      onChange={(e) => setFormState({ ...formState, size: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 15.2 MB"
                    />
                  </div>
                  {formState.type === "video" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={formState.duration || ""}
                        onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 8 hours"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                      <input
                        type="number"
                        value={formState.pages || ""}
                        onChange={(e) => setFormState({ ...formState, pages: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 245"
                      />
                    </div>
                  )}
                </div>

                {/* Downloads + Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Downloads</label>
                    <input
                      type="number"
                      value={formState.downloads || 0}
                      onChange={(e) => setFormState({ ...formState, downloads: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0–5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formState.rating || 4.5}
                      onChange={(e) => setFormState({ ...formState, rating: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <input
                    required
                    type="text"
                    value={formState.description || ""}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short description of this material"
                  />
                </div>

                {/* Chapters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chapters (one per line)</label>
                  <textarea
                    rows={3}
                    value={chaptersInput}
                    onChange={(e) => setChaptersInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={"Real Numbers\nPolynomials\nQuadratic Equations"}
                  />
                </div>

                {/* File URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File URL (for download)</label>
                  <input
                    type="url"
                    value={formState.fileUrl || ""}
                    onChange={(e) => setFormState({ ...formState, fileUrl: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>

                {/* Preview + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formState.status || "active"}
                      onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formState.preview || false}
                        onChange={(e) => setFormState({ ...formState, preview: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Allow Preview</span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Save Material"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
