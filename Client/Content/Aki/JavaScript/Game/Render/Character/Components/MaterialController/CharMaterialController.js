"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharMaterialController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const CharRuntimeMaterialControllerInfo_1 = require("./CharRuntimeMaterialControllerInfo");
class CharMaterialController extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.MaterialContainer = undefined;
    this.ExtraMesh = undefined;
    this.AllMaterialControlRuntimeDataMap = undefined;
    this.Ulr = 0;
    this.xhr = new Array();
    this.Zhr = "";
    this.EnableDebug = false;
    this.DebugInfo = undefined;
    this.Alr = undefined;
  }
  PrintCurrentInfo() {
    let t = "";
    for (const e of this.AllMaterialControlRuntimeDataMap.values()) {
      t += "[" + e.DataCache.Data.GetName() + "]   ";
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderCharacter", 40, "", ["当前存在的角色特效DA", t], ["Actor", this.Zhr]);
    }
  }
  Start() {
    super.Start();
    this.xhr.length = 0;
    this.Ulr = 0;
    this.EnableDebug = false;
    this.DebugInfo = new UE.PD_MaterialDebug_C();
    this.AllMaterialControlRuntimeDataMap = new Map();
    this.Zhr = this.GetRenderingComponent().GetOwner().GetName();
    var t = this.RenderComponent.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "材质控制器初始化失败，不存在CharMaterialContainer", ["Actor", this.Zhr]);
      }
    } else {
      this.MaterialContainer = t;
      t = this.RenderComponent.GetComponent(RenderConfig_1.RenderConfig.IdExtraMesh);
      this.ExtraMesh = t;
      t = "Render_CharMaterialControllerTick_" + this.Zhr;
      this.Alr = Stats_1.Stat.CreateNoFlameGraph(t);
      this.OnInitSuccess();
    }
  }
  GetRuntimeMaterialControllerValid(t) {
    return this.AllMaterialControlRuntimeDataMap.has(t);
  }
  Update() {
    this.Alr.Start();
    for (const i of this.AllMaterialControlRuntimeDataMap.values()) {
      var t = this.GetRenderingComponent().GetTimeDilation();
      var e = Time_1.Time.NowSeconds - i.LastUpdateTime;
      i.LastUpdateTime = Time_1.Time.NowSeconds;
      i.UpdateState(e, t);
      i.UpdateEffect(this.MaterialContainer);
      if (i.IsDead) {
        this.xhr.push(i.Id);
      }
    }
    if (this.EnableDebug && this.DebugInfo) {
      this.DebugInfo.MaterialControllerList.Empty();
      for (const o of this.AllMaterialControlRuntimeDataMap) {
        this.DebugInfo.MaterialControllerList.Set(o[0], o[1].DataCache.DataName);
      }
    }
    if (this.xhr.length > 0) {
      for (const a of this.xhr) {
        var r = this.AllMaterialControlRuntimeDataMap.get(a);
        if (r) {
          r.Destroy();
          this.AllMaterialControlRuntimeDataMap.delete(a);
          EventSystem_1.EventSystem.EmitWithTarget(this.RenderComponent, EventDefine_1.EEventName.OnRemoveMaterialController, a);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 25, "材质控制器句柄重复移除", ["Actor", this.Zhr], ["handle", a]);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderCharacter", 40, "自动移除材质控制器", ["Actor", this.Zhr], ["handle array", this.xhr.join()]);
      }
      this.xhr.length = 0;
      this.GFa();
    }
    this.Alr.Stop();
  }
  SetEffectProgress(t, e) {
    e = this.AllMaterialControlRuntimeDataMap.get(e);
    if (e) {
      e.SetProgress(t);
    }
  }
  Destroy() {
    for (const t of this.AllMaterialControlRuntimeDataMap.values()) {
      t.Destroy();
    }
    this.AllMaterialControlRuntimeDataMap = new Map();
  }
  RemoveSkeletalMeshMaterialControllerData(t) {
    for (const e of this.AllMaterialControlRuntimeDataMap.values()) {
      e.SpecifiedMaterialIndexMap?.delete(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderCharacter", 25, "移除材质控制器部件", ["SkelName", t], ["handleId", e.Id]);
      }
    }
  }
  OnResetRenderState() {
    if (this.AllMaterialControlRuntimeDataMap.size > 0 && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderCharacter", 40, "移除全部材质控制器", ["Actor", this.GetRenderingComponent().GetOwner().GetName()]);
    }
    for (const t of this.AllMaterialControlRuntimeDataMap.values()) {
      t.IsDead = true;
      t.UpdateEffect(this.MaterialContainer);
      t.Destroy();
    }
    this.AllMaterialControlRuntimeDataMap.clear();
  }
  RemoveMaterialControllerData(t) {
    var e;
    var r = this.AllMaterialControlRuntimeDataMap.get(t);
    return !!r && (e = this.GetRenderingComponent().GetOwner().GetName(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderCharacter", 40, "手动移除材质控制器", ["Actor", e], ["材质控制器", r.DataCache.DataName], ["handle", t]), r.IsDead = true, r.UpdateEffect(this.MaterialContainer), r.Destroy(), this.AllMaterialControlRuntimeDataMap.delete(t), this.GFa(), true);
  }
  RemoveMaterialControllerDataWithEnding(t) {
    var e;
    var r = this.AllMaterialControlRuntimeDataMap.get(t);
    return !!r && (e = this.GetRenderingComponent().GetOwner().GetName(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderCharacter", 40, "移除材质控制器WithEnding", ["Actor", e], ["材质控制器", r.DataCache.DataName], ["handle", t]), r.SetReadyToDie(), true);
  }
  AddMaterialControllerData(t, e) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "添加的材质控制器数据为空", ["Actor", this.GetRenderingComponent().GetOwner().GetName()]);
      }
      return -1;
    }
    if (this.AllMaterialControlRuntimeDataMap.keys.length > RenderConfig_1.RenderConfig.RefErrorCount && Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "材质控制器添加失败，超过单个角色的材质控制器队列数量，检查是否进行了材质控制器移除和材质控制器特效的持续时间", ["Actor", this.GetRenderingComponent().GetOwner().GetName()], ["添加的材质控制器名称", t.GetName()]);
    }
    this.Ulr++;
    var r;
    var i = this.Ulr;
    if (this.DealWithExtraMesh(t, i)) {
      (r = new CharRuntimeMaterialControllerInfo_1.CharMaterialControlRuntimeData()).Init(i, t, e);
      r.SetSpecifiedMaterialIndex(this.MaterialContainer);
      this.AllMaterialControlRuntimeDataMap.set(i, r);
      this.GFa();
      this.MaterialContainer.MarkForceUpdateThisFrame();
      return i;
    } else {
      return -1;
    }
  }
  GFa() {
    let t = false;
    for (const e of Array.from(this.AllMaterialControlRuntimeDataMap.values()).reverse()) {
      if (t) {
        e.RequestEffectStateRevert();
      } else {
        e.RequestEffectStateEnter();
      }
      if (e.DataCache.MaskOriginEffect) {
        t = true;
      }
    }
  }
  AddMaterialControllerDataDestroyCallback(t, e) {
    var r;
    var t = this.AllMaterialControlRuntimeDataMap.get(t);
    return !!t && (r = this.GetRenderingComponent().GetOwner().GetName(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderCharacter", 40, "添加材质控制器DestroyCallback", ["Actor", r], ["材质控制器", t.DataCache.DataName]), t.AddDestroyCallback(e));
  }
  RemoveMaterialControllerDataDestroyCallback(t, e) {
    var r;
    var t = this.AllMaterialControlRuntimeDataMap.get(t);
    return !!t && (r = this.GetRenderingComponent().GetOwner().GetName(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderCharacter", 40, "移除材质控制器DestroyCallback", ["Actor", r], ["材质控制器", t.DataCache.DataName]), t.RemoveDestroyCallback(e));
  }
  DealWithExtraMesh(t, e) {
    if (t.SpecifiedBodyType === 6) {
      if (!this.ExtraMesh) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 25, "材质控制器添加失败，ExtraMesh不存在", ["Actor", this.GetRenderingComponent().GetOwner().GetName()], ["添加的材质控制器名称", t.GetName()]);
        }
        return false;
      }
      if (t.MaterialModifyType !== 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 25, "材质控制器添加失败，ExtraMesh只支持材质替换", ["Actor", this.GetRenderingComponent().GetOwner().GetName()], ["添加的材质控制器名称", t.GetName()]);
        }
        return false;
      }
      if (t.SpecifiedBodyType !== 6) {
        return false;
      }
      {
        const r = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(1)[0];
        this.ExtraMesh.EnsureExtraMesh(r);
        this.ExtraMesh.AddExtraSkeletalMeshUsage(r);
        this.AddMaterialControllerDataDestroyCallback(e, t => {
          this.ExtraMesh?.RemoveExtraSkeletalMeshUsage(r);
        });
      }
    }
    return true;
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdMaterialController;
  }
  GetStatName() {
    return "CharMaterialController";
  }
}
exports.CharMaterialController = CharMaterialController;
//# sourceMappingURL=CharMaterialController.js.map