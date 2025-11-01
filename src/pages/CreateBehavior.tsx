import { Layout } from "@/components/layout/Layout";
import { CreateBehaviorForm } from "@/components/forms/CreateBehaviorForm";
import { Card } from "@/components/ui/card";

export default function CreateBehavior() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Report Meter Behavior</h1>
            <p className="text-muted-foreground">
              Document unusual meter behavior, issues, or anomalies with detailed symptoms and solutions.
            </p>
          </div>

          <Card className="p-6">
            <CreateBehaviorForm />
          </Card>
        </div>
      </div>
    </Layout>
  );
}
