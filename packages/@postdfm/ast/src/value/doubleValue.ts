import { ASTType } from "../astType";
import { IFloat } from "./float";
import { Value } from "./value";

export class DoubleValue extends Value<IFloat> {
  constructor(value?: IFloat) {
    super(ASTType.Double, value || { integer: "0" });
  }
}
