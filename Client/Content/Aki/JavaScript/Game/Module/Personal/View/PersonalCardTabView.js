"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalCardTabView = undefined;
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const PersonalCardComponent_1 = require("./PersonalCardComponent");
class PersonalCardTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.z5i = undefined;
  }
  OnStart() {
    this.z5i ||= new PersonalCardComponent_1.PersonalCardComponent(this.RootItem, true, this.ExtraParams);
  }
  OnBeforeDestroy() {
    if (this.z5i) {
      this.z5i.Destroy();
      this.z5i = undefined;
    }
  }
}
exports.PersonalCardTabView = PersonalCardTabView;
//# sourceMappingURL=PersonalCardTabView.js.map