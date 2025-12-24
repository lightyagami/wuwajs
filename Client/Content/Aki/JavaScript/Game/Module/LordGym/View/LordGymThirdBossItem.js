"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymThirdBossItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LordGymLordEntranceItem_1 = require("./LordGymLordEntranceItem");
class LordGymThirdBossItem extends LordGymLordEntranceItem_1.LordGymLordEntranceItem {
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([4, UE.UIItem]);
    this.ComponentRegisterInfos.push([5, UE.UIItem]);
    this.ComponentRegisterInfos.push([6, UE.UIItem]);
  }
  Refresh(e, r, s) {
    var t;
    if (e === 0) {
      this.GetItem(6)?.SetUIActive(true);
      this.GetItem(5)?.SetUIActive(false);
      this.GetExtendToggle(3)?.SetToggleStateForce(2);
    } else {
      this.GetItem(6)?.SetUIActive(false);
      this.GetItem(5)?.SetUIActive(true);
      t = ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceWithNewTag();
      this.GetItem(4)?.SetUIActive(t.includes(e));
      super.Refresh(e, r, s);
    }
  }
}
exports.LordGymThirdBossItem = LordGymThirdBossItem;
//# sourceMappingURL=LordGymThirdBossItem.js.map