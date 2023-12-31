import { create } from "zustand";

export enum Section {
  Hero = "hero",
  About = "about",
  Experiences = "experiences",
  Projects = "projects",
}

type SectionStore = {
  section: Section;
  setSection: (section: Section) => void;
};

const useSectionStore = create<SectionStore>((set) => ({
  section: Section.Hero,
  setSection: (section) => set({ section }),
}));

export default useSectionStore;
