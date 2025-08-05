// FormViewer.tsx
import React, { useState } from 'react';
import {
  useForm,
  Controller,
} from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF                       from 'jspdf';
import { formFields }              from '../types/types';
import type { FieldDef }           from '../types/types';
import '../styles/formViewer.css';

export function FormViewer() {
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<FieldValues>({ mode: 'onBlur' });

  const [activeIdx, setActiveIdx] = useState(0);

  // Advance only if the current field validates
  const tryNext = async () => {
    const name = formFields[activeIdx].name;
    const valid = await trigger(name);
    if (valid) {
      setActiveIdx(i => Math.min(i + 1, formFields.length));
    }
  };

  // Final PDF generation: reuse the same HTML preview
  const onFinish = (data: Record<string,string>) => {
    const doc = new jsPDF({ unit: 'in', format: 'letter' });
    // render each field onto the PDF at x/y from layout or default grid
    formFields.forEach((fld, i) => {
      const x = fld.layout?.x ? parseFloat(fld.layout.x) : 1;
      const y = fld.layout?.y ? parseFloat(fld.layout.y) : 1 + i * 0.5;
      doc.setFontSize(12);
      doc.text(
        `${fld.label}: ${data[fld.name]}`, 
        x, 
        y
      );
    });
    doc.save('form.pdf');
  };

  return (
    <div className="fv-container">
      {/* ───── LEFT: Form Fields ───── */}
      <form
        className="fv-formPane"
        onKeyDown={async e => {
          if (e.key === 'Enter' && activeIdx < formFields.length) {
            e.preventDefault();
            await tryNext();
          }
        }}
        onSubmit={handleSubmit(onFinish)}
      >
        <AnimatePresence>
          {formFields.map((fld: FieldDef, idx: number) =>
            idx === activeIdx && (
              <motion.div
                key={fld.name}
                className="fv-fieldWrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit   ={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Controller
                  name={fld.name}
                  control={control}
                  rules={{ 
                    required: `${fld.label} is required` 
                  }}
                  render={({ field }) => (
                    <input
                      className='fv-input'
                      id={fld.name}
                      {...field}
                      placeholder={fld.label}
                      type={fld.type}
                      onBlur={tryNext}
                      autoFocus
                    />
                  )}
                />
                {errors[fld.name] && (
                  <p className="fv-error">
                    {errors[fld.name]?.message as string}
                  </p>
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>

        {activeIdx >= formFields.length && (
          <button type="submit" className="fv-submit">
            Generate PDF
          </button>
        )}
      </form>

      {/* ───── RIGHT: HTML “Page” Preview ───── */}
      <div className="fv-previewPane">
        <div className="fv-pagePreview">
          {formFields.map((fld, i) => (
            <div
              key={fld.name}
              className="fv-pageField"
              style={{
                position: 'absolute',
                top:  fld.layout?.y ?? `${i * 0.5 + 1}in`,
                left: fld.layout?.x ?? '1in'
              }}
            >
              <strong>{fld.label}</strong>: {getValues(fld.name) || '______'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormViewer;
