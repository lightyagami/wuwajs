"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TypeCheckUtil_1 = require("../../../../Common/TypeCheckUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class NpcPerformController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(28591, this.SetPerformStateNotify);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.OnTrackMark);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.OnUnTrackMark);
    Net_1.Net.Register(29637, this.OnShopBuyNotify);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(28591);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMark, this.OnTrackMark);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.OnUnTrackMark);
    Net_1.Net.UnRegister(29637);
    return true;
  }
  static ForceSetNpcDitherVisible(e, r, t) {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 26, "[ForceNpcDither] 强制设置NPC在显示范围内", ["PbDataId", r], ["reason", t]);
      }
      if (this.ForceNpcDitherVisibleMap.has(r)) {
        this.ForceNpcDitherVisibleMap.get(r).add(t);
      } else {
        this.ForceNpcDitherVisibleMap.set(r, new Set([t]));
        if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r))?.IsInit) {
          e.Entity.GetComponent(198)?.SetForceInShowRange(true);
        }
      }
    } else if (this.ForceNpcDitherVisibleMap.has(r)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 26, "[ForceNpcDither] 取消强制设置NPC在显示范围内", ["PbDataId", r], ["reason", t]);
      }
      (e = this.ForceNpcDitherVisibleMap.get(r)).delete(t);
      if (!(e.size > 0)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 26, "[ForceNpcDither] NPC恢复显示范围处理", ["PbDataId", r]);
        }
        this.ForceNpcDitherVisibleMap.delete(r);
        if ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r))?.IsInit) {
          t.Entity.GetComponent(198)?.SetForceInShowRange(false);
        }
      }
    }
  }
  static AddNpcLookAtParams(r) {
    if (!this.EntityLookAtCacheForKey.has(r.Key)) {
      this.EntityLookAtCacheForKey.set(r.Key, r);
      for (const n of r.PbDataIds) {
        let e = this.EntityLookAtCacheForId.get(n);
        if (!e) {
          e = new Set();
          this.EntityLookAtCacheForId.set(n, e);
        }
        e.add(r.Key);
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n)?.Entity;
        var o = t?.GetComponent(199);
        if (t?.IsInit && o) {
          o.InterestEventController.AddExternalLookAtInterestEvents(r);
        }
      }
    }
  }
  static RemoveNpcLookAtParams(e) {
    if (this.EntityLookAtCacheForKey.has(e)) {
      var r = this.EntityLookAtCacheForKey.get(e);
      for (const n of r.PbDataIds) {
        var t = this.EntityLookAtCacheForId.get(n);
        t.delete(e);
        if (t.size === 0) {
          this.EntityLookAtCacheForId.delete(n);
        }
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n)?.Entity;
        var o = t?.GetComponent(199);
        if (t?.IsInit && o) {
          o.InterestEventController.RemoveExternalInterestEvent(e);
        }
      }
      this.EntityLookAtCacheForKey.delete(r.Key);
    }
  }
}
exports.NpcPerformController = NpcPerformController;
(_a = NpcPerformController).ForceNpcDitherVisibleMap = new Map();
NpcPerformController.EntityLookAtCacheForId = new Map();
NpcPerformController.EntityLookAtCacheForKey = new Map();
NpcPerformController.SetPerformStateNotify = e => {
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.F4n));
  if (r?.Entity?.IsInit) {
    r.Entity.GetComponent(199).PerformGroupController.SwitchPerformState(e.Y4n);
  }
};
NpcPerformController.OnTrackMark = e => {
  if ((0, TypeCheckUtil_1.isNumber)(e.TrackTarget) && (e = e.TrackTarget)) {
    _a.ForceSetNpcDitherVisible(true, e, 0);
  }
};
NpcPerformController.OnUnTrackMark = e => {
  e = e.TrackTarget;
  if (e) {
    _a.ForceSetNpcDitherVisible(false, e, 0);
  }
};
NpcPerformController.OnShopBuyNotify = e => {
  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeScrollingTipsView(e.Q4n, []);
}; //# sourceMappingURL=NpcPerformController.js.map