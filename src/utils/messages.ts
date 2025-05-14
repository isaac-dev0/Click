enum Type {
  ERROR, WARNING, SUCCESS
};

export enum EErrorMessage {
  CANNOT_VERIFY_EMAIL, CANNOT_VERIFY_OTP
}

export enum EWarningMessage { }

export enum ESuccessMessage { }

export interface IStatusMessage {
  id: EErrorMessage | EWarningMessage | ESuccessMessage;
  type: Type;
  message: string;
} 

const messages: IStatusMessage[] = [
  {
    id: EErrorMessage.CANNOT_VERIFY_EMAIL,
    type: Type.ERROR,
    message: "Unable to verify the provided email address."
  },
  {
    id: EErrorMessage.CANNOT_VERIFY_OTP,
    type: Type.ERROR,
    message: "Unable to verify the provided one-time password."
  }
];

export const getMessage = (
  id: EErrorMessage | EWarningMessage | ESuccessMessage
): IStatusMessage | undefined => {
  return messages.find(message => message.id === id);
}