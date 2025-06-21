"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleUnlockView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaController_1 = require("../../PhantomArenaController");
class PhantomArenaRoleUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.CardRoleId = 0, this.IsWaitingChange = !1, this.RoleTexture = void 0, this.AMo = () => {
      0 < ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length ? this.ShowNext() : this.CloseMe()
    }, this.Xlu = e => {
      this.IsWaitingChange && "Change" === e && this.RefreshViewByCardRoleId(this.CardRoleId)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [2, UE.UITexture],
      [4, UE.UISprite],
      [1, UE.UIItem],
      [3, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [0, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [0, this.AMo]
    ]
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(!1), this.GetItem(1).SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1120"), this.CardRoleId = ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.shift();
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(this.CardRoleId),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e.RoleTexture, UE.Texture);
    this.RoleTexture = await e.Promise, this.RefreshViewByCardRoleId(this.CardRoleId)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Xlu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Xlu)
  }
  RefreshViewByCardRoleId(e) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e),
      i = e.RoleConfigId,
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.Name), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.BgDesc), this.GetTexture(2).SetTexture(this.RoleTexture)
  }
  ShowNext() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRoleUnlockView", async () => {
      await this.ShowNextAsync()
    });
    this.RunAsyncTask(e)
  }
  async ShowNextAsync() {
    var e;
    0 !== ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length && (this.CardRoleId = ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.shift(), e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(this.CardRoleId), e = new LoadAsyncPromise_1.LoadAsyncPromise(e.RoleTexture, UE.Texture), this.RoleTexture = await e.Promise, this.IsWaitingChange = !0, await this.PlaySequenceAsync("Switch"), this.IsWaitingChange = !1)
  }
  OnAfterDestroy() {
    PhantomArenaController_1.PhantomArenaController.PostUnlockView()
  }
}
exports.PhantomArenaRoleUnlockView = PhantomArenaRoleUnlockView;
//# sourceMappingURL=PhantomArenaRoleUnlockView.js.map