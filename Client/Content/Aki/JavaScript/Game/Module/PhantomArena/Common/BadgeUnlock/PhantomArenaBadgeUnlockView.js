"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBadgeUnlockView = undefined;
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
class PhantomArenaBadgeUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.BadgeId = 0;
    this.IsWaitingChange = false;
    this.BadgeSprite = undefined;
    this.AMo = () => {
      if (ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.length > 0) {
        this.ShowNext();
      } else {
        this.CloseMe();
      }
    };
    this.C0u = e => {
      if (this.IsWaitingChange && e === "Change") {
        this.RefreshViewByBadgeId(this.BadgeId);
        this.IsWaitingChange = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UITexture], [4, UE.UISprite], [1, UE.UIItem], [3, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(true);
    this.GetItem(1).SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1121");
    this.BadgeId = ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.shift();
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(this.BadgeId);
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e.ShowIcon, UE.LGUISpriteData_BaseObject);
    this.BadgeSprite = await e.Promise;
    this.RefreshViewByBadgeId(this.BadgeId);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.C0u);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.C0u);
  }
  ShowNext() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaBadgeUnlockView", async () => {
      await this.ShowNextAsync();
    });
    this.RunAsyncTask(e);
  }
  async ShowNextAsync() {
    var e;
    if (ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.length !== 0) {
      this.BadgeId = ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.shift();
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(this.BadgeId);
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e.ShowIcon, UE.LGUISpriteData_BaseObject);
      this.BadgeSprite = await e.Promise;
      this.IsWaitingChange = true;
      await this.PlaySequenceAsync("Switch");
      this.IsWaitingChange = false;
    }
  }
  RefreshViewByBadgeId(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Desc);
    this.GetSprite(4).SetSprite(this.BadgeSprite);
  }
  OnAfterDestroy() {
    PhantomArenaController_1.PhantomArenaController.PostUnlockView();
  }
}
exports.PhantomArenaBadgeUnlockView = PhantomArenaBadgeUnlockView;
//# sourceMappingURL=PhantomArenaBadgeUnlockView.js.map