"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalCardItem = undefined;
const UE = require("ue");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalCardBaseItem_1 = require("./PersonalCardBaseItem");
class PersonalCardItem extends PersonalCardBaseItem_1.PersonalCardBaseItem {
  constructor() {
    super(...arguments);
    this.TKd = false;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([3, UE.UIItem], [4, UE.UIItem]);
  }
  Refresh(e, r, s) {
    super.Refresh(e, r, s);
    var r = this.GetItem(3);
    var s = this.GetItem(4);
    var t = PersonalController_1.PersonalController.CheckCardIsUsing(this.CardConfig.Id);
    r.SetUIActive(t && !this.TKd);
    s.SetUIActive(!e.IsUnLock);
  }
  SetIsOtherCardItem(e) {
    this.TKd = e;
  }
}
exports.PersonalCardItem = PersonalCardItem;
//# sourceMappingURL=PersonalCardItem.js.map