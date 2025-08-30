// FormViewer.tsx
import React, { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import { formFields } from '../types/types';
import type { FieldDef } from '../types/types';
import '../styles/formViewer.css';

export function FormViewer() {
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<FieldValues>({ mode: 'onBlur' });
  // ---- Optional: append additional user-descriptor fields here
  const appendedFields: FieldDef[] = [
    { name: 'middleName',   label: 'Middle Name',     type: 'text' },
    { name: 'dateOfBirth',  label: 'Date of Birth',   type: 'date' },
    { name: 'city',         label: 'City',            type: 'text' },
    { name: 'state',        label: 'State/Province',  type: 'text' },
    { name: 'country',      label: 'Country',         type: 'text' },
    { name: 'occupation',   label: 'Occupation',      type: 'text' },
  ];
  // Combine your existing schema with the extra fields
  const fields: FieldDef[] = useMemo(() => [...formFields, ...appendedFields], []);
  const [activeIdx, setActiveIdx] = useState(0);
  // Go forward only if the current field validates
  const tryNext = async () => {
    const fld = fields[activeIdx];
    if (!fld) return;
    const valid = await trigger(fld.name);
    if (valid) setActiveIdx(i => Math.min(i + 1, fields.length));
  };
  // Go back safely
  const tryPrev = () => setActiveIdx(i => Math.max(i - 1, 0));
  // From the submit screen, go back to the last field
  const goToLastField = () => setActiveIdx(fields.length - 1);
  // Final PDF generation: reuse the same HTML preview
  const onFinish = (data: Record<string, string>) => {
    const doc = new jsPDF({ unit: 'in', format: 'letter' });
    fields.forEach((fld, i) => {
      const x = fld.layout?.x ? parseFloat(fld.layout.x) : 1;
      const y = fld.layout?.y ? parseFloat(fld.layout.y) : 1 + i * 0.5;
      doc.setFontSize(12);
      doc.text(`${fld.label}: ${data[fld.name] ?? ''}`, x, y);
    });
    doc.save('form.pdf');
  };

  return (
    <div className="fv-container">
      {/* ───── LEFT: Form Fields ───── */}
      <form
        className="fv-formPane"
        onKeyDown={async e => {
          // Enter advances one step
          if (e.key === 'Enter' && activeIdx < fields.length) {
            e.preventDefault();
            await tryNext();
          }
          // Optional: Alt+ArrowLeft for Back
          if ((e.altKey || e.metaKey) && e.key === 'ArrowLeft') {
            e.preventDefault();
            tryPrev();
          }
        }}
        onSubmit={handleSubmit(onFinish)}
      >
        <AnimatePresence mode="wait">
          {fields.map((fld: FieldDef, idx: number) =>
            idx === activeIdx && (
              <motion.div
                key={fld.name}
                className="fv-fieldWrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* No visible <label>; placeholder is the visual indicator. Keep aria-label for a11y */}
                <Controller
                  name={fld.name}
                  control={control}
                  rules={{ required: fld.required ? `${fld.label} is required` : false }}
                  render={({ field }) => (
                    <input
                      className="fv-input"
                      id={fld.name}
                      {...field}
                      placeholder={fld.label}
                      aria-label={fld.label}
                      type={fld.type}
                      autoFocus
                      style={{ padding: 0 }}
                    />
                  )}
                />

                {errors[fld.name] && (
                  <p className="fv-error">{String(errors[fld.name]?.message ?? '')}</p>
                )}

                {/* Back/Next navigation on intermediate steps */}
                {activeIdx < fields.length - 1 && (
                  <div className="fv-navRow">
                    {activeIdx > 0 && (
                      <button
                        type="button"
                        className="fv-back"
                        onClick={tryPrev}
                      >
                        ← <span className="fv-back-t">Back</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="fv-next"
                      onClick={tryNext}
                    >
                      <span className="fv-next-t">Next</span> →
                    </button>
                  </div>
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Submit screen (after last field). Show Back too. */}
        {activeIdx >= fields.length && (
          <div className="fv-navRow">
            <button
              type="button"
              className="fv-back"
              onClick={goToLastField}
            >
              ← Back
            </button>
            <button type="submit" className="fv-submit">
              Generate PDF
            </button>
          </div>
        )}
      </form>

      {/* ───── RIGHT: HTML “Page” Preview ───── */}
      <div className="fv-previewPane">
        <div className="fv-pagePreview">
          {fields.map((fld, i) => (
            <div
              key={fld.name}
              className="fv-pageField"
              style={{
                position: 'absolute',
                top:  fld.layout?.y ?? `${i * 0.5 + 1}in`,
                left: fld.layout?.x ?? '1in',
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
