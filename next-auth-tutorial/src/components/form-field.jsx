// src/components/form-field.jsx
"use client";

export function FormField({ name, label, type = "text", register, errors }) {
  const message = errors[name]?.message;
  const errorId = `${name}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-[#34473c]">
        {label}
      </label>
      <input
        id={name}
        type={type}
        aria-invalid={!!message}
        aria-describedby={message ? errorId : undefined}
        className="w-full rounded-xl border border-[#dfe5dd] bg-[#fcfdfb] px-4 py-3 text-sm text-[#17211d] outline-none transition placeholder:text-[#9aa39c] hover:border-[#b9c9bc] focus:border-[#4a9168] focus:ring-4 focus:ring-[#176b4a]/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100"
        {...register(name)}
      />
      {message && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {message}
        </p>
      )}
    </div>
  );
}
