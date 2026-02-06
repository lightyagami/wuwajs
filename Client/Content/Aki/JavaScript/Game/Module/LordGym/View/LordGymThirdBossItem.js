"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymThirdBossItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LordGymDefine_1 = require("../LordGymDefine");
const LordGymLordEntranceItem_1 = require("./LordGymLordEntranceItem");
class LordGymThirdBossItem extends LordGymLordEntranceItem_1.LordGymLordEntranceItem {
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([4, UE.UIItem]);
    this.ComponentRegisterInfos.push([5, UE.UIItem]);
    this.ComponentRegisterInfos.push([6, UE.UIItem]);
    this.ComponentRegisterInfos.push([7, UE.UISprite]);
  }
  Refresh(e, r, t) {
    var s;
    if (e === 0) {
      this.GetItem(6)?.SetUIActive(true);
      this.GetItem(5)?.SetUIActive(false);
      this.GetExtendToggle(3)?.SetToggleStateForce(2);
    } else {
      this.GetItem(6)?.SetUIActive(false);
      this.GetItem(5)?.SetUIActive(true);
      s = ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceWithNewTag();
      this.GetItem(4)?.SetUIActive(s.includes(e));
      this.SetSpriteByPath(StringUtils_1.StringUtils.Format(LordGymDefine_1.LORD_GYM_THIRD_BOSS_ICON_PATH, e.toString(), e.toString()), this.GetSprite(7), true);
      super.Refresh(e, r, t);
    }
  }
}
exports.LordGymThirdBossItem = LordGymThirdBossItem;
//# sourceMappingURL=LordGymThirdBossItem.js.map