"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import styles from "@/components/ui/KosSelect.module.css";

type Option = string | { value: string; label: string };

export default function KosSelect({ id, label, value, options, onChange, name, hideLabel = false }: {
    id?: string; label: string; value: string; options: Option[]; onChange: (value: string) => void; name?: string; hideLabel?: boolean;
}) {
    const normalized = options.map((option) => typeof option === "string" ? { value: option, label: option } : option);
    return <div className={styles.field}>
        {!hideLabel && <label htmlFor={id} className="text-button text_primary-color mb_8">{label}</label>}
        <Listbox value={value} onChange={onChange} name={name}>
            <ListboxButton id={id} aria-label={label} className={styles.button}>
                <span>{normalized.find((option) => option.value === value)?.label ?? "Pilih"}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </ListboxButton>
            <ListboxOptions anchor={{ to: "bottom start", gap: 8 }} transition className={styles.options}>
                {normalized.map((option) => <ListboxOption key={option.value} value={option.value} className={styles.option}>
                    {({ selected }) => <><span>{option.label}</span>{selected && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</>}
                </ListboxOption>)}
            </ListboxOptions>
        </Listbox>
    </div>;
}
