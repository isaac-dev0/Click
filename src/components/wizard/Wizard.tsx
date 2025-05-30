import { cn } from "@/lib/utils";
import { WizardProvider } from "./WizardContext";
import { WizardHeader } from "./WizardHeader";
import { WizardControls } from "./WizardControls";

export interface WizardStepConfig {
  title: string;
}

interface WizardProps {
  steps: WizardStepConfig[];
  initialStep?: number;
  children: React.ReactNode;
  onComplete?: () => void;
  onBeforeNext?: () => boolean;
  className?: string;
}

export function Wizard({
  steps,
  initialStep = 0,
  children,
  onComplete,
  onBeforeNext,
  className,
}: WizardProps) {
  return (
    <WizardProvider
      initialStep={initialStep}
      totalSteps={steps.length}
      onBeforeNext={onBeforeNext}
    >
      <div className={cn("flex flex-col h-screen w-full", className)}>
        <div className="flex-1 bg-background p-8 flex flex-col">
          <WizardHeader steps={steps} />
          <div className="flex-1 flex flex-col justify-center">{children}</div>
          <WizardControls onComplete={onComplete} onBeforeNext={onBeforeNext} />
        </div>
      </div>
    </WizardProvider>
  );
}
