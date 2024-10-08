import { BuyButton, LoginForm } from "@/components";

export default function Home() {
  return (
    <div className="h-[500vh] bg-blue-100 grid grid-rows-[20px_1fr_20px] align-start justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <BuyButton />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
