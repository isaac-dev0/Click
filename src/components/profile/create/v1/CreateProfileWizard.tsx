"use client";

import { EErrorMessage, getMessage, IStatusMessage } from "@/utils/messages";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Wizard, WizardStepConfig } from "@/components/wizard/Wizard";
import {
  AccountDetailsData,
  AccountDetailsForm,
} from "./steps/AccountDetailsStep";
import {
  OrganisationDetailsData,
  OrganisationDetailsForm,
} from "./steps/OrganisationDetailsStep";
import { AccountType } from "@/utils/enum/AccountType";
import { WizardStep } from "@/components/wizard/WizardStep";
import { AccountTypeStep } from "./steps/AccountTypeStep";
import { useWizard } from "@/components/wizard/WizardContext";

// Define a union type of all possible form data
type FormData = {
  accountDetails?: AccountDetailsData;
  organisationDetails?: OrganisationDetailsData;
  accountType?: AccountType;
};

interface WizardContentProps {
  accountType: AccountType | undefined;
  formData: FormData;
  onAccountTypeSelected: (type: AccountType) => void;
  onFormDataUpdate: <K extends keyof FormData>(key: K, data: FormData[K]) => void;
  formRefs: {
    organisationDetailsRef: React.RefObject<HTMLFormElement | null>;
    accountDetailsRef: React.RefObject<HTMLFormElement | null>;
  };
}

function WizardContent({
  accountType,
  formData,
  onAccountTypeSelected,
  onFormDataUpdate,
  formRefs,
}: WizardContentProps) {
  const { nextStep } = useWizard();

  const handleSelectedAccountType = (type: AccountType) => {
    onAccountTypeSelected(type);
    nextStep();
  };

  const handleFormDataUpdate = <K extends keyof FormData>(
    key: K,
    data: FormData[K]
  ) => {
    onFormDataUpdate(key, data);
    nextStep();
  };

  return (
    <>
      <WizardStep step={0} title="How will you use Click?">
        <AccountTypeStep
          onAccountTypeSelected={handleSelectedAccountType}
          selectedType={accountType}
        />
      </WizardStep>

      {accountType === AccountType.ORGANISATION && (
        <WizardStep step={1} title="Organisation Details">
          <OrganisationDetailsForm
            formRef={formRefs.organisationDetailsRef}
            onSubmit={(data) =>
              handleFormDataUpdate("organisationDetails", data)
            }
            defaultValues={formData.organisationDetails}
          />
        </WizardStep>
      )}

      {accountType === AccountType.JOB_SEEKER && (
        <WizardStep step={1} title="Personal Details">
          <AccountDetailsForm
            formRef={formRefs.accountDetailsRef}
            onSubmit={(data) => handleFormDataUpdate("accountDetails", data)}
            defaultValues={formData.accountDetails}
          />
        </WizardStep>
      )}

      {accountType === AccountType.RECRUITER && (
        <WizardStep step={1} title="Personal Details">
          <AccountDetailsForm
            formRef={formRefs.accountDetailsRef}
            onSubmit={(data) => handleFormDataUpdate("accountDetails", data)}
            defaultValues={formData.accountDetails}
          />
        </WizardStep>
      )}
    </>
  );
}

export function CreateProfileWizard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<
    IStatusMessage | undefined
  >();
  const [accountType, setAccountType] = useState<AccountType | undefined>();
  const [formData, setFormData] = useState<FormData>({});

  const organisationDetailsRef = useRef<HTMLFormElement>(null);
  const accountDetailsRef = useRef<HTMLFormElement>(null);

  const handleSelectedAccountType = (type: AccountType) => {
    setAccountType(type);
    setFormData({ accountType: type });
  };

  const updateFormData = <K extends keyof FormData>(
    key: K,
    data: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  const handleBeforeNextStep = () => {
    if (accountType === AccountType.ORGANISATION) {
      const form = organisationDetailsRef.current;
      if (form) {
        form.requestSubmit();
        return false;
      }
    } else if (
      accountType === AccountType.JOB_SEEKER ||
      accountType === AccountType.RECRUITER
    ) {
      const form = accountDetailsRef.current;
      if (form) {
        form.requestSubmit();
        return false;
      }
    }
    return true;
  };

  const handleComplete = async () => {
    if (!handleBeforeNextStep()) {
      return;
    }

    setIsLoading(true);
    try {
      console.log("Combined Form Data:", formData);
      // TODO: Logic to create profile using formData
      toast("Profile has been successfully created.");
    } catch (error) {
      console.error(error);
      setErrorMessage(getMessage(EErrorMessage.CREATE_PROFILE_FAILURE));
      toast(errorMessage?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const baseSteps = [{ title: "How will you use Click?" }];

  const organisationSteps = [...baseSteps, { title: "Organisation Details" }];

  const jobSeekerSteps = [...baseSteps, { title: "Personal Details" }];

  const recruiterSteps = [...baseSteps, { title: "Personal Details" }];

  let steps: WizardStepConfig[] = baseSteps;

  if (accountType) {
    switch (accountType) {
      case AccountType.ORGANISATION:
        steps = organisationSteps;
        break;
      case AccountType.JOB_SEEKER:
        steps = jobSeekerSteps;
        break;
      case AccountType.RECRUITER:
        steps = recruiterSteps;
        break;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full">
        <Wizard
          steps={steps}
          onComplete={handleComplete}
          initialStep={0}
          onBeforeNext={handleBeforeNextStep}
        >
          <WizardContent
            accountType={accountType}
            formData={formData}
            onAccountTypeSelected={handleSelectedAccountType}
            onFormDataUpdate={updateFormData}
            formRefs={{
              organisationDetailsRef,
              accountDetailsRef,
            }}
          />
          {isLoading && <p className="text-foreground mt-4">Loading...</p>}
        </Wizard>
      </div>
    </div>
  );
}
