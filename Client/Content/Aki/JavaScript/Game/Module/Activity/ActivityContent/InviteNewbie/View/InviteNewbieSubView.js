"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieSubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const InviteNewbieActivityItem_1 = require("./InviteNewbieActivityItem");
const InviteNewbieRewardItem_1 = require("./InviteNewbieRewardItem");
class InviteNewbieSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.C5c = undefined;
    this.qsi = undefined;
    this.Xk1 = e => {
      this.GetText(3)?.SetText(e ?? "");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[2, ActivityControllerHolder_1.ActivityControllerHolder.ActivityInviteNewbieController.HandleOnCopyInviteCodeClick]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InviteNewbieInviteCodeChanged, this.Xk1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InviteNewbieInviteCodeChanged, this.Xk1);
  }
  async OnBeforeStartAsync() {
    this.C5c = new InviteNewbieActivityItem_1.InviteNewbieActivityItem();
    this.qsi = new InviteNewbieRewardItem_1.InviteNewbieRewardItem();
    await Promise.all([this.C5c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner(), this.ActivityBaseData), this.qsi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
    this.qsi.SetUiActive(false);
  }
  OnRefreshView() {
    var e = ModelManager_1.ModelManager.InviteNewbieModel;
    this.OnTimer(0);
    this.GetText(3)?.SetText(e.InviteCode);
  }
  OnTimer(e) {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.C5c?.RefreshTimerTextByData(t, i);
  }
}
exports.InviteNewbieSubView = InviteNewbieSubView;
//# sourceMappingURL=InviteNewbieSubView.js.map