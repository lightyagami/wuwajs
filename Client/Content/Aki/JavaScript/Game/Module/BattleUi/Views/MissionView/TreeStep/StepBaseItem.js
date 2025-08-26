"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepBaseItem = undefined;
const ue_1 = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../../../LevelGamePlay/LevelGeneralController");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GeneralLogicTreeController_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeController");
const MapUtil_1 = require("../../../../Map/MapUtil");
const QuestUtil_1 = require("../../../../QuestNew/QuestUtil");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MissionViewStepTextUtil_1 = require("../MissionViewStepTextUtil");
const StepMotionArtTextController_1 = require("./StepMotionArtTextController");
class StepBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.ViewId = e;
    this.StepId = t;
    this.StepControllers = new Map();
    this.DescribeTextComp = undefined;
    this.DistanceTextComp = undefined;
    this.StepReferenceSource = 0;
    this.ShowData = undefined;
    this.Config = undefined;
    this.DescribeTextVisible = false;
    this.DistanceTextVisible = false;
    this.rs = undefined;
    this.Qmt = () => {
      var e;
      return !this.StepControllers.get(0)?.Enable && !!this.ShowData && !!this.Config && !(e = MissionViewStepTextUtil_1.MissionViewStepTextUtil.GetStepTextByConfig(this.ShowData.Id, this.Config), StringUtils_1.StringUtils.IsBlank(e)) && !(this.DescribeTextComp.SetText(e), 0);
    };
    this.UpdateDistanceText = () => {
      if (!this.ShowData || !this.Config || this.ShowData.DataSource !== 0 || this.Config.ShowSource !== 0) {
        return false;
      }
      var t = this.ShowData.Id;
      if (!GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowTrackDistance(t, this.Config.QuestScheduleType)) {
        return false;
      }
      t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
      if (!t) {
        return false;
      }
      if (t.IsInTrackRange()) {
        return false;
      }
      var i = GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleTrackNodeId(this.Config.QuestScheduleType);
      var s = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var s = MapUtil_1.MapUtil.GetDungeonsRelation(s, t.DungeonId);
      if (s === 3 || s !== 1 && !this.DescribeTextVisible) {
        if (t.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
          return false;
        }
        s = t.GetTrackAreaInfo(i);
        let e = "";
        if (s) {
          var r = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(s);
          var r = r !== 0 ? r : s;
          var s = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r);
          if (!s) {
            return false;
          }
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.Title) ?? s.Title;
        } else {
          r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t.DungeonId);
          if (!r) {
            return false;
          }
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.MapName) ?? r.MapName;
        }
        s = t.GetNode(i);
        if (this.DescribeTextVisible || s?.NodeType !== "ChildQuest" || s.ChildQuestType !== IQuest_1.EChildQuest.PlayFlow) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.DistanceTextComp, "CrossMapMissionTips", e);
          return true;
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.DescribeTextComp, "CrossMapMissionTips", e);
          return !(this.DescribeTextVisible = true);
        }
      }
      r = t.GetNodeTrackPosition(i);
      return !!r && QuestUtil_1.QuestUtil.SetTrackDistanceText(this.DistanceTextComp, r);
    };
  }
  get IsDescribeTextVisible() {
    var e = this.StepControllers.get(0);
    if (e?.Enable) {
      return e.CheckTextVisible();
    } else {
      return this.DescribeTextVisible;
    }
  }
  get IsDistanceTextVisible() {
    return this.DistanceTextVisible;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIText]];
  }
  async OnBeforeStartAsync() {
    var e;
    await super.OnBeforeStartAsync();
    this.StepReferenceSource = this.OpenParam;
    this.DescribeTextComp = this.GetText(0);
    this.DescribeTextComp.OnSelfLanguageChange.Bind(this.Qmt);
    this.DescribeTextComp.SetUIActive(false);
    this.DistanceTextComp = this.GetText(1);
    this.DistanceTextComp.SetUIActive(false);
    if (this.StepReferenceSource === 0) {
      e = new StepMotionArtTextController_1.StepMotionArtTextController(this.DescribeTextComp.GetParentAsUIItem());
      this.StepControllers.set(0, e);
    }
  }
  OnAfterHide() {
    for (var [, e] of this.StepControllers) {
      e.Hide();
    }
  }
  OnBeforeDestroy() {
    this.DescribeTextComp?.OnSelfLanguageChange.Unbind();
    this.ShowData = undefined;
    this.Config = undefined;
    this.DescribeTextComp = undefined;
    this.DistanceTextComp = undefined;
  }
  OnTick(e) {
    if (this.IsShowOrShowing) {
      for (var [, t] of this.StepControllers) {
        t.OnTick(e);
      }
    }
  }
  CheckVisible() {
    return !!this.Config && !!this.ShowData && LevelGeneralController_1.LevelGeneralController.CheckConditionNew(this.Config.ShowConditions, undefined, this.rs);
  }
  async Refresh(e, t) {
    this.ShowData = e;
    if (this.Config !== t) {
      this.Config = t;
      if (this.ShowData?.DataSource === 0) {
        this.rs = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.ShowData.BtType, this.ShowData.Id, this.ShowData.TreeConfigId);
      }
      if (this.Config) {
        this.Config.CurConditionTextIndex = this.Xfc(this.Config);
      }
      await this.OnConfigRefresh(this.ShowData, this.Config);
    }
    this.UpdateStepInfoAndSetActiveComp();
  }
  Xfc(t) {
    if (t && (!t.ShowConditions || !LevelGeneralController_1.LevelGeneralController.CheckConditionNew(t.ShowConditions, undefined, this.rs)) && t.ConditionText) {
      for (let e = 0; e < t.ConditionText.length; e++) {
        var i = t.ConditionText[e];
        if (LevelGeneralController_1.LevelGeneralController.CheckConditionNew(i.Condition, undefined, this.rs)) {
          return e;
        }
      }
    }
  }
  UpdateByConfig() {
    var e;
    if (this.Config && this.Config.CurConditionTextIndex !== (e = this.Xfc(this.Config))) {
      if (this.StepReferenceSource === 0) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MissionPanelStepConditionIndexChange, this.ViewId, this.StepId, e);
      } else {
        this.OnStepConditionIndexChange(e);
      }
    } else {
      this.UpdateStepInfoAndSetActiveComp();
    }
  }
  async OnStepConditionIndexChange(e) {
    if (this.Config) {
      this.Config.CurConditionTextIndex = e;
    }
    await this.OnConfigRefresh(this.ShowData, this.Config);
    this.UpdateStepInfoAndSetActiveComp();
  }
  UpdateStepInfo() {
    this.DescribeTextVisible = this.Qmt();
    this.DistanceTextVisible = this.UpdateDistanceText();
  }
  UpdateStepInfoAndSetActiveComp() {
    if (this.CheckVisible()) {
      this.UpdateStepInfo();
    } else {
      this.DescribeTextVisible = false;
      this.DistanceTextVisible = false;
    }
    this.DescribeTextComp.SetUIActive(this.DescribeTextVisible);
    this.DistanceTextComp.SetUIActive(this.DistanceTextVisible);
  }
  CopyStepInfo(e) {
    var t;
    if (e.DescribeTextVisible) {
      t = e.GetDescribeComponentText();
      this.DescribeTextComp.SetText(t);
      this.DescribeTextVisible = !StringUtils_1.StringUtils.IsBlank(t);
    }
    this.DescribeTextComp.SetUIActive(this.DescribeTextVisible);
    if (e.DistanceTextVisible) {
      t = e.GetDistanceComponentText();
      this.DistanceTextComp.SetText(t);
      this.DistanceTextVisible = !StringUtils_1.StringUtils.IsBlank(t);
    }
    this.DistanceTextComp.SetUIActive(this.DistanceTextVisible);
  }
  GetDescribeComponentText() {
    return this.DescribeTextComp.GetText();
  }
  GetDistanceComponentText() {
    return this.DistanceTextComp.GetText();
  }
  async OnConfigRefresh(e, t) {
    var i;
    var s = [];
    for ([, i] of this.StepControllers) {
      s.push(i.OnConfigRefresh(e, t));
    }
    await Promise.all(s);
  }
  async OnReset() {
    await this.Refresh(undefined, undefined);
  }
}
exports.StepBaseItem = StepBaseItem;
//# sourceMappingURL=StepBaseItem.js.map