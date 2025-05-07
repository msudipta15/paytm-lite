interface type {
  open: () => void;
}

export function AdduserButton({ open }: type) {
  return (
    <div className="flex justify-center p-4 mt-2">
      <button
        onClick={() => open()}
        className="bg-blue-600 px-8 py-3 text-white font-medium text-xl rounded-lg cursor-pointer
      hover:bg-blue-800"
      >
        Add Reciever
      </button>
    </div>
  );
}
