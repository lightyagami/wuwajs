"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassUnlockView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BattlePassController_1 = require("./BattlePassController");
class BattlePassUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.F2i = undefined;
    this.ZOi = [];
    this.aki = () => {
      this.CloseMe();
    };
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.V2i = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText]];
    this.BtnBindInfo = [[4, this.V2i]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattlePassMainViewHide, this.aki);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattlePassMainViewHide, this.aki);
  }
  OnStart() {
    var e = this.OpenParam;
    this.ZOi = [];
    ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(e, this.ZOi);
    this.F2i = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.rOe);
    this.F2i.RefreshByData(this.ZOi);
    var t = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlock(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.UnlockTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.UnlockText);
    this.GetItem(2).SetUIActive(e === 1);
    this.GetItem(3).SetUIActive(e !== 1);
  }
  OnBeforeDestroy() {
    this.ZOi.length = 0;
    this.ZOi = undefined;
    this.F2i = undefined;
    if (this.OpenParam === 1) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattlePassFirstUnlockAnime);
    } else {
      BattlePassController_1.BattlePassController.PopHighUnlockReward();
    }
  }
}
exports.BattlePassUnlockView = BattlePassUnlockView;
//# sourceMappingURL=BattlePassUnlockView.js.map