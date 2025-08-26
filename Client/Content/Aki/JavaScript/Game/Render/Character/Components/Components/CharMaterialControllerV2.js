"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharMaterialControllerV2 = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharMaterialControllerHandle {
  constructor() {
    this.HandleId = 0;
    this.UserData = undefined;
    this.AssetData = undefined;
    this.ExtraMeshBodyName = undefined;
  }
}
class CharMaterialControllerV2 extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.Uhr = undefined;
    this.vel = new Map();
  }
  GetStatName() {
    return "CharMaterialControllerV2";
  }
  Start() {
    this.Uhr = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    this.Uhr.AddEffectFinishCallback(e => {
      this.Mel(e);
    });
    this.OnInitSuccess();
  }
  GetEffectCount() {
    return this.vel.size;
  }
  GetRuntimeMaterialControllerValid(e) {
    return this.vel.has(e);
  }
  SetEffectProgress(e, t) {
    if (this.vel.has(t)) {
      this.Uhr?.SetEffectProgress(t, e);
    }
  }
  AddMaterialControllerData(e, t, r) {
    var a = Stats_1.Stat.CreateNoFlameGraph("CharMaterialControllerV2_AddData_" + e.GetName());
    a.Start();
    var n = new CharMaterialControllerHandle();
    var i = e.DataType === 1;
    var s = e.DataType === 2;
    var o = e.HiddenAfterEffect;
    var i = this.Uhr.AddEffect(e, i, s, r, o);
    n.HandleId = i;
    n.UserData = t;
    n.AssetData = e;
    this.vel.set(i, n);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderCharacter", 25, "添加材质控制器", ["IdentifyName", this.Uhr.IdentifyName], ["AssetData", e.GetName()], ["Handle", i]);
    }
    if (e.ForceUpdateOnAdd && (this.Uhr.UpdateEffectsOnly(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("RenderCharacter", 25, "添加材质控制器时立刻更新材质", ["IdentifyName", this.Uhr.IdentifyName], ["AssetData", e.GetName()], ["Handle", i]);
    }
    a.Stop();
    return i;
  }
  RemoveMaterialControllerData(e) {
    var t = this.vel.get(e);
    return !!t && (this.Uhr?.RemoveEffect(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderCharacter", 25, "直接移除材质控制器", ["IdentifyName", this.Uhr.IdentifyName], ["AssetData", t.AssetData?.GetName()], ["Handle", e]), true);
  }
  RemoveMaterialControllerDataWithEnding(e) {
    var t = this.vel.get(e);
    return !!t && (this.Uhr?.SetEffectLoop(e, false), this.Uhr?.SetEffectPause(e, false), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderCharacter", 25, "移除材质控制器WithEnding", ["IdentifyName", this.Uhr.IdentifyName], ["AssetData", t.AssetData?.GetName()], ["Handle", e]), true);
  }
  OnResetRenderState() {
    for (const e of this.vel.keys()) {
      EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnRemoveMaterialController, e);
      this.RenderComponent.OnRemoveMaterialController(e);
    }
    this.vel.clear();
  }
  CleanOriginEffectByOtherData() {
    for (const t of this.vel.keys()) {
      var e = this.vel.get(t);
      if (!e.AssetData?.NeverBeCleanedByOthers) {
        this.RemoveMaterialControllerData(e.HandleId);
      }
    }
  }
  Mel(e) {
    var t = this.vel.get(e);
    if (t && (this.vel.delete(e), EventSystem_1.EventSystem.EmitWithTarget(this.RenderComponent, EventDefine_1.EEventName.OnRemoveMaterialController, e), this.RenderComponent.OnRemoveMaterialController(e), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("RenderCharacter", 25, "自动移除材质控制器", ["IdentifyName", this.Uhr.IdentifyName], ["AssetData", t.AssetData?.GetName()], ["Handle", e]);
    }
  }
  Update() {}
  LateUpdate() {}
  Destroy() {}
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdMaterialControllerV2;
  }
}
exports.CharMaterialControllerV2 = CharMaterialControllerV2;
//# sourceMappingURL=CharMaterialControllerV2.js.map