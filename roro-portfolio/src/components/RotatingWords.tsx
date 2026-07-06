"use client";

import { useEffect, useState } from "react";

const DEFAULT = ["IA appliquée", "plateformes SaaS", "automatisation", "applications métier"];

export default function RotatingWords({
  words = DEFAULT,
  typingSpeed = 70,
  deletingSpeed = 34,
  pause = 1500,
}: {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className="rotating">
      <span className="text-gradient">{text}</span>
      <span className="caret" aria-hidden="true" />
      <style>{`.rotating{ white-space:nowrap; }`}</style>
    </span>
  );
}
