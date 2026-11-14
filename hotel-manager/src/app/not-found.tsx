import Link from "next/link";
import Card from "@/components/ui/Card";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <Card title="Page not found">
          <p className="text-muted-foreground">
            This page doesn&apos;t exist, or the URL is no longer valid.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md border border-input px-4 py-2"
          >
            Return to home
          </Link>
        </Card>
      </div>
    </main>
  );
}
