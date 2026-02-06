"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorLinkageRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const MotorLinkageBackgroundItem_1 = require("./Component/MotorLinkageBackgroundItem");
class ActivityMotorLinkageRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.iDm = undefined;
    this.rDm = -1;
    this.K3f = new Map();
    this.nJa = (t, e) => {
      if (t === "Switch" && e === "Switch" && (t = this.K3f.get(this.rDm))) {
        t.RefreshTexture();
      }
    };
    this.PWa = t => {
      if (t === ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController?.ActivityId) {
        this.oDm(this.rDm, true);
      }
    };
    this.qLn = () => {
      this.oDm(this.X3f());
    };
    this.GLn = () => {
      this.oDm(this.Y3f());
    };
    this.sDm = () => new MotorQuestItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[4, this.GLn], [5, this.qLn]];
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.iDm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.sDm);
    const r = [];
    this.nDm().forEach(t => {
      var e = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfig(t);
      var i = new MotorLinkageBackgroundItem_1.MotorLinkageBackgroundItem();
      i.SetIpId(t);
      this.K3f.set(t, i);
      r.push(i.CreateByResourceIdAsync(e.BackgroundPath, this.GetItem(6)));
    });
    await Promise.all(r);
  }
  OnStart() {
    this.Qyi?.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.K3f.forEach(t => {
      t = t.GetRootActor();
      if (t) {
        t.OnSequencePlayEvent.Bind(this.nJa);
      }
    });
  }
  OnBeforeShow() {
    let t = this.rDm;
    if (t === -1) {
      t = this.OpenParam ?? this.z3f(0);
    }
    this.oDm(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  oDm(t, e = false) {
    this.zW1(t, e);
    this.rDm = t;
    this.hDm(t);
    this.lDm(t, !e);
    this.J3f();
    this.mGe();
  }
  mGe() {
    var t = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfig(this.rDm);
    this.Qyi?.SetTitleLocalText(t.IpName);
  }
  J3f() {
    var t = ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData;
    var e = this.X3f();
    var e = t.IpHasAnyRewardCanReceive(e);
    this.GetItem(8)?.SetUIActive(e);
    var e = this.Y3f();
    var t = t.IpHasAnyRewardCanReceive(e);
    this.GetItem(7)?.SetUIActive(t);
  }
  zW1(t, e = false) {
    var i = this.K3f.get(this.rDm);
    if (t === this.rDm) {
      i?.Refresh(e);
    } else {
      if (i) {
        i.Hide();
      }
      this.K3f.get(t)?.Show();
    }
  }
  hDm(t) {
    var e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData;
    var i = e.GetIpCurrentProgress(t);
    var e = e.GetIpTotalProgress(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "MotorLinkage_IP_Progress", i, e);
  }
  lDm(t, e = true) {
    t = ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData.GetSortedQuestList(t);
    this.iDm?.RefreshByData(t, () => {}, e);
  }
  X3f() {
    var t = this.Z3f(this.rDm);
    var e = this.nDm().length;
    let i = t - 1;
    if (i < 0) {
      i += e;
    }
    return this.z3f(i);
  }
  Y3f() {
    var t = this.Z3f(this.rDm);
    var e = this.nDm().length;
    let i = t + 1;
    if (i >= e) {
      i -= e;
    }
    return this.z3f(i);
  }
  Z3f(e) {
    return this.nDm().findIndex(t => t === e);
  }
  z3f(t) {
    return this.nDm()[t];
  }
  nDm() {
    return ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData.GetSortedIpList();
  }
}
exports.ActivityMotorLinkageRewardView = ActivityMotorLinkageRewardView;
class MotorQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.FRe = -1;
    this.JPt = undefined;
    this.FVc = () => {
      const t = this.GetButton(1);
      t.SetSelfInteractive(false);
      var e = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfig(this.FRe).Ip;
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ReceiveAllRewardRequest(e).finally(() => {
        t.SetSelfInteractive(true);
      });
    };
    this.Y8d = () => {
      var t = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfig(this.FRe);
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(t.AccessId);
    };
    this.uDm = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
  }
  get CNe() {
    return ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[1, this.FVc], [0, this.Y8d]];
  }
  OnStart() {
    this.JPt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.uDm);
  }
  Refresh(t, e, i) {
    var r = this.FRe === t;
    this.FRe = t;
    if (!r) {
      this.r7d(t);
    }
    var r = this.cDm(t);
    this.dDm(t);
    this.Svt(r);
    this.GetItem(7)?.SetUIActive(this.CNe.IsQuestCanReceive(t));
  }
  r7d(t) {
    t = this.mDm(t);
    this.JPt?.RefreshByData(t);
  }
  mDm(t) {
    t = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfig(t);
    const i = [];
    t.RewardInfo.forEach((t, e) => i.push([{
      ItemId: e,
      IncId: 0
    }, t]));
    return i;
  }
  dDm(t) {
    var e = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfig(t);
    this.GetText(4)?.ShowTextNew(e.TaskName);
    if (this.CNe.IsQuestRewardReceived(t)) {
      this.GetText(5)?.ShowTextNew("MotorLinkage_Quest_Completed");
    } else {
      e = this.CNe.GetQuestCurrentProgress(t);
      t = this.CNe.GetQuestTargetProgress(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "MotorLinkage_Quest_Progress", e, t);
    }
  }
  Svt(t) {
    this.GetItem(2)?.SetUIActive(t === 1);
    this.GetItem(3)?.SetUIActive(t === 3);
    this.GetButton(1)?.RootUIComp.SetUIActive(t === 2);
    this.GetButton(0)?.RootUIComp.SetUIActive(t === 0);
  }
  cDm(t) {
    if (this.CNe.IsQuestCanReceive(t)) {
      return 2;
    } else if (this.CNe.IsQuestRewardReceived(t)) {
      return 3;
    } else if (ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetQuestConfig(t).AccessId !== 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
//# sourceMappingURL=ActivityMotorLinkageRewardView.js.map