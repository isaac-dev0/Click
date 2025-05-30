import { WizardStepConfig } from "@/components/wizard/Wizard";
import { useWizard } from "@/components/wizard/WizardContext";
import { Progress } from "../ui/progress";

interface WizardHeaderProps {
  steps: WizardStepConfig[];
}

export function WizardHeader({ steps }: WizardHeaderProps) {
  const { currentStep, totalSteps } = useWizard();

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <Progress value={progressPercentage} className="bg-secondary" />
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <div>
            <div className="text-muted text-lg font-medium mb-2">
              Step {currentStep + 1}/{totalSteps}
            </div>
            <h2 className="text-foreground text-5xl font-bold">
              {steps[currentStep].title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
