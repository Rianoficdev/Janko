export function AdminHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 rounded-md border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl md:flex-row md:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.38em] text-amber-300">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl leading-7 text-zinc-400">{description}</p>
      </div>
      {action}
    </div>
  );
}
