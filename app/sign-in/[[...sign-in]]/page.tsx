import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <SignIn
        // When user clicks "Create account", take them to sign-up mode
        signUpUrl="/sign-in?mode=sign-up"
        // After successful auth
        forceRedirectUrl="/"
      />
    </main>
  );
}
