"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityVersionPreheatSubView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList");
const ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityVersionPreheatController_1 = require("../Controller/ActivityVersionPreheatController");
const VersionPreheatDefine_1 = require("../VersionPreheatDefine");
const preheatItemIndexList = [0, 1, 2, 3, 4, 5];
class ActivityVersionPreheatSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.wno = [];
    this.B_l = undefined;
    this.b_l = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (const s of preheatItemIndexList) {
      var t = new VersionPreheatQuestItem();
      var i = this.GetItem(s);
      e.push(t.CreateThenShowByActorAsync(i.GetOwner()));
      this.wno.push(t);
    }
    this.B_l = new VersionPreheatBonusItem();
    await this.B_l.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    this.b_l = new VersionPreheatActivityItem();
    e.push(this.b_l.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(e);
  }
  OnBeforeDestroy() {
    this.wno.length = 0;
  }
  OnStart() {}
  OnRefreshView() {
    this.q_l();
    this.G_l();
    this.e4i();
  }
  OnTimer(e) {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.b_l.RefreshSubTitleExternal(t, i);
  }
  q_l() {
    var e = ModelManager_1.ModelManager.VersionPreheatModel.BuildQuestDataList();
    if (this.wno.length !== e.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VersionPreheat", 64, "任务数据个数与任务ui个数不匹配，隐藏全部任务面板", ["item count", this.wno.length], ["data count", e.length]);
      }
      for (const s of this.wno) {
        s.SetUiActive(false);
      }
    } else {
      for (var [t, i] of e.entries()) {
        this.wno[t].RefreshExternalAsync(i);
      }
    }
  }
  G_l() {
    var e = ModelManager_1.ModelManager.VersionPreheatModel.BuildActivityInfoData();
    this.b_l.RefreshExternal(e);
  }
  e4i() {
    var e = ModelManager_1.ModelManager.VersionPreheatModel;
    var t = e.IsBonusAvailable;
    this.B_l.SetUiActive(t);
    if (t) {
      t = e.BuildBonusQuestData();
      this.B_l.RefreshExternalAsync(t);
    }
  }
}
exports.ActivityVersionPreheatSubView = ActivityVersionPreheatSubView;
class VersionPreheatQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._9a = undefined;
    this.ujr = undefined;
    this.p9a = () => {
      this.k_l();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.p9a]];
  }
  async OnBeforeStartAsync() {
    this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem().GetParentAsUIItem());
    return Promise.resolve();
  }
  async RefreshExternalAsync(e) {
    var t;
    if ((this._9a = e).State === 0) {
      this.GetItem(1)?.SetUIActive(true);
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(6)?.SetUIActive(false);
    } else if ((t = ModelManager_1.ModelManager.VersionPreheatModel).GetQuestStateById(e.Id) === 0 || t.IsQuestPlayedById(e.Id) || t.IsQuestClickedById(e.Id)) {
      this.GetItem(1)?.SetUIActive(false);
      this.jCl(e);
    } else {
      this.GetItem(1)?.SetUIActive(true);
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(6)?.SetUIActive(false);
      await TimerSystem_1.GameplayTimerSystem.Wait(VersionPreheatDefine_1.UNLOCK_PLAY_DELAY);
      this.jCl(e);
      await this.ujr.LitePlayAsync("Unlock");
      t.SetQuestPlayedById(e.Id);
    }
  }
  jCl(e) {
    this.GetItem(6)?.SetUIActive(!ModelManager_1.ModelManager.VersionPreheatModel.IsQuestClickedById(e.Id));
    this.GetItem(2)?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.NumberTextId, e.NumberTextArg);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.TitleTextId);
    this.GetItem(5)?.SetUIActive(e.State === 3);
  }
  async k_l() {
    var e;
    var t;
    if (this._9a.State !== 0) {
      t = this._9a.Id;
      (e = ModelManager_1.ModelManager.VersionPreheatModel).SetQuestClickedById(t);
      if (this._9a.State >= 2) {
        await ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.RequestPreheatSignSurveyInfoRequest(t);
      }
      await ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(t, false);
      e.CurrentUsingVersionPreheatId = t;
      ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.SendDetailClickLogData(t);
    } else {
      e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      if (this._9a.UnlockTimestamp > e) {
        t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(TimeUtil_1.TimeUtil.SetTimeSecond(this._9a.UnlockTimestamp - e));
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Preheating_NoJoinTips02", t.CountDownText);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Preheating_NoJoinTips01");
      }
    }
  }
}
class VersionPreheatBonusItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ujr = undefined;
    this.p9a = () => {
      ModelManager_1.ModelManager.VersionPreheatModel.SetBonusClicked();
      ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(undefined, false);
      ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.SendDetailClickLogData(undefined);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.p9a]];
  }
  async OnBeforeStartAsync() {
    this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem().GetParentAsUIItem());
    return Promise.resolve();
  }
  async RefreshExternalAsync(e) {
    var t = ModelManager_1.ModelManager.VersionPreheatModel;
    if (t.IsBonusPlayed() || t.IsBonusClicked()) {
      this.WCl();
      this.GetItem(1)?.SetUIActive(false);
    } else {
      this.GetRootItem().SetUIActive(false);
      await TimerSystem_1.GameplayTimerSystem.Wait(VersionPreheatDefine_1.UNLOCK_PLAY_DELAY);
      this.WCl();
      await this.ujr.LitePlayAsync("Unlock");
      t.SetBonusPlayed();
    }
  }
  WCl() {
    this.GetRootItem().SetUIActive(true);
    this.GetItem(2)?.SetUIActive(true);
    this.GetText(3)?.SetUIActive(false);
    this.GetText(4)?.SetUIActive(false);
    this.GetItem(5)?.SetUIActive(ModelManager_1.ModelManager.VersionPreheatModel.IsBonusClicked());
    this.GetItem(6)?.SetUIActive(!ModelManager_1.ModelManager.VersionPreheatModel.IsBonusClicked());
  }
}
class VersionPreheatActivityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.O_l = undefined;
    this.N_l = undefined;
    this.uFo = undefined;
    this.F_l = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.O_l = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    this.N_l = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    this.uFo = new ActivityRewardList_1.ActivityRewardList();
    this.F_l = new VersionPreheatActivityBottom();
    await Promise.all([this.O_l.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.N_l.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.uFo.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.F_l.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())]);
  }
  OnStart() {
    this.uFo.SetUiActive(false);
    this.F_l.SetUiActive(false);
  }
  RefreshExternal(e) {
    this.mGe(e.TitleData);
    this.ufo(e.DescriptionData);
  }
  RefreshSubTitleExternal(e, t) {
    this.O_l.SetTimeTextVisible(e);
    if (e) {
      this.O_l.SetTimeTextByText(t);
    }
  }
  mGe(e) {
    this.O_l.SetTitleByTextId(e.TitleTextId);
    this.O_l.SetSubTitleByTextId(e.SubTitleTextId);
    this.O_l.SetSubTitleVisible(true);
    this.O_l.SetTimeTextVisible(false);
  }
  ufo(e) {
    this.N_l.SetContentByTextId(e.ContentTextId);
  }
}
class VersionPreheatActivityBottom extends UiPanelBase_1.UiPanelBase {}
//# sourceMappingURL=ActivityVersionPreheatSubView.js.map