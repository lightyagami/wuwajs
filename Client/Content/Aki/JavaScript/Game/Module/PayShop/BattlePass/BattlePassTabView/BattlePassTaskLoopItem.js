"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattlePassTaskLoopItem = exports.BattlePassTaskData = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattlePassController_1 = require("../BattlePassController"),
  BattlePassDefine_1 = require("../BattlePassDefine");
class BattlePassTaskData {
  constructor() {
    this.RewardItemList = [], this.TaskId = 0, this.TaskState = 1, this.UpdateType = 0, this.CurrentProgress = 0, this.TargetProgress = 0, this.Exp = 0, this.SkipId = void 0
  }
}
exports.BattlePassTaskData = BattlePassTaskData;
class BattlePassTaskLoopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.U2i = void 0, this.Yeu = void 0, this.Dsc = void 0, this.BOe = 0, this.eZs = void 0, this.zeu = () => {
      var t = this.eZs?.SkipId;
      void 0 !== t && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattlePassSkip, t)
    }, this.$kt = () => {
      BattlePassController_1.BattlePassController.TryRequestTaskList([this.BOe])
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [5, UE.UIItem]
    ], this.BtnBindInfo = [
      [4, this.zeu],
      [6, this.$kt]
    ]
  }
  OnStart() {
    this.U2i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid, this.U2i.Initialize(this.GetItem(5).GetOwner())
  }
  Refresh(t, e, s) {
    this.kp1(t)
  }
  async kp1(t) {
    this.eZs = t, this.U2i.Refresh(t.RewardItemList[0]), void 0 === this.Yeu && (this.Yeu = new BattlePassTaskLoopItemButton, await this.Yeu.CreateByActorAsync(this.GetButton(4).GetOwner())), void 0 === this.Dsc && (this.Dsc = new BattlePassTaskLoopItemButton, await this.Dsc.CreateByActorAsync(this.GetButton(6).GetOwner())), this.Yeu.RefreshTextByTextId(BattlePassDefine_1.BATTLE_PASS_BUTTON_JUMP_TEXT_ID), this.Dsc.RefreshTextByTextId(BattlePassDefine_1.BATTLE_PASS_BUTTON_RECEIVE_TEXT_ID), this.GetButton(4).RootUIComp.SetUIActive(1 === t.TaskState && void 0 !== t.SkipId), this.GetButton(6).RootUIComp.SetUIActive(3 === t.TaskState), this.GetText(3).SetUIActive(1 === t.TaskState && void 0 === t.SkipId), this.GetSprite(2).SetUIActive(2 === t.TaskState), this.BOe = t.TaskId;
    var e = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(this.BOe).TaskName;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e), this.GetText(1).SetText(t.CurrentProgress.toString() + "/" + t.TargetProgress.toString())
  }
}
exports.BattlePassTaskLoopItem = BattlePassTaskLoopItem;
class BattlePassTaskLoopItemButton extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem]
    ]
  }
  RefreshTextByTextId(t) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), t)
  }
}
//# sourceMappingURL=BattlePassTaskLoopItem.js.map