"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDungeonEntryComponent = undefined;
class FbDungeonEntryComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
  }
  static Create(t) {
    if (t) {
      return new FbDungeonEntryComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
}
exports.FbDungeonEntryComponent = FbDungeonEntryComponent;
//# sourceMappingURL=FbDungeonEntryComponent.js.map