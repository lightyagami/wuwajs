"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterFlowLogic = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../../../Common/PublicUtil");
const Global_1 = require("../../../../../Global");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LogReportController_1 = require("../../../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine");
const SimpleNpcFlowConditionChecker_1 = require("../../../SimpleNpc/Logics/SimpleNpcFlowConditionChecker");
const DynamicFlowController_1 = require("./DynamicFlowController");
const DEFAULT_WAIT_TIME = 3;
const DEFAULT_LOOP_TIME = 10;
class CharacterFlowLogic {
  constructor(t, i) {
    this.HYo = 0;
    this.ActorComp = undefined;
    this.HeadInfoComp = undefined;
    this.FlowInfoList = new Array();
    this.TempFlowInfoList = new Array();
    this.CurrentFlowInfo = undefined;
    this.EntityList = new Array();
    this.CurrentTalkItems = undefined;
    this.CurrentTalkId = 0;
    this.DynamicFlowData = undefined;
    this.IsPause = true;
    this.EnableUpdate = false;
    this.IsExecuteFlowEndInternal = true;
    this.WaitSecondsRemain = 0;
    this.IsWaitForDialogueUi = false;
    this.ActorComp = t;
    this.HeadInfoComp = t.Entity.GetComponent(82);
    this.TempFlowInfoList = new Array();
    this.HYo = this.ActorComp.CreatureData.GetPbDataId();
    if (i) {
      this.EntityList = i.NpcIds;
      this.FlowInfoList = i.Flows;
    }
  }
  get IsExecuteFlowEnd() {
    return this.IsExecuteFlowEndInternal;
  }
  set IsExecuteFlowEnd(t) {
    if (this.IsExecuteFlowEndInternal !== t) {
      this.IsExecuteFlowEndInternal = t;
      this.HeadInfoComp?.UpdateDialogUseState(!t);
    }
  }
  Tick(t) {
    if (!!this.EnableUpdate && !this.IsWaitForDialogueUi) {
      this.WaitSecondsRemain -= t;
      if (this.WaitSecondsRemain <= 0) {
        if (this.IsExecuteFlowEnd) {
          if (this.IsPause) {
            this.EnableUpdate = false;
          } else {
            this.StartFlow();
          }
        } else {
          this.PlayTalk(this.CurrentTalkId + 1);
        }
      }
    }
  }
  get IsPlaying() {
    return !this.IsExecuteFlowEnd;
  }
  StartFlow() {
    this.FindRandomFlow();
    this.PlayFlow();
  }
  StopFlow() {
    this.IsExecuteFlowEnd = true;
    let e = void (this.WaitSecondsRemain = 0);
    if ((e = this.DynamicFlowData ? this.DynamicFlowData.EntityIds : this.EntityList) && e.length >= 2) {
      for (let t = 0, i = e.length; t < i; t++) {
        var s = this.GetEntity(e[t]);
        if (s) {
          s.GetComponent(31).RemoveFlowActions();
        }
      }
    } else {
      this.ActorComp.Entity.GetComponent(31).RemoveFlowActions();
    }
  }
  PlayFlow() {
    if (this.CurrentFlowInfo || this.DynamicFlowData) {
      if (this.IsFlowActorsReady()) {
        let t = undefined;
        let i = 0;
        var e;
        if (this.DynamicFlowData) {
          t = this.DynamicFlowData.Flow;
          i = this.DynamicFlowData.Flow?.StateId ? this.DynamicFlowData.Flow.StateId : 0;
        } else if (e = this.CurrentFlowInfo.Flow) {
          t = e.FlowIndex;
          i = e.FlowIndex?.StateId ? e.FlowIndex.StateId : 0;
        }
        if (t && (e = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(t.FlowListName, t.FlowId, this.ActorComp.Owner.ActorLabel, i))) {
          this.CurrentTalkItems = e.TalkItems;
          this.IsExecuteFlowEnd = false;
          this.PlayTalk(0);
          this.hRi(t);
        } else {
          this.HandleFlowEnd();
        }
      }
    } else {
      this.HandleFlowEnd();
    }
  }
  PlayTalk(i) {
    this.CurrentTalkId = i;
    var e = this.CurrentTalkItems;
    if (i >= e.length) {
      this.HandleFlowEnd();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Level", 50, "[CharacterFlowLogic] 冒泡演出结束", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["WaitTime", this.WaitSecondsRemain]);
      }
    } else {
      var s = this.DynamicFlowData ? this.DynamicFlowData.Flow : this.CurrentFlowInfo?.Flow.FlowIndex;
      var o = this.DynamicFlowData ? this.DynamicFlowData.EntityIds : this.EntityList;
      var e = e[i];
      let t = this.ActorComp.Entity;
      if (o && o?.length >= 2) {
        var r = SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.GetFlowActorIndex(e.WhoId);
        if (r === -1) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 50, "请配置演出目标", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["FlowName", s?.FlowListName], ["FlowId", s?.FlowId], ["StateId", s?.StateId], ["TalkId", i]);
          }
          this.PlayTalk(i + 1);
          return;
        }
        if (r >= o.length) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 50, "演出目标索引越界", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["FlowName", s?.FlowListName], ["FlowId", s?.FlowId], ["StateId", s?.StateId], ["Index", r]);
          }
          this.PlayTalk(i + 1);
          return;
        }
        var o = o[r];
        if (!(t = this.GetEntity(o))) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 50, "播放多人冒泡时找不到演员,停止冒泡", ["MasterPbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["ActorPbDataId", o], ["FlowName", s?.FlowListName], ["FlowId", s?.FlowId], ["StateId", s?.StateId], ["Index", r]);
          }
          this.HandleFlowEnd();
          return;
        }
      }
      if (this.HandleTalkAction(t, e)) {
        this.IsExecuteFlowEnd = false;
        if (this.WaitSecondsRemain <= 0) {
          this.WaitSecondsRemain = this.GetWaitSeconds(e);
        }
        o = this.ActorComp.CreatureData.GetPbDataId();
        s = this.GetFlowText(e.TidTalk);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Level", 50, "[CharacterFlowLogic] 播放对话框文本", ["PbDataId", o], ["DialogText", s], ["WaitTime", this.WaitSecondsRemain]);
        }
      } else {
        this.PlayTalk(i + 1);
      }
    }
  }
  HandleTalkAction(t, i) {
    if (!t) {
      return false;
    }
    let e = false;
    var s = this.GetFlowText(i.TidTalk);
    if (s) {
      e = true;
      this.WaitSecondsRemain = this.GetWaitSeconds(i);
      i = this.WaitSecondsRemain + 0.05;
      this.IsWaitForDialogueUi = true;
      t.GetComponent(82).SetDialogueText(s, i).finally(() => {
        this.IsWaitForDialogueUi = false;
      });
    }
    return e;
  }
  HandleFlowEnd() {
    this.IsExecuteFlowEnd = true;
    this.IsWaitForDialogueUi = false;
    if (this.DynamicFlowData) {
      this.WaitSecondsRemain = this.DynamicFlowData.WaitTime || DEFAULT_LOOP_TIME;
      var i = this.ActorComp.CreatureData.GetPbDataId();
      var i = DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActor(i).Callback;
      if (i) {
        i();
      }
    } else if (this.CurrentFlowInfo) {
      i = this.CurrentFlowInfo.Flow;
      let t = DEFAULT_LOOP_TIME;
      if (i.WaitTime) {
        t = i.WaitTime;
      }
      this.WaitSecondsRemain = t;
    }
    this.ResetFlowState();
  }
  ResetFlowState() {
    this.CurrentTalkItems = undefined;
    this.CurrentTalkId = 0;
    this.CurrentFlowInfo = undefined;
    this.DynamicFlowData = undefined;
  }
  FindRandomFlow() {
    if (!this.FindDynamicFlow()) {
      this.TempFlowInfoList.length = 0;
      this.CurrentFlowInfo = undefined;
      for (const t of this.FlowInfoList) {
        if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t.Condition, this.ActorComp.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.ActorComp.Entity.Id))) {
          this.TempFlowInfoList.push(t);
        }
      }
      this.CurrentFlowInfo = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(this.TempFlowInfoList);
    }
  }
  ResetWaitTime() {
    this.WaitSecondsRemain = 0;
  }
  HasValidFlow() {
    return !!this.FlowInfoList.length;
  }
  GetEntity(t) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity;
  }
  GetWaitSeconds(t, i = 0) {
    let e = t.WaitTime;
    if (!e || e === 0) {
      e = DEFAULT_WAIT_TIME;
    }
    return e += i;
  }
  GetFlowText(t) {
    if (t && !StringUtils_1.StringUtils.IsEmpty(t)) {
      return PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t);
    }
  }
  hRi(t) {
    var i = new LogReportDefine_1.PlayFlowLogData();
    i.i_bubble_type = this.DynamicFlowData ? 2 : 1;
    i.s_flow_file = t.FlowListName;
    i.i_flow_id = t.FlowId;
    i.i_flow_status_id = t.StateId ?? 0;
    i.i_config_id = this.HYo;
    i.i_area_id = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    i.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
    var e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
    i.f_pos_x = e.X;
    i.f_pos_y = e.Y;
    i.f_pos_z = e.Z;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 42, "播放冒泡埋点", ["EntityConfigId", this.HYo], ["FlowListName", t.FlowListName], ["FlowId", t.FlowId], ["StateId", t.StateId], ["IsDynamicMultiFlow", this.DynamicFlowData !== undefined]);
    }
    LogReportController_1.LogReportController.LogReport(i);
  }
  HideDialogueText() {
    this.IsWaitForDialogueUi = false;
    this.HeadInfoComp?.HideDialogueText();
  }
  HasDynamicFlow() {
    return this.DynamicFlowData !== undefined;
  }
  FindDynamicFlow() {
    var t = this.ActorComp.CreatureData.GetPbDataId();
    var t = DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActor(t);
    this.DynamicFlowData = t?.BubbleData;
    return !!t;
  }
  IsFlowActorsReady() {
    let t = undefined;
    if (!(t = this.DynamicFlowData ? this.DynamicFlowData.EntityIds : this.EntityList)?.length) {
      return false;
    }
    for (const i of t) {
      if (!ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(i)?.IsInit) {
        return false;
      }
    }
    return true;
  }
}
exports.CharacterFlowLogic = CharacterFlowLogic;
//# sourceMappingURL=CharacterFlowLogic.js.map