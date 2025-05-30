import { StepStatus, useWizard } from "@/components/wizard/WizardContext";
import { cn } from "@/lib/utils";
import { Check, CircleDashed } from "lucide-react";

interface WizardStepIndicatorProps {
  step: number;
  title: string;
  isLast?: boolean;
}

export function WizardStepIndicator({
  step,
  title,
  isLast = false,
}: WizardStepIndicatorProps) {
  const { stepStatus } = useWizard();
  const status = stepStatus(step);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div
          className={cn(
            "rounded-full w-16 h-16 flex items-center justify-center border-2",
            status === StepStatus.COMPLETED
              ? "bg-emerald-500 border-emerald-600 text-white"
              : status === StepStatus.IN_PROGRESS
                ? "bg-blue-600 border-blue-700 text-white"
                : "bg-gray-700 border-gray-600 text-gray-300"
          )}
        >
          {status === StepStatus.COMPLETED && <Check size={24} className="text-white" />}
          {status === StepStatus.IN_PROGRESS && step + 1}
          {status === StepStatus.PENDING && (
            <CircleDashed size={22} className="text-gray-300" />
          )}
        </div>
        {!isLast && (
          <div className="h-1 flex-grow mx-1 w-24 md:w-32 lg:w-40">
            <div
              className={cn(
                "h-full",
                status === StepStatus.COMPLETED
                  ? "bg-emerald-500"
                  : status === StepStatus.IN_PROGRESS
                    ? "bg-gradient-to-r from-blue-600 to-gray-500 w-1/3"
                    : "bg-gray-600"
              )}
            ></div>
          </div>
        )}
      </div>
      <div className="text-center mt-2">
        <div className="text-gray-400 text-sm font-medium">Step {step + 1}</div>
        <div className="text-white text-xl font-bold">{title}</div>
        {status === StepStatus.COMPLETED && (
          <div className="mt-2">
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-500 text-white text-sm">
              Completed
            </span>
          </div>
        )}
        {status === StepStatus.IN_PROGRESS && (
          <div className="mt-2">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-sm">
              In Progress
            </span>
          </div>
        )}
        {status === StepStatus.PENDING && (
          <div className="mt-2">
            <span className="inline-block px-4 py-1 rounded-full bg-gray-700 text-gray-300 text-sm">
              Pending
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
