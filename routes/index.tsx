import App from "../components/App.tsx";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-stretch overflow-y-hidden bg-white dark:bg-gray-900">
      <App />
    </div>
  );
}
