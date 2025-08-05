// types.ts
export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number';

  // …any other metadata (placeholder, row/col for absolute layout, etc)
}

export const formFields: FieldDef[] = [ 
  { name: 'firstName', label: 'First Name', type: 'text',},
  { name: 'lastName',  label: 'Last Name',  type: 'text',},
  { name: 'email',     label: 'Email',  type: 'email'},
  // …etc.
];
