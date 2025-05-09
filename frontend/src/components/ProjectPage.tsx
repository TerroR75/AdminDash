"use client";
import Image from "next/image";
import { useState } from "react";

type Member = {
  name: string;
  avatar: string;
};

type Project = {
  id: number;
  name: string;
  description: string;
  progress: number;
  status: "W TRAKCIE" | "ZAKOŃCZONY" | "PLANOWANY";
  team: Member[];
  tasksDone: number;
  tasksTotal: number;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Nowa strona główna",
    description: "Redesign strony głównej firmy i poprawa UX.",
    progress: 70,
    status: "W TRAKCIE",
    tasksDone: 21,
    tasksTotal: 30,
    team: [
      { name: "Kamil Nowak", avatar: "/dev1.jpg" },
      { name: "Olga Wójcik", avatar: "/dev2.jpg" },
    ],
  },
  {
    id: 2,
    name: "Aplikacja mobilna",
    description: "Aplikacja mobilna dla klientów B2B.",
    progress: 45,
    status: "W TRAKCIE",
    tasksDone: 9,
    tasksTotal: 20,
    team: [
      { name: "Anna Kowalska", avatar: "/marketing1.jpg" },
      { name: "Michał Zieliński", avatar: "/sales1.jpg" },
    ],
  },
  {
    id: 3,
    name: "Automatyzacja CRM",
    description: "Zautomatyzowanie kontaktów w CRM i generowania leadów.",
    progress: 100,
    status: "ZAKOŃCZONY",
    tasksDone: 15,
    tasksTotal: 15,
    team: [
      { name: "Adam Sucholski", avatar: "/ceo.jpg" },
      { name: "Olga Wójcik", avatar: "/dev2.jpg" },
    ],
  },
];

const StatusBadge = ({ status }: { status: Project["status"] }) => {
  const color =
    status === "ZAKOŃCZONY"
      ? "bg-green-500"
      : status === "W TRAKCIE"
      ? "bg-yellow-500"
      : "bg-blue-500";

  return (
    <span className={`text-white text-xs font-medium px-2 py-1 rounded-full ${color}`}>
      {status}
    </span>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
        <p className="text-sm text-gray-500">{project.description}</p>
      </div>
      <StatusBadge status={project.status} />
    </div>

    <div className="flex flex-col gap-1">
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all"
          style={{ width: `${project.progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">
        {project.progress}% • {project.tasksDone}/{project.tasksTotal} zadań ukończonych
      </p>
    </div>

    <div className="flex -space-x-2 mt-2">
      {project.team.map((member, idx) => (
        <Image
          key={idx}
          src={member.avatar}
          alt={member.name}
          width={32}
          height={32}
          className="rounded-full ring-2 ring-white"
        />
      ))}
    </div>
  </div>
);

const ProjectsPage = () => {
  const [filter, setFilter] = useState<"WSZYSTKIE" | Project["status"]>("WSZYSTKIE");

  const filteredProjects =
    filter === "WSZYSTKIE"
      ? projects
      : projects.filter((proj) => proj.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Projekty firmy</h1>

      <div className="flex gap-3 mb-6">
        {["WSZYSTKIE", "W TRAKCIE", "ZAKOŃCZONY", "PLANOWANY"].map((status) => (
          <button
            key={status}
            className={`text-sm font-medium px-3 py-1.5 rounded-full border ${
              filter === status
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setFilter(status as any)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;