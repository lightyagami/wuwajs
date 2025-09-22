"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicFlowController = exports.CharacterDynamicFlowData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../../../Core/Net/Net");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const DEFAULT_TYPE_PRIORITY = 1;
class CharacterDynamicFlowData {
  constructor() {
    this.BubbleData = undefined;
    this.Type = undefined;
    this.Callback = undefined;
  }
}
exports.CharacterDynamicFlowData = CharacterDynamicFlowData;
class DynamicFlowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.jYo();
    Net_1.Net.Register(17368, DynamicFlowController.WYo);
    Net_1.Net.Register(17029, DynamicFlowController.KYo);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(17368);
    Net_1.Net.UnRegister(17029);
    return true;
  }
  static jYo() {
    this.QYo.set(1, 5);
    this.QYo.set(2, 20);
    this.QYo.set(3, 20);
    this.QYo.set(4, 20);
  }
  static CreateCharacterFlowData(r) {
    var t = new CharacterDynamicFlowData();
    t.BubbleData = r;
    t.Type = 3;
    return t;
  }
  static AddDynamicFlow(r) {
    if (!r?.BubbleData?.EntityIds.length) {
      return false;
    }
    var t = this.GetDynamicFlowPriority(r.Type);
    for (const i of r.BubbleData.EntityIds) {
      if (this.XYo.has(i)) {
        var e = this.GetDynamicFlowByActor(i);
        if (t <= this.GetDynamicFlowPriority(e.Type)) {
          return false;
        }
      }
    }
    var o = r.BubbleData.EntityIds[0];
    var a = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(o);
    if (a?.Entity?.IsInit) {
      a.Entity?.GetComponent(31)?.PlayDynamicFlowBegin(r);
    }
    this.$Yo.set(o, r);
    for (const n of r.BubbleData.EntityIds) {
      this.XYo.set(n, o);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("NPC", 50, "添加动态冒泡", ["PbDataId", o], ["Type", r.Type], ["FlowName", r.BubbleData.Flow.FlowListName]);
    }
    return true;
  }
  static RemoveDynamicFlow(r) {
    r = this.XYo.get(r);
    if (!r) {
      return false;
    }
    var t = this.$Yo.get(r);
    if (!t) {
      return false;
    }
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(r);
    if (e?.Entity?.IsInit) {
      e.Entity?.GetComponent(31)?.PlayDynamicFlowEnd();
    }
    for (const o of t.BubbleData.EntityIds) {
      this.XYo.delete(o);
    }
    this.$Yo.delete(r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("NPC", 50, "移除动态冒泡", ["PbDataId", r], ["Type", t.Type], ["FlowName", t.BubbleData.Flow.FlowListName]);
    }
    return true;
  }
  static GetDynamicFlowByActor(r) {
    r = this.XYo.get(r);
    if (r) {
      return this.$Yo.get(r);
    }
  }
  static GetDynamicFlowByMasterActor(r) {
    if (r) {
      return this.$Yo.get(r);
    }
  }
  static GetDynamicFlowPriority(r) {
    if (r && this.QYo.has(r)) {
      return this.QYo.get(r);
    } else {
      return DEFAULT_TYPE_PRIORITY;
    }
  }
}
(exports.DynamicFlowController = DynamicFlowController).$Yo = new Map();
DynamicFlowController.XYo = new Map();
DynamicFlowController.QYo = new Map();
DynamicFlowController.WYo = r => {
  var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.LIs);
  if (r && r.EntityIds.length) {
    r = DynamicFlowController.CreateCharacterFlowData(r);
    DynamicFlowController.AddDynamicFlow(r);
  }
};
DynamicFlowController.KYo = r => {
  var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.LIs);
  if (r && r.EntityIds.length) {
    r = r.EntityIds[0];
    DynamicFlowController.RemoveDynamicFlow(r);
  }
}; //# sourceMappingURL=DynamicFlowController.js.map