export const Progress = ({ value }: { value: number }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  };