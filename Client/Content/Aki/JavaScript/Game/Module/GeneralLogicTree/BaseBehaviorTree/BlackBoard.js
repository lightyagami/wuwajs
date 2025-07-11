"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blackboard = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MissionViewDefine_1 = require("../../BattleUi/Views/MissionView/MissionViewDefine");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil");
const BehaviorTreeTagComponent_1 = require("./BehaviorTreeTagComponent");
class Blackboard extends BehaviorTreeTagComponent_1.BehaviorTreeTagContainer {
  constructor() {
    super(...arguments);
    this.gQt = 0;
    this.fQt = 0;
    this.MarkType = 12;
    this.TrackSource = 0;
    this.MapMarkResident = false;
    this.UseInnerTrackIconId = false;
    this.OnlineType = "";
    this.ZU_ = 0;
    this.CurrentDungeonId = 0;
    this.ChangeCurrentDungeonIdNodeId = 0;
    this.IsTracking = false;
    this.IsSleeping = false;
    this.BtType = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid;
    this.TreeIncId = BigInt(0);
    this.TreeConfigId = 0;
    this.GDa = [];
    this.ODa = new Map();
    this.kDa = new Set();
    this.fZ = new Map();
    this.pQt = new Map();
    this.vQt = new Map();
    this.gKs = new Map();
    this.UiTrackTextInfo = new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo();
    this.SilentAreaShowInfo = [];
    this.RollbackPoint = 0;
    this.NoExpression = false;
    this.TrackViewModel = "All";
    this.GetNodeConfig = e => {
      var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetNodeConfig(this.BtType, this.TreeConfigId, e);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "找不到节点配置", ["行为树类型", GeneralLogicTreeDefine_1.btTypeLogString[this.BtType]], ["行为树Id", this.TreeConfigId], ["节点Id", e]);
        }
      }
      return t;
    };
  }
  get TaskMarkTableId() {
    if (!this.UseInnerTrackIconId && this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && this.IsChallengeUi()) {
      return GeneralLogicTreeDefine_1.CHALLENGELEVELPLAY_TRACKICONID;
    } else {
      return this.fQt;
    }
  }
  get DungeonId() {
    return this.CurrentDungeonId;
  }
  set DungeonId(e) {
    this.CurrentDungeonId = e ?? this.gQt;
  }
  get ChangeDungeonIdNodeId() {
    return this.ChangeCurrentDungeonIdNodeId;
  }
  set ChangeDungeonIdNodeId(e) {
    this.ChangeCurrentDungeonIdNodeId = e;
  }
  get IsOccupied() {
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel;
    return !!e.IsExpressionInOccupying() && !e.IsExpressionOccupyingByTree(this.TreeIncId);
  }
  Init(e, t, i, r, s, o, n, h) {
    this.BtType = e;
    this.TreeIncId = t;
    this.TreeConfigId = i;
    this.gQt = r;
    this.CurrentDungeonId = r;
    this.OnlineType = o;
    this.ZU_ = n;
    this.NoExpression = h;
    this.fQt = s;
    switch (this.BtType) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        this.TrackSource = 5;
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        this.TrackSource = 4;
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        this.TrackSource = 2;
    }
  }
  Dispose() {
    this.EQt();
    this.vQt.clear();
    this.gKs.clear();
    this.GDa.splice(0, this.GDa.length);
    this.ODa.clear();
    this.kDa.clear();
  }
  AddNode(e, t) {
    this.fZ.set(e, t);
  }
  SQt(e) {
    var t = new Map();
    this.pQt.set(e, t);
    return t;
  }
  AddNodeToStatusGroup(e, t) {
    t = this.GetGroupIdByStatus(t);
    let i = this.GetNodesByGroupId(t);
    (i = i || this.SQt(t)).set(e.NodeId, e);
  }
  UpdateTreeVar(e, t) {
    this.vQt.set(e, t);
  }
  GetTreeVar(e) {
    return this.vQt.get(e);
  }
  UpdateNodeInStatusGroup(e, t, i) {
    if (t !== i) {
      t = this.GetGroupIdByStatus(t);
      if (t = this.GetNodesByGroupId(t)) {
        t.delete(e.NodeId);
      }
      this.AddNodeToStatusGroup(e, i);
    }
  }
  GetAllNodes() {
    return this.fZ;
  }
  GetNode(e) {
    return this.fZ.get(e);
  }
  GetNodesByGroupId(e) {
    return this.pQt.get(e);
  }
  GetCurrentActiveChildQuestNode(t = true) {
    var i = this.GetNodesByGroupId(1);
    if (i) {
      let e = undefined;
      for (var [, r] of i) {
        if (r.NodeType === "ChildQuest" && (!r.ContainTag(1) || !t)) {
          e = r;
        }
      }
      return e;
    }
  }
  GetActiveChildQuestNodesId() {
    var e = this.GetNodesByGroupId(1);
    if (e) {
      var t;
      var i = [];
      for ([, t] of e) {
        if (t.NodeType === "ChildQuest") {
          i.push(t.NodeId);
        }
      }
      return i;
    }
  }
  GetActiveChildQuestNodes() {
    var e = this.GetNodesByGroupId(1);
    if (e) {
      var t;
      var i = [];
      for ([, t] of e) {
        if (t.NodeType === "ChildQuest") {
          i.push(t);
        }
      }
      return i;
    }
  }
  EQt() {
    for (var [, e] of this.fZ) {
      e.Destroy();
    }
    this.fZ.clear();
    this.pQt.clear();
  }
  GetGroupIdByStatus(e) {
    let t = 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.BNs.Proto_NotActive:
        break;
      case Protocol_1.Aki.Protocol.BNs._5n:
      case Protocol_1.Aki.Protocol.BNs.Proto_Completing:
        t = 1;
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
        t = 2;
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
      case Protocol_1.Aki.Protocol.BNs.Proto_Destroy:
        t = 3;
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_Suspend:
        t = 4;
    }
    return t;
  }
  SetMapMarkResident(e) {
    this.MapMarkResident = e;
  }
  GetMapMarkResident() {
    return this.MapMarkResident;
  }
  SetUseInnerTrackIconId(e) {
    this.UseInnerTrackIconId = e;
  }
  IsSuspend() {
    return this.ContainTag(9);
  }
  GetCurrentCommunicateId() {
    var e = this.GetCurrentActiveChildQuestNode();
    if (e.NodeType === "ChildQuest" && e.ChildQuestType === IQuest_1.EChildQuest.ReceiveTelecom) {
      return e?.CommunicateId;
    }
  }
  IsChallengeUi() {
    return this.ContainTag(12);
  }
  IsCustomUi() {
    return this.ContainTag(11);
  }
  CreateShowData(e = true) {
    var t = this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest ? ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.TreeConfigId)?.NameKey : undefined;
    if (!e) {
      return MissionViewDefine_1.BehaviorTreeViewShowData.Create(this.BtType, this.TreeIncId, this.TreeConfigId, this.IsChallengeUi(), this.TaskMarkTableId, this.ZU_, t, this.UiTrackTextInfo.MainTitle, this.UiTrackTextInfo.SubTitles);
    }
    let i = undefined;
    var r;
    var s;
    var e = this.UiTrackTextInfo.MainTitle;
    if (e && !this.pCc(e)) {
      r = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidTitle);
      if (!StringUtils_1.StringUtils.IsBlank(r)) {
        i = e;
      }
    }
    let o = undefined;
    if (this.UiTrackTextInfo.SubTitles.length > 0) {
      o = [];
      for (const n of this.UiTrackTextInfo.SubTitles) {
        if (!!n && !this.pCc(n) && (!!n.BlankTitleStillShow || !(s = PublicUtil_1.PublicUtil.GetConfigTextByKey(n.TidTitle), StringUtils_1.StringUtils.IsBlank(s)))) {
          o.push(n);
        }
      }
      if (o.length === 1 && !i) {
        i = o[0];
        o.length = 0;
      }
    }
    return MissionViewDefine_1.BehaviorTreeViewShowData.Create(this.BtType, this.TreeIncId, this.TreeConfigId, this.IsChallengeUi(), this.TaskMarkTableId, this.ZU_, t, i, o);
  }
  pCc(e) {
    return e.QuestScheduleType?.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted && !!(e = this.GetNode(e.QuestScheduleType.ChildQuestId)) && e.ContainTag(1);
  }
  GetSilentAreaShowInfo() {
    if (this.SilentAreaShowInfo.length !== 0) {
      return this.SilentAreaShowInfo[0];
    }
  }
  AddTag(e, t) {
    super.AddTag(e, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeAddTag, e);
  }
  RemoveTag(e, t) {
    super.RemoveTag(e, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeRemoveTag, e);
  }
  AddSilentShowInfo(i, e) {
    var t = this.SilentAreaShowInfo.findIndex((e, t) => e.SourceOfAdd === i);
    if (t < 0) {
      this.SilentAreaShowInfo.push(new GeneralLogicTreeDefine_1.SilentAreaShowInfo(i, e));
    } else {
      this.SilentAreaShowInfo[t].ShowInfo = e;
    }
  }
  RemoveSilentShowInfo(i) {
    var e = this.SilentAreaShowInfo.findIndex((e, t) => e.SourceOfAdd === i);
    if (!(e < 0)) {
      this.SilentAreaShowInfo.splice(e, 1);
    }
  }
  IsNeedScaledTrackMark(e) {
    return this.ContainTag(11) && this.UiTrackTextInfo.IsSubTitle(e);
  }
  AddRefOccupationId(e, t) {
    let i = this.gKs.get(t);
    if (!i) {
      i = [];
      this.gKs.set(t, i);
    }
    i.push(e);
  }
  RemoveRefOccupationId(t, e) {
    var i;
    var r = this.gKs.get(e);
    if (!!r && !((i = r.findIndex(e => e === t)) < 0)) {
      r.splice(i, 1);
      if (r.length === 0) {
        this.gKs.delete(e);
      }
    }
  }
  HasRefOccupiedEntity() {
    if (this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst) {
      for (var [e] of this.gKs) {
        var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.IsOccupationExist(e);
        if (t) {
          if (ModelManager_1.ModelManager.GeneralLogicTreeModel.GetOccupationTreeId(e) !== this.TreeIncId) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetRefOccupiedEntityText() {
    if (this.HasRefOccupiedEntity()) {
      for (var [e] of this.gKs) {
        var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetOccupationQuestName(e);
        var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("QuestResourcesIsOccupied");
        var r = UE.NewArray(UE.BuiltinString);
        var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(e);
        r.Add(e);
        r.Add(t);
        return UE.KuroStaticLibrary.KuroFormatText(i, r);
      }
    }
  }
  HasSpecRefOccupiedEntity(e) {
    for (const i of e) {
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.IsOccupationExist(i);
      if (t) {
        if (ModelManager_1.ModelManager.GeneralLogicTreeModel.GetOccupationTreeId(i) !== this.TreeIncId) {
          return true;
        }
      }
    }
    return false;
  }
  GetSpecRefOccupiedEntityText(e) {
    if (this.HasSpecRefOccupiedEntity(e)) {
      for (const o of e) {
        var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetOccupationQuestName(o);
        var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("QuestResourcesIsOccupiedInfo");
        var r = UE.NewArray(UE.BuiltinString);
        var s = ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(o);
        r.Add(s);
        r.Add(t);
        return UE.KuroStaticLibrary.KuroFormatText(i, r);
      }
    }
  }
  AddGuaranteeActionInfo(t, i, r, e) {
    if (!this.NDa(r, e)) {
      this.GDa.push(r);
      let e = this.ODa.get(i);
      if (!e) {
        e = new Set();
        this.ODa.set(i, e);
      }
      e.add(this.GDa.length - 1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GeneralLogicTree", 18, "GeneralLogicTree:添加保底行为：" + r.Name, ["触发行为", t], ["ActionInfo", r], ["treeConfigId", this.TreeConfigId]);
      }
    }
  }
  NDa(t, i) {
    return i !== 0 && this.GDa.some(e => i === 1 ? e.Name === t.Name : e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t));
  }
  PopGuaranteeActionInfo(t, i) {
    for (let e = this.GDa.length - 1; e >= 0; e--) {
      var r = this.GDa[e];
      if (r.Name === i.Name && (0, IUtil_1.deepEquals)(r, i)) {
        this.GDa.splice(e, 1);
        for (var [, s] of this.ODa) {
          s.delete(e);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GeneralLogicTree", 18, "GeneralLogicTree:移除保底行为：" + i.Name, ["触发行为", t], ["ActionInfo", i], ["treeConfigId", this.TreeConfigId]);
        }
        return r;
      }
    }
  }
  ClearGuaranteeActions(e) {
    if (e) {
      var t = this.ODa.get(e);
      if (t) {
        for (let e = this.GDa.length - 1; e >= 0; e--) {
          if (t.has(e)) {
            this.GDa.splice(e, 1);
            t.delete(e);
          }
        }
      }
    } else {
      this.GDa.splice(0, this.GDa.length);
    }
  }
  GetGuaranteeActions() {
    return this.GDa;
  }
  AddCurrentExecuteActions(e) {
    this.kDa.add(e);
  }
  RemoveCurrentExecuteActions(e) {
    this.kDa.delete(e);
  }
  GetCurrentExecuteActions() {
    return this.kDa;
  }
}
exports.Blackboard = Blackboard;
//# sourceMappingURL=BlackBoard.js.map