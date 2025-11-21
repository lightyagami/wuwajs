"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeViewModel = undefined;
class TrapDefenseTalentTreeViewModel {
  constructor() {
    this.DelegatesOnNodeSelect = [];
    this.SelectedNode = undefined;
  }
  static Create() {
    return new TrapDefenseTalentTreeViewModel();
  }
  AddDelegateOnNodeSelect(e) {
    this.DelegatesOnNodeSelect.push(e);
  }
  RemoveDelegateOnNodeSelect(e) {
    e = this.DelegatesOnNodeSelect.indexOf(e);
    if (e !== -1) {
      this.DelegatesOnNodeSelect.splice(e, 1);
    }
  }
  SelectNode(e, t) {
    if (!!e && (!this.SelectedNode || this.SelectedNode.Id !== e.Id)) {
      this.SelectedNode = e;
      this.d$c(e, t);
    }
  }
  d$c(e, t) {
    for (const s of this.DelegatesOnNodeSelect) {
      s(e, t);
    }
  }
  OnViewClose() {
    this.DelegatesOnNodeSelect = [];
    this.SelectedNode = undefined;
  }
}
exports.TrapDefenseTalentTreeViewModel = TrapDefenseTalentTreeViewModel;
//# sourceMappingURL=TrapDefenseTalentTreeViewModel.js.map