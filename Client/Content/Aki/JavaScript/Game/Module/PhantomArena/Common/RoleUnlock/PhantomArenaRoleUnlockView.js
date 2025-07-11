"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleUnlockView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaController_1 = require("../../PhantomArenaController");
class PhantomArenaRoleUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CardRoleId = 0;
    this.IsWaitingChange = false;
    this.RoleTexture = undefined;
    this.AMo = () => {
      if (ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length > 0) {
        this.ShowNext();
      } else {
        this.CloseMe();
      }
    };
    this.vCu = e => {
      if (this.IsWaitingChange && e === "Change") {
        this.RefreshViewByCardRoleId(this.CardRoleId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UITexture], [4, UE.UISprite], [1, UE.UIItem], [3, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(false);
    this.GetItem(1).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1120");
    this.CardRoleId = ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.shift();
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(this.CardRoleId);
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e.RoleTexture, UE.Texture);
    this.RoleTexture = await e.Promise;
    this.RefreshViewByCardRoleId(this.CardRoleId);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.vCu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.vCu);
  }
  RefreshViewByCardRoleId(e) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    var i = e.RoleConfigId;
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.BgDesc);
    this.GetTexture(2).SetTexture(this.RoleTexture);
  }
  ShowNext() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRoleUnlockView", async () => {
      await this.ShowNextAsync();
    });
    this.RunAsyncTask(e);
  }
  async ShowNextAsync() {
    var e;
    if (ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length !== 0) {
      this.CardRoleId = ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.shift();
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(this.CardRoleId);
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e.RoleTexture, UE.Texture);
      this.RoleTexture = await e.Promise;
      this.IsWaitingChange = true;
      await this.PlaySequenceAsync("Switch");
      this.IsWaitingChange = false;
    }
  }
  OnAfterDestroy() {
    PhantomArenaController_1.PhantomArenaController.PostUnlockView();
  }
}
exports.PhantomArenaRoleUnlockView = PhantomArenaRoleUnlockView;
//# sourceMappingURL=PhantomArenaRoleUnlockView.js.map