"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissionPanelStep = undefined;
const ue_1 = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MissionPanelChildStep_1 = require("./MissionPanelChildStep");
const MissionViewStepTextUtil_1 = require("./MissionViewStepTextUtil");
const StepBaseItem_1 = require("./TreeStep/StepBaseItem");
class MissionPanelStep extends StepBaseItem_1.StepBaseItem {
  constructor() {
    super(...arguments);
    this.Qct = [];
    this.TitleSequencePlayer = undefined;
    this.YF_ = undefined;
    this.zF_ = undefined;
    this.yct = t => {
      switch (t) {
        case "Start":
          if (this.YF_?.IsPending()) {
            this.YF_.SetResult(true);
          }
          break;
        case "Close":
        case "Finish":
          if (this.zF_?.IsPending()) {
            this.zF_.SetResult(true);
          }
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, ue_1.UIItem]);
    this.ComponentRegisterInfos.push([3, ue_1.UIItem]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = this.GetItem(3);
    t.SetUIActive(true);
    this.TitleSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(t);
    this.TitleSequencePlayer.BindSequenceCloseEvent(this.yct);
    var t = new MissionPanelChildStep_1.MissionPanelChildStep(this.ViewId, 0);
    var i = this.GetItem(2);
    await t.CreateThenShowByActorAsync(i.GetOwner(), 0);
    await t.HideAsync();
    this.Qct.push(t);
  }
  OnBeforeDestroy() {
    if (this.Qct) {
      for (const t of this.Qct) {
        t.Destroy();
      }
    }
    this.TitleSequencePlayer?.Clear();
    this.TitleSequencePlayer = undefined;
  }
  OnAfterShow() {
    this.TitleSequencePlayer.ResumeSequence();
    for (const t of this.Qct) {
      t.Show();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStepShow");
    }
  }
  OnAfterHide() {
    this.TitleSequencePlayer.PauseSequence();
    for (const t of this.Qct) {
      t.Hide();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStepHide");
    }
  }
  OnTick(t) {
    if (this.IsShowOrShowing) {
      super.OnTick(t);
      for (const i of this.Qct) {
        i.OnTick(t);
      }
    }
  }
  Update() {
    this.UpdateByConfig();
    if (this.ShowData && this.ShowData.SubStepInfos) {
      for (let t = 0; t < this.ShowData.SubStepInfos.length; t++) {
        this.Qct[t].UpdateByConfig();
      }
    }
  }
  async StartShow(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStep.StartShow 更新自父步骤数据");
    }
    await this.ZOn(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStep.StartShow 隐藏子步骤");
    }
    await this.Fj_();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStep.StartShow 显示父步骤");
    }
    await this.ShowAsync();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStep.StartShow 播放父步骤Start动画");
    }
    await this.bco(i);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStep.StartShow 播放子步骤Start动画");
    }
    await this.Xct();
    await this.Mxn(i);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStep.StartShow 子步骤Start动画结束");
    }
  }
  async OnReset() {
    var t = [];
    for (const i of this.Qct) {
      t.push(i.OnReset());
    }
    await Promise.all(t);
    await super.OnReset();
    await this.HideAsync();
  }
  async ExecuteSequenceOnUpdate(t, i, e) {
    var s = this.ShowData;
    var a = t;
    if (MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckTextEqual(this.ShowData, t)) {
      i(t);
      await this.ZOn(t);
      await this.Xct();
    } else {
      a = MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckStepTextSame(s?.MainStepInfo, a.MainStepInfo);
      await this.i2n(s?.SubStepInfos, e);
      if (!a) {
        await this.Gj_(e);
      }
      i(t);
      await this.ZOn(t);
      if (!a) {
        await this.bco(e);
      }
      await this.Xct();
      await this.Mxn(e);
    }
  }
  async bco(t) {
    if (this.CheckVisible() && this.TitleSequencePlayer) {
      this.TitleSequencePlayer.PlayLevelSequenceByName("Start");
      this.YF_ = new CustomPromise_1.CustomPromise();
      if (t) {
        this.TitleSequencePlayer.EndSequenceLastFrame("Start");
      }
      await this.YF_.Promise;
    }
  }
  async Gj_(t) {
    var i;
    if (this.CheckVisible()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MissionPanelStepTitleAnimStart, this.ShowData.Id);
      i = this.Cjs() ? "Finish" : "Close";
      this.TitleSequencePlayer.PlayLevelSequenceByName(i);
      this.zF_ = new CustomPromise_1.CustomPromise();
      if (t) {
        this.TitleSequencePlayer.EndSequenceLastFrame(i);
      }
      await this.zF_.Promise;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd, this.ShowData.Id);
    }
    return true;
  }
  async Mxn(i) {
    var e = this.ShowData?.SubStepInfos;
    if (e?.length) {
      var s = [];
      for (let t = 0; t < e.length; t++) {
        var a = this.Qct[t];
        s.push(a.StartShow(i));
      }
      await Promise.all(s);
    }
  }
  async i2n(i, e) {
    if (i && i.length) {
      var s = [];
      for (let t = 0; t < i.length; t++) {
        var a = this.Qct[t];
        s.push(a.EndShow(e));
      }
      await Promise.all(s);
    }
  }
  async ZOn(t) {
    this.ShowData = t;
    await this.Refresh(t, t.MainStepInfo);
  }
  async Xct() {
    const a = this.GetItem(2);
    if (a) {
      var i = this.ShowData;
      if (i && i.SubStepInfos && i.SubStepInfos.length !== 0) {
        let s = 0;
        const n = [];
        i.SubStepInfos.forEach(t => {
          let i = undefined;
          var e;
          if (this.Qct.length > s) {
            i = this.Qct[s];
          } else {
            e = LguiUtil_1.LguiUtil.CopyItem(a, a.GetParentAsUIItem());
            i = new MissionPanelChildStep_1.MissionPanelChildStep(this.ViewId, s);
            n.push(i.CreateThenShowByActorAsync(e.GetOwner(), 0));
            this.Qct.push(i);
          }
          s++;
        });
        await Promise.all(n);
        for (let t = n.length = 0; t < i.SubStepInfos.length; t++) {
          var e = i.SubStepInfos[t];
          n.push(this.Qct[t].Refresh(i, e));
        }
        await Promise.all(n);
      } else {
        await this.Fj_();
      }
    }
  }
  async Fj_() {
    var t = [];
    for (const i of this.Qct) {
      t.push(i.HideAsync());
    }
    await Promise.all(t);
  }
  CheckVisible() {
    var t;
    return !!this.Config && (t = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidTitle), !StringUtils_1.StringUtils.IsBlank(t)) && super.CheckVisible();
  }
  Cjs() {
    if (this.ShowData?.DataSource === 0) {
      var t = this.ShowData.MainStepInfo?.QuestScheduleType;
      if (t && t.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted) {
        var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
        if (i) {
          i = i.GetNode(t.ChildQuestId);
          if (i) {
            return i.IsSuccess;
          }
        }
      }
    }
    return true;
  }
  async ChildStepConditionIndexChange(i, t) {
    var e = this.Qct.find(t => t.StepId === i);
    if (e) {
      await e.OnStepConditionIndexChange(t);
    }
  }
}
exports.MissionPanelStep = MissionPanelStep;
//# sourceMappingURL=MissionPanelStep.js.map