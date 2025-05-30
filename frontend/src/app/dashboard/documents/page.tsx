"use client";

import { useState } from "react";
import { FileText, Plus } from "lucide-react";

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  uploadedBy: string;
  date: string;
  link: string;
}

const initialDocuments: Document[] = [
  {
    id: 1,
    title: "Raport sprzedaży - Marzec 2025",
    description: "Wykresy i dane dotyczące sprzedaży za marzec.",
    category: "Sprzedaż",
    uploadedBy: "Anna Kowalska",
    date: "2025-04-01",
    link: "#",
  },
  {
    id: 2,
    title: "Plan kampanii - Maj",
    description: "Strategia marketingowa na maj.",
    category: "Marketing",
    uploadedBy: "Jan Nowak",
    date: "2025-04-25",
    link: "#",
  },
];

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    uploadedBy: "",
    link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: Document = {
      ...form,
      id: documents.length + 1,
      date: new Date().toISOString().split("T")[0],
    };
    setDocuments([newDoc, ...documents]);
    setForm({ title: "", description: "", category: "", uploadedBy: "", link: "" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📁 Dokumenty firmowe</h1>

      {/* Lista dokumentów */}
      <div className="space-y-4 mb-10">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 rounded-lg shadow-sm flex items-start gap-4 border-l-4 border-blue-500"
          >
            <FileText className="text-blue-500 mt-1" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <span className="text-xs text-gray-500">{doc.date}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
              <div className="text-sm text-gray-500 mt-2 flex items-center justify-between">
                <span>Kategoria: <strong>{doc.category}</strong></span>
                <span>Autor: <strong>{doc.uploadedBy}</strong></span>
              </div>
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                Otwórz dokument
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Formularz dodawania */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} /> Dodaj nowy dokument
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Tytuł dokumentu"
            className="w-full border px-4 py-2 rounded text-sm"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Opis dokumentu"
            className="w-full border px-4 py-2 rounded text-sm h-24"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded text-sm"
            required
          >
            <option value="">Wybierz kategorię</option>
            <option value="Sprzedaż">Sprzedaż</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finanse">Finanse</option>
          </select>
          <input
            name="uploadedBy"
            value={form.uploadedBy}
            onChange={handleChange}
            placeholder="Imię i nazwisko autora"
            className="w-full border px-4 py-2 rounded text-sm"
            required
          />
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Link do pliku / dokumentu"
            className="w-full border px-4 py-2 rounded text-sm"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Dodaj dokument
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentsPage;