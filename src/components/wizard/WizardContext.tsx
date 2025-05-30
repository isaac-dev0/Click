import { createContext, useContext, useState } from "react";

export enum StepStatus {
  COMPLETED,
  IN_PROGRESS,
  PENDING,
}

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepStatus: (step: number) => StepStatus;
}

interface WizardProviderProps {
  children: React.ReactNode;
  initialStep?: number;
  totalSteps: number;
  onBeforeNext?: () => boolean;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({
  children,
  initialStep = 0,
  totalSteps,
  onBeforeNext
}: WizardProviderProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      if (onBeforeNext) {
        const shouldProceed = onBeforeNext();
        if (!shouldProceed) {
          return;
        }
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepStatus = (step: number) => {
    if (step < currentStep) return StepStatus.COMPLETED;
    if (step === currentStep) return StepStatus.IN_PROGRESS;
    return StepStatus.PENDING;
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        goToStep,
        nextStep,
        previousStep,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === totalSteps - 1,
        stepStatus,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);

  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider.");
  }

  return context;
}
