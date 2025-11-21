"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteSelectOption = undefined;
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
class SequenceQteSelectOption extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  OnCommonQteFinished() {
    this.OptionIndex = this.Context.SelectOption;
    super.OnCommonQteFinished();
  }
}
exports.SequenceQteSelectOption = SequenceQteSelectOption;
//# sourceMappingURL=SequenceQteSelectOption.js.map