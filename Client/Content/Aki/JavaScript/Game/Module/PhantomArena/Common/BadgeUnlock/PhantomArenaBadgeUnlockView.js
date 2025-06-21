"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBadgeUnlockView = void 0;
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
class PhantomArenaBadgeUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.BadgeId = 0, this.IsWaitingChange = !1, this.BadgeSprite = void 0, this.AMo = () => {
      0 < ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.length ? this.ShowNext() : this.CloseMe()
    }, this.Xlu = e => {
      this.IsWaitingChange && "Change" === e && (this.RefreshViewByBadgeId(this.BadgeId), this.IsWaitingChange = !1)
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
    this.GetItem(3).SetUIActive(!0), this.GetItem(1).SetUIActive(!1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1121"), this.BadgeId = ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.shift();
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(this.BadgeId),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e.ShowIcon, UE.LGUISpriteData_BaseObject);
    this.BadgeSprite = await e.Promise, this.RefreshViewByBadgeId(this.BadgeId)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Xlu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Xlu)
  }
  ShowNext() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaBadgeUnlockView", async () => {
      await this.ShowNextAsync()
    });
    this.RunAsyncTask(e)
  }
  async ShowNextAsync() {
    var e;
    0 !== ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.length && (this.BadgeId = ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.shift(), e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(this.BadgeId), e = new LoadAsyncPromise_1.LoadAsyncPromise(e.ShowIcon, UE.LGUISpriteData_BaseObject), this.BadgeSprite = await e.Promise, this.IsWaitingChange = !0, await this.PlaySequenceAsync("Switch"), this.IsWaitingChange = !1)
  }
  RefreshViewByBadgeId(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Name), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Desc), this.GetSprite(4).SetSprite(this.BadgeSprite)
  }
  OnAfterDestroy() {
    PhantomArenaController_1.PhantomArenaController.PostUnlockView()
  }
}
exports.PhantomArenaBadgeUnlockView = PhantomArenaBadgeUnlockView;
//# sourceMappingURL=PhantomArenaBadgeUnlockView.js.map