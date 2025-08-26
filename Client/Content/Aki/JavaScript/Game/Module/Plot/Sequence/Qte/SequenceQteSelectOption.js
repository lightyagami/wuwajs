"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteSelectOption = undefined;
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
class SequenceQteSelectOption extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  OnFinishQte() {
    this.OptionIndex = this.Context.SelectOption;
    super.OnFinishQte();
  }
}
exports.SequenceQteSelectOption = SequenceQteSelectOption;
//# sourceMappingURL=SequenceQteSelectOption.js.map