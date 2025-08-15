import graphic from "../assets/supig8f.png";
import graphic2 from "../assets/supig9f.png";
import graphic3 from "../assets/supig11f.png";
import graphic4 from "../assets/supig6a.png";
// types.ts
export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number';
  layout?: {
    x?: string; // X position in inches
    y?: string; // Y position in inches
  }
  // …any other metadata (placeholder, row/col for absolute layout, etc)
}

export const formFields: FieldDef[] = [
  { name: 'firstName', label: 'First Name', type: 'text', },
  { name: 'lastName', label: 'Last Name', type: 'text', },
  { name: 'email', label: 'Email', type: 'email' },
  // …etc.
];// types.ts
export interface AccordionItemConfig {
  id: string;
  title: string;
  content: React.ReactNode;
  /** URL or import of the image to show when this item is open */
  imageSrc: string;
}

/** Example items */
export const accordionItems: AccordionItemConfig[] = [
  {
    id: 'profile',
    title: 'Profile',
    content: "This is the profile section. Here you can view and edit your personal information.",
    imageSrc: graphic,
  },
   {
    id: 'Health Concerns',
    title: 'Health Concerns',
    content: "This is the profile section. Here you can view and edit your personal information.",
    imageSrc: graphic2,
  },
   {
    id: 'Health Considerations',
    title: 'Health Considerations',
    content: "This is the profile section. Here you can view and edit your personal information.",
    imageSrc: graphic3,
  },
   {
    id: 'Personnel Roles',
    title: 'Personnel Roles',
    content: "This is the profile section. Here you can view and edit your personal information.",
    imageSrc: graphic4,
  },
  
];
