import { LoginForm, SubscribeSection } from "@/components";

export default function Home() {
  return (
    <div className="h-[500vh] bg-blue-100">
      <div className="h-[100vh] flex justify-center items-center">
        <LoginForm />
      </div>
      <SubscribeSection overrideCTAClick />
    </div>
  );
}
