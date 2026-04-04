export function FilterSystem() {
  return (
    <div className="flex gap-4 p-4 border border-zinc-800 rounded-lg">
      <input 
        type="text" 
        placeholder="Search repositories..." 
        className="bg-black border border-zinc-700 px-3 py-1 rounded" 
      />
      <select className="bg-black border border-zinc-700 px-3 py-1 rounded">
        <option>All Languages</option>
      </select>
    </div>
  );
}
