export enum AccountType {
  ORGANISATION = "Organisation",
  JOB_SEEKER = "Job Seeker",
  RECRUITER = "Recruiter", 
}

export const getAccountTypesArray = () => Object.values(AccountType);