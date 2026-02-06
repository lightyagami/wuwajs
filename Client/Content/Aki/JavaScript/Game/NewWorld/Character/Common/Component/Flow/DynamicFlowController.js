"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicFlowController = exports.CharacterDynamicFlowData = exports.DynamicFlowActorInfo = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const DEFAULT_TYPE_PRIORITY = 1;
class DynamicFlowActorInfo {
  constructor() {
    this.CreatureId = 0;
    this.PbDataId = 0;
  }
  IsValid() {
    return !!this.CreatureId || !!this.PbDataId;
  }
}
exports.DynamicFlowActorInfo = DynamicFlowActorInfo;
class CharacterDynamicFlowData {
  constructor() {
    this.MasterInfo = undefined;
    this.BubbleData = undefined;
    this.Type = undefined;
    this.Callback = undefined;
  }
}
exports.CharacterDynamicFlowData = CharacterDynamicFlowData;
class DynamicFlowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.jYo();
    Net_1.Net.Register(20571, DynamicFlowController.WYo);
    Net_1.Net.Register(24284, DynamicFlowController.KYo);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(20571);
    Net_1.Net.UnRegister(24284);
    return true;
  }
  static jYo() {
    this.DynamicFlowTypePriority.set(1, 5);
    this.DynamicFlowTypePriority.set(2, 20);
    this.DynamicFlowTypePriority.set(3, 20);
    this.DynamicFlowTypePriority.set(4, 20);
  }
  static CreateCharacterFlowData(t) {
    var r = new CharacterDynamicFlowData();
    var o = new DynamicFlowActorInfo();
    o.PbDataId = t.EntityIds.length ? t.EntityIds[0] : 0;
    r.MasterInfo = o;
    r.BubbleData = t;
    r.Type = 3;
    return r;
  }
  static CreateCharacterFlowDataForMasterCreatureId(t, r) {
    var o = new CharacterDynamicFlowData();
    var a = new DynamicFlowActorInfo();
    a.CreatureId = t;
    o.MasterInfo = a;
    o.BubbleData = r;
    o.Type = 3;
    return o;
  }
  static AddDynamicFlow(t) {
    if (!t?.BubbleData) {
      return false;
    }
    var r;
    var o = this.GetDynamicFlowPriority(t.Type);
    for (const e of t.BubbleData.EntityIds) {
      if (this.PbDataIdFlowActors.has(e)) {
        var a = this.GetDynamicFlowByActorPbDataId(e);
        if (o <= this.GetDynamicFlowPriority(a.Type)) {
          return false;
        }
      }
    }
    return !!t.MasterInfo?.IsValid() && ((r = this.GetFlowActorEntityHandle(t.MasterInfo))?.Entity?.IsInit && r.Entity?.GetComponent(32)?.PlayDynamicFlowBegin(t), this.UpdateDynamicFlowCache(t, true), true);
  }
  static RemoveDynamicFlow(t) {
    var r;
    var t = this.GetMasterActorInfoByActorInfo(t);
    return !!t && !!(r = this.GetDynamicFlowByMasterActorInfo(t)) && ((t = this.GetFlowActorEntityHandle(t))?.Entity?.IsInit && t.Entity?.GetComponent(32)?.PlayDynamicFlowEnd(), this.UpdateDynamicFlowCache(r, false), true);
  }
  static UpdateDynamicFlowCache(t, r) {
    var o = t.MasterInfo;
    if (r) {
      if (o.PbDataId) {
        this.PbDataIdFlowDataMap.set(o.PbDataId, t);
        this.PbDataIdFlowActors.set(o.PbDataId, o);
      }
      if (o.CreatureId) {
        this.CreatureIdFlowDataMap.set(o.CreatureId, t);
        this.CreatureIdFlowActors.set(o.CreatureId, o);
      }
      for (const a of t.BubbleData.EntityIds) {
        this.PbDataIdFlowActors.set(a, o);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "添加动态冒泡", ["PbDataId", o.PbDataId], ["CreatureId", o.CreatureId], ["Type", t.Type], ["FlowName", t.BubbleData.Flow.FlowListName]);
      }
    } else {
      for (const e of t.BubbleData.EntityIds) {
        this.PbDataIdFlowActors.delete(e);
      }
      this.PbDataIdFlowDataMap.delete(o.PbDataId);
      this.PbDataIdFlowActors.delete(o.PbDataId);
      this.CreatureIdFlowDataMap.delete(o.CreatureId);
      this.CreatureIdFlowActors.delete(o.CreatureId);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 50, "移除动态冒泡", ["PbDataId", o.PbDataId], ["CreatureId", o.CreatureId], ["Type", t.Type], ["FlowName", t.BubbleData.Flow.FlowListName]);
      }
    }
  }
  static GetFlowActorEntityHandle(r) {
    if (r) {
      let t = undefined;
      return t = !(t = !t && r.PbDataId ? ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(r.PbDataId) : t) && r.CreatureId ? ModelManager_1.ModelManager.CreatureModel?.GetEntity(r.CreatureId) : t;
    }
  }
  static GetDynamicFlowByActorPbDataId(t) {
    t = this.PbDataIdFlowActors.get(t);
    if (t) {
      return this.GetDynamicFlowByMasterActorInfo(t);
    }
  }
  static GetDynamicFlowByMasterActorPbDataId(t) {
    if (t) {
      return this.PbDataIdFlowDataMap.get(t);
    }
  }
  static GetMasterActorInfoByActorInfo(t) {
    if (t?.IsValid()) {
      if (t.PbDataId && this.PbDataIdFlowActors.has(t.PbDataId)) {
        return this.PbDataIdFlowActors.get(t.PbDataId);
      } else if (t.CreatureId && this.CreatureIdFlowActors.has(t.CreatureId)) {
        return this.CreatureIdFlowActors.get(t.CreatureId);
      } else {
        return undefined;
      }
    }
  }
  static GetDynamicFlowByActorInfo(t) {
    t = this.GetMasterActorInfoByActorInfo(t);
    if (t?.IsValid()) {
      return this.GetDynamicFlowByMasterActorInfo(t);
    }
  }
  static GetDynamicFlowByMasterActorInfo(t) {
    if (t.IsValid()) {
      if (t.PbDataId && this.PbDataIdFlowDataMap.has(t.PbDataId)) {
        return this.PbDataIdFlowDataMap.get(t.PbDataId);
      } else if (t.CreatureId && this.CreatureIdFlowDataMap.has(t.CreatureId)) {
        return this.CreatureIdFlowDataMap.get(t.CreatureId);
      } else {
        return undefined;
      }
    }
  }
  static GetDynamicFlowPriority(t) {
    if (t && this.DynamicFlowTypePriority.has(t)) {
      return this.DynamicFlowTypePriority.get(t);
    } else {
      return DEFAULT_TYPE_PRIORITY;
    }
  }
}
(exports.DynamicFlowController = DynamicFlowController).PbDataIdFlowDataMap = new Map();
DynamicFlowController.CreatureIdFlowDataMap = new Map();
DynamicFlowController.PbDataIdFlowActors = new Map();
DynamicFlowController.CreatureIdFlowActors = new Map();
DynamicFlowController.DynamicFlowTypePriority = new Map();
DynamicFlowController.WYo = t => {
  var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(t.LIs);
  var t = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  if (r) {
    t = r.EntityIds.length ? DynamicFlowController.CreateCharacterFlowData(r) : DynamicFlowController.CreateCharacterFlowDataForMasterCreatureId(t, r);
    DynamicFlowController.AddDynamicFlow(t);
  }
};
DynamicFlowController.KYo = t => {
  var r;
  var o = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(t.LIs);
  var t = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  if (o) {
    r = new DynamicFlowActorInfo();
    if (o.EntityIds.length) {
      r.PbDataId = o.EntityIds[0];
    } else {
      r.CreatureId = t;
    }
    DynamicFlowController.RemoveDynamicFlow(r);
  }
}; //# sourceMappingURL=DynamicFlowController.js.map