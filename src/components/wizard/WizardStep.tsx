import { useWizard } from "@/components/wizard/WizardContext";
import { cn } from "@/lib/utils";

interface WizardStepProps {
  step: number;
  title: string;
  children?: React.ReactNode;
}

export function WizardStep({ step, title, children }: WizardStepProps) {
  const { currentStep, stepStatus } = useWizard();

  /* Render the children ONLY if this is the current step. */
  return (
    <div
      className={cn(
        "transition-opacity duration-300 h-full",
        currentStep === step ? "opacity-100" : "opacity-0 hidden"
      )}
    >
      <div className="space-y-4">{children}</div>
    </div>
  );
}
