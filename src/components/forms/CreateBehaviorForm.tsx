import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllMeters } from "@/data/meterData";
import { saveBehavior } from "@/data/behaviorData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";

const behaviorSchema = z.object({
  meterId: z.string().min(1, "Please select a meter"),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  severity: z.enum(["low", "medium", "high", "critical"]),
  reportedBy: z.string().max(100).optional(),
});

type BehaviorFormData = z.infer<typeof behaviorSchema>;

export function CreateBehaviorForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState("");
  const [solutions, setSolutions] = useState<string[]>([]);
  const [solutionInput, setSolutionInput] = useState("");
  
  const meters = getAllMeters();

  const form = useForm<BehaviorFormData>({
    resolver: zodResolver(behaviorSchema),
    defaultValues: {
      meterId: "",
      title: "",
      description: "",
      severity: "medium",
      reportedBy: "",
    },
  });

  const addSymptom = () => {
    if (symptomInput.trim() && symptoms.length < 10) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput("");
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const addSolution = () => {
    if (solutionInput.trim() && solutions.length < 10) {
      setSolutions([...solutions, solutionInput.trim()]);
      setSolutionInput("");
    }
  };

  const removeSolution = (index: number) => {
    setSolutions(solutions.filter((_, i) => i !== index));
  };

  const onSubmit = (data: BehaviorFormData) => {
    try {
      if (symptoms.length === 0) {
        toast({
          title: "Missing symptoms",
          description: "Please add at least one symptom",
          variant: "destructive",
        });
        return;
      }

      if (solutions.length === 0) {
        toast({
          title: "Missing solutions",
          description: "Please add at least one solution",
          variant: "destructive",
        });
        return;
      }

      const selectedMeter = meters.find(m => m.id.toString() === data.meterId);
      
      const newBehavior = saveBehavior({
        meterId: parseInt(data.meterId),
        meterBrand: selectedMeter?.brand || "",
        meterModel: selectedMeter?.model || "",
        title: data.title,
        description: data.description,
        severity: data.severity,
        symptoms,
        solutions,
        reportedBy: data.reportedBy,
      });

      toast({
        title: "Success",
        description: "Meter behavior reported successfully",
      });

      navigate(`/behaviors/${newBehavior.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to report behavior",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="meterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meter</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a meter" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {meters.map((meter) => (
                    <SelectItem key={meter.id} value={meter.id.toString()}>
                      {meter.brand} - {meter.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Behavior Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Communication Timeout" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the behavior in detail..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="severity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Severity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Symptoms</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add a symptom"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSymptom())}
            />
            <Button type="button" onClick={addSymptom} variant="secondary">
              Add
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center gap-2 bg-secondary/50 p-2 rounded">
                <span className="flex-1 text-sm">{symptom}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSymptom(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel>Solutions</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add a solution"
              value={solutionInput}
              onChange={(e) => setSolutionInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSolution())}
            />
            <Button type="button" onClick={addSolution} variant="secondary">
              Add
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-center gap-2 bg-secondary/50 p-2 rounded">
                <span className="flex-1 text-sm">{solution}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSolution(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="reportedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reported By (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your name or role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Report Behavior
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
