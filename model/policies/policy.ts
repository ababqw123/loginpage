import {LoginContext, LoginObject, add_register } from "../context/User"

export interface ILoginPolicyResult {
    status: number;
    message?: string;
    user? : LoginContext;
    current? : LoginObject
}

export abstract class Policy {
    public abstract apply(context: LoginContext | add_register): Promise<ILoginPolicyResult>;
}