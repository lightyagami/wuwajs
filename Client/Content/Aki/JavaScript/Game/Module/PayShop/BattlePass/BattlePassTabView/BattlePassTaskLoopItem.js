"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassTaskLoopItem = exports.BattlePassTaskData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattlePassController_1 = require("../BattlePassController");
const BattlePassDefine_1 = require("../BattlePassDefine");
class BattlePassTaskData {
  constructor() {
    this.RewardItemList = [];
    this.TaskId = 0;
    this.TaskState = 1;
    this.UpdateType = 0;
    this.CurrentProgress = 0;
    this.TargetProgress = 0;
    this.Exp = 0;
    this.SkipId = undefined;
  }
}
exports.BattlePassTaskData = BattlePassTaskData;
class BattlePassTaskLoopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.U2i = undefined;
    this.$tu = undefined;
    this.Dsc = undefined;
    this.BOe = 0;
    this.eZs = undefined;
    this.Wtu = () => {
      var t = this.eZs?.SkipId;
      if (t !== undefined) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattlePassSkip, t);
      }
    };
    this.$kt = () => {
      BattlePassController_1.BattlePassController.TryRequestTaskList([this.BOe]);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIButtonComponent], [6, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Wtu], [6, this.$kt]];
  }
  OnStart() {
    this.U2i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.U2i.Initialize(this.GetItem(5).GetOwner());
  }
  Refresh(t, e, s) {
    this.nv1(t);
  }
  async nv1(t) {
    this.eZs = t;
    this.U2i.Refresh(t.RewardItemList[0]);
    if (this.$tu === undefined) {
      this.$tu = new BattlePassTaskLoopItemButton();
      await this.$tu.CreateByActorAsync(this.GetButton(4).GetOwner());
    }
    if (this.Dsc === undefined) {
      this.Dsc = new BattlePassTaskLoopItemButton();
      await this.Dsc.CreateByActorAsync(this.GetButton(6).GetOwner());
    }
    this.$tu.RefreshTextByTextId(BattlePassDefine_1.BATTLE_PASS_BUTTON_JUMP_TEXT_ID);
    this.Dsc.RefreshTextByTextId(BattlePassDefine_1.BATTLE_PASS_BUTTON_RECEIVE_TEXT_ID);
    this.GetButton(4).RootUIComp.SetUIActive(t.TaskState === 1 && t.SkipId !== undefined);
    this.GetButton(6).RootUIComp.SetUIActive(t.TaskState === 3);
    this.GetText(3).SetUIActive(t.TaskState === 1 && t.SkipId === undefined);
    this.GetSprite(2).SetUIActive(t.TaskState === 2);
    this.BOe = t.TaskId;
    var e = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(this.BOe).TaskName;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    this.GetText(1).SetText(t.CurrentProgress.toString() + "/" + t.TargetProgress.toString());
  }
}
exports.BattlePassTaskLoopItem = BattlePassTaskLoopItem;
class BattlePassTaskLoopItemButton extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
  }
  RefreshTextByTextId(t) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), t);
  }
}
//# sourceMappingURL=BattlePassTaskLoopItem.js.map