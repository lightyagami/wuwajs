"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieSubView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const InviteNewbieActivityItem_1 = require("./InviteNewbieActivityItem");
const InviteNewbieBgItem_1 = require("./InviteNewbieBgItem");
const InviteNewbieRewardItem_1 = require("./InviteNewbieRewardItem");
class InviteNewbieSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.C5c = undefined;
    this.qsi = undefined;
    this.iJs = undefined;
    this.oQu = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityInviteNewbieController.HandleOnCopyInviteCodeClick();
    };
    this.Xk1 = e => {
      this.GetText(3)?.SetText(e ?? "");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.oQu]];
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
    var e = this.ActivityBaseData;
    this.qsi.SetActivityData(e);
    this.iJs = new InviteNewbieBgItem_1.InviteNewbieBgItem();
    var e = e.BgPath ?? "";
    await Promise.all([this.C5c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner(), this.ActivityBaseData), this.qsi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.iJs.CreateThenShowByResourceIdAsync(e, this.GetItem(4))]);
    this.qsi.SetUiActive(false);
  }
  OnRefreshView() {
    var e = ModelManager_1.ModelManager.InviteNewbieModel;
    this.sSt();
    this.GetText(3)?.SetText(e.InviteCode);
    this.nQu();
  }
  OnTimer(e) {
    this.sSt();
  }
  sSt() {
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.C5c?.RefreshTimerTextByData(e, t);
  }
  nQu() {
    var e = ModelManager_1.ModelManager.InviteNewbieModel.InviteCode;
    var t = this.GetItem(5);
    if (t) {
      t.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(e));
    }
  }
}
exports.InviteNewbieSubView = InviteNewbieSubView;
//# sourceMappingURL=InviteNewbieSubView.js.map