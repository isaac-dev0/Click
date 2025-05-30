import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AccountType, getAccountTypesArray } from "@/utils/enum/AccountType";

interface AccountTypeStepProps {
  onAccountTypeSelected: (type: AccountType) => void;
  selectedType?: AccountType;
}

export function AccountTypeStep({
  onAccountTypeSelected,
  selectedType,
}: AccountTypeStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-around">
        {getAccountTypesArray().map((type) => (
          <div
            key={type}
            className={cn(
              "p-6 rounded-lg transition-all duration-300 border-2 text-center shadow-sm",
              selectedType === type 
                ? "border-primary bg-primary/10" 
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold">Are you a {type}?</h2>
              <Button
                className="w-full cursor-pointer"
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => onAccountTypeSelected(type)}
              >
                I am a {type}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
