"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoLevelItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
class FightPhotoLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnToggleCallBack = undefined;
    this.N8e = () => {
      this.OnToggleCallBack?.(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  Refresh(t, e, i) {
    this.Pe = t;
    t = this.Pe.IsDifficulty ? "FightPhotoDifficulty" : "FightPhotoEasy";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t);
    this.GetItem(1).SetUIActive(!this.Pe.IsUnLock);
    this.GetItem(2).SetUIActive(this.Pe.IsFinished);
    this.GetItem(4)?.SetUIActive(this.Pe.HasRedDot);
  }
  GetKey(t, e) {
    return t;
  }
  OnSelected(t) {
    var e;
    this.GetExtendToggle(0).SetToggleState(1);
    if (this.Pe.HasRedDot) {
      this.GetItem(4)?.SetUIActive(false);
      this.Pe.ReadRedDot();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFightPhotoLevelRedDot);
      e = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.GetActivityData();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
    }
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0);
  }
}
exports.FightPhotoLevelItem = FightPhotoLevelItem;
//# sourceMappingURL=FightPhotoLevelItem.js.map