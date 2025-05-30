import { Button } from "../ui/button";
import { useWizard } from "./WizardContext";

interface WizardControlsProps {
  onComplete?: () => void;
  onBeforeNext?: () => boolean;
}

export function WizardControls({ onComplete, onBeforeNext }: WizardControlsProps) {
  const { nextStep, previousStep, isFirstStep, isLastStep } = useWizard();

  const handleNextOrComplete = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      if (onBeforeNext && !onBeforeNext()) {
        return;
      }
      nextStep();
    }
  }

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="ghost"
        onClick={previousStep}
        disabled={isFirstStep}
        className="cursor-pointer"
      >
        Previous
      </Button>
      <Button onClick={handleNextOrComplete} variant="default">
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </div>
  );
}
