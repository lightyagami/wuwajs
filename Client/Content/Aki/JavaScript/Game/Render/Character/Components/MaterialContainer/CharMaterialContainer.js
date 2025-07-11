"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharMaterialContainer = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig");
const RenderUtil_1 = require("../../../Utils/RenderUtil");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const CharRenderingComponent_1 = require("../../Manager/CharRenderingComponent");
const CharBodyInfo_1 = require("./CharBodyInfo");
class CharMaterialContainer extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.AllBodyInfoList = undefined;
    this.Zhr = "";
    this.Cha = new Array();
    this.xW = undefined;
    this.C6a = 0;
    this.Ocl = false;
  }
  MarkForceUpdateThisFrame() {
    this.Ocl = true;
  }
  static GetMaxUpdateParamsPerFrame() {
    if (CharMaterialContainer.g6a < 0) {
      CharMaterialContainer.g6a = Info_1.Info.IsGameRunning() ? GlobalData_1.GlobalData.IsEs3 ? 16 : 32 : 9999;
    }
    return CharMaterialContainer.g6a;
  }
  Awake(e) {
    super.Awake(e);
    e = this.RenderComponent.GetOwner();
    if (e?.IsValid()) {
      this.Zhr = e.GetName();
      this.AllBodyInfoList = new Map();
      var n = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      var t = n.Num();
      let r = false;
      let o = false;
      var i = [];
      for (let e = 0; e < t; e++) {
        var a;
        var f;
        var d = n.Get(e);
        if (d?.IsValid()) {
          a = d.GetName();
          if (d.SkeletalMesh?.IsValid()) {
            if ((f = RenderConfig_1.RenderConfig.GetBodyTypeByName(a)) === undefined) {
              i.push(d);
            } else {
              if (f === 0) {
                o = true;
              }
              r = r || this.AddSkeletalComponent(d, a);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("RenderCharacter", 40, "资产的SkeletalMeshComponent的SkeletalMesh为空", ["Actor", this.Zhr], ["SkeletalName", a]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 40, "材质容器初始化失败，组件不可用", ["Actor", this.Zhr]);
        }
      }
      if (!o && i.length > 0) {
        r = r || this.AddSkeletalComponent(i[0], RenderConfig_1.RenderConfig.MaterialControlBodyCaseArray[0]);
        i.splice(0, 1);
      }
      for (const _ of i) {
        r = r || this.AddSkeletalComponent(_, _.GetName());
      }
      if (!r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderCharacter", 13, "无Mesh类型材质控制器初始化", ["Actor", this.Zhr]);
        }
      }
      this.OnInitSuccess();
      e = "Render_CharMaterialContainer_" + this.Zhr;
      this.xW = Stats_1.Stat.CreateNoFlameGraph(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "Actor 为空");
    }
  }
  AddSkeletalComponent(e, r, o = false) {
    var n;
    var t;
    if (r) {
      if (e) {
        if (e.GetOwner()) {
          if (e.SkeletalMesh) {
            n = e.bHiddenInGame;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("RenderCharacter", 40, "AddSkeletalMeshComponent", ["Actor", this.Zhr], ["SkeletalName", r], ["SkeletalComponent", e.SkeletalMesh.GetName()], ["isHidden", n]);
            }
            if (n) {
              e.SetHiddenInGame(false);
            }
            (t = new CharBodyInfo_1.CharBodyInfo()).Init(this.Zhr, r, e, this, o);
            this.AllBodyInfoList.set(r, t);
            if (n) {
              e.SetHiddenInGame(true);
            }
            return true;
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RenderCharacter", 13, "外部传入的SkeletalMeshComponent的SkeletalMesh为空", ["Actor", this.Zhr], ["SkeletalName", r]);
            }
            return false;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderCharacter", 40, "外部传入的SkeletalMeshComponent的Owner为空", ["Actor", this.Zhr]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 13, "外部传入了空的SkeletalMeshComponent", ["Actor", this.Zhr]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "角色骨骼名称错误", ["Actor", this.Zhr]);
      }
      return false;
    }
  }
  RemoveSkeletalComponent(e) {
    return !!this.AllBodyInfoList.has(e) && (this.AllBodyInfoList.delete(e), true);
  }
  ResetAllState() {
    for (const e of this.AllBodyInfoList.values()) {
      e.ResetAllState();
    }
  }
  UseAlphaTestCommon() {
    for (const e of this.AllBodyInfoList.values()) {
      e.UseAlphaTestCommon();
    }
  }
  RevertAlphaTestCommon() {
    for (const e of this.AllBodyInfoList.values()) {
      e.RevertAlphaTestCommon();
    }
  }
  SetColor(r, o, e = 0, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      var t = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < t.length; e++) {
        var i = this.AllBodyInfoList.get(t[e]);
        if (i) {
          i.SetColor(r, o, n);
        }
      }
    }
  }
  RevertColor(r, e = 0, o = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < n.length; e++) {
        var t = this.AllBodyInfoList.get(n[e]);
        if (t) {
          t.RevertColor(r, o);
        }
      }
    }
  }
  SetFloat(r, o, e = 0, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      var t = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < t.length; e++) {
        var i = this.AllBodyInfoList.get(t[e]);
        if (i) {
          i.SetFloat(r, o, n);
        }
      }
    }
  }
  RevertFloat(r, e = 0, o = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < n.length; e++) {
        var t = this.AllBodyInfoList.get(n[e]);
        if (t) {
          t.RevertFloat(r, o);
        }
      }
    }
  }
  SetTexture(r, o, e = 0, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r) && o !== undefined) {
      var t = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < t.length; e++) {
        var i = this.AllBodyInfoList.get(t[e]);
        if (i) {
          i.SetTexture(r, o, n);
        }
      }
    }
  }
  RevertTexture(r, e = 0, o = -1, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      if (o >= 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 40, "SetColor: 不支持指定SectionIndex");
      }
      var t = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < t.length; e++) {
        var i = this.AllBodyInfoList.get(t[e]);
        if (i) {
          i.RevertTexture(r, n);
        }
      }
    }
  }
  SetStarScarEnergy(e) {
    for (const r of this.AllBodyInfoList.values()) {
      r.SetStarScarEnergy(e);
    }
  }
  SetNoWater(e) {
    for (const r of this.AllBodyInfoList.values()) {
      r.SetNoWater(e);
    }
  }
  LateUpdate() {
    this.xW.Start();
    ++this.C6a;
    var e = this.GetRenderingComponent().GetCachedOwner();
    let r = undefined;
    if (e instanceof UE.Character && e !== Global_1.Global.BaseCharacter) {
      var o = e.D_GetVelocity().SizeSquared();
      var n = CharRenderingComponent_1.CharRenderingComponent.MotionVelocitySquared;
      r = 0;
      for (let e = n.length - 1; e >= 0; e--) {
        if (o > n[e]) {
          r = CharRenderingComponent_1.CharRenderingComponent.MotionMeshShadingRate[e];
          break;
        }
      }
    }
    var t = [];
    for (const f of this.AllBodyInfoList.values()) {
      for (let e = 0; e <= t.length; ++e) {
        if (e === t.length) {
          t.push(f);
          break;
        }
        if (t[e].LastUpdateCounter > f.LastUpdateCounter) {
          t.splice(e, 0, f);
          break;
        }
      }
    }
    var i = this.Ocl ? 9999 : CharMaterialContainer.GetMaxUpdateParamsPerFrame();
    this.Ocl = false;
    let a = 0;
    for (const d of t) {
      a += d.Update(r);
      d.LastUpdateCounter = this.C6a;
      if (a > i) {
        break;
      }
    }
    this.xW.Stop();
  }
  Destroy() {
    for (const e of this.AllBodyInfoList.values()) {
      if (e.SkeletalComp && e.SkeletalComp.IsValid()) {
        e.Update();
      }
    }
    this.AllBodyInfoList.clear();
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdMaterialContainer;
  }
  GetStatName() {
    return "CharMaterialContainer";
  }
  StateEnter(e) {
    var r = e.DataCache;
    e.HasReverted = false;
    if (r.MaterialModifyType === 0) {
      if (r.UseRim) {
        this.elr(e);
      }
      if (r.UseDissolve) {
        this.tlr(e);
      }
      if (r.UseOutline) {
        this.ilr(e);
      }
      if (r.UseColor) {
        this.olr(e);
      }
      if (r.UseTextureSample) {
        this.rlr(e);
      }
      if (r.UseMotionOffset) {
        this.nlr(e);
      }
      if (r.UseDitherEffect) {
        this.slr(e);
      }
    } else if (r.MaterialModifyType === 1) {
      this.alr(e);
    }
  }
  StateUpdate(e) {
    var r = e.DataCache;
    if (r.MaterialModifyType === 0) {
      if (r.UseRim) {
        this.hlr(e);
      }
      if (r.UseDissolve) {
        this.llr(e);
      }
      if (r.UseOutline) {
        this._lr(e);
      }
      if (r.UseColor) {
        this.ulr(e);
      }
      if (r.UseTextureSample) {
        this.clr(e);
      }
      if (r.UseMotionOffset) {
        this.mlr(e);
      }
      if (r.UseDitherEffect) {
        this.dlr(e);
      }
      if (r.UseCustomMaterialEffect) {
        this.Clr(e);
      }
    } else if (r.MaterialModifyType === 1) {
      this.glr(e);
    }
  }
  StateRevert(e) {
    var r = e.DataCache;
    if (e.HasReverted) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "已经执行过Revert逻辑", ["Actor", this.Zhr], ["DataAsset", r.DataName]);
      }
    } else {
      e.HasReverted = true;
      if (r.MaterialModifyType === 0) {
        if (r.UseRim) {
          this.flr(e);
        }
        if (r.UseDissolve) {
          this.plr(e);
        }
        if (r.UseOutline) {
          this.vlr(e);
        }
        if (r.UseColor) {
          this.Mlr(e);
        }
        if (r.UseTextureSample) {
          this.Elr(e);
        }
        if (r.UseMotionOffset) {
          this.Slr(e);
        }
        if (r.UseDitherEffect) {
          this.ylr(e);
        }
        if (r.UseCustomMaterialEffect) {
          this.Ilr(e);
        }
      } else if (r.MaterialModifyType === 1) {
        this.Tlr(e);
      }
      if (r.HiddenAfterEffect) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderCharacter", 40, "播放完效果后，隐藏mesh", ["DataAsset", r.DataName]);
        }
        for (const n of e.SpecifiedMaterialIndexMap.keys()) {
          var o = this.AllBodyInfoList.get(n);
          if (o.SkeletalComp.IsValid()) {
            o.SkeletalComp.SetHiddenInGame(true);
          }
        }
      }
    }
  }
  alr(r) {
    var o = r.DataCache;
    if (o.ReplaceMaterialInterface) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Start();
      r.ReplaceMaterial = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this.GetRenderingComponent(), o.ReplaceMaterialInterface);
      if (r.ReplaceMaterial) {
        this.Cha.length = 0;
        for (const e of r.SpecifiedMaterialIndexMap.keys()) {
          var n = r.SpecifiedMaterialIndexMap.get(e);
          var t = this.AllBodyInfoList.get(e);
          this.Cha.push(e);
          for (let e = 0; e < n.length; e++) {
            var i = t.MaterialSlotList[n[e]];
            if (o.RevertMaterial) {
              i.SetReplaceMaterial(r.ReplaceMaterial);
            } else {
              i.SetDynamicMaterial(r.ReplaceMaterial);
            }
          }
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderCharacter", 40, "材质替换", ["Actor", this.Zhr], ["替换材质名称", o.DataName], ["材质名称", r.ReplaceMaterial?.GetName()], ["是否永久性的", !o.RevertMaterial], ["body array", this.Cha.join()]);
        }
        RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Stop();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "材质替换失败，不存在替换材质:", ["替换材质名称", o.DataName]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "材质替换失败，不存在替换材质", ["替换材质名称", o.DataName]);
    }
  }
  glr(e) {
    var r = e.DataCache;
    if (r.UseParameterModify) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Start();
      var o = e.ReplaceMaterial;
      var n = e.InterpolateFactor;
      if (r.FloatParameterNames !== undefined) {
        for (let e = 0; e < r.FloatParameterNames.length; e++) {
          var t = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.FloatParameterValues[e], n);
          o.SetScalarParameterValue(r.FloatParameterNames[e], t);
        }
      }
      if (r.ColorParameterNames !== undefined) {
        for (let e = 0; e < r.ColorParameterNames.length; e++) {
          var i = RenderUtil_1.RenderUtil.GetColorFromGroup(r.ColorParameterValues[e], n);
          o.SetVectorParameterValue(r.ColorParameterNames[e], i);
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Stop();
    }
  }
  Tlr(o) {
    var e = o.DataCache;
    if (e.RevertMaterial) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Start();
      let r = false;
      for (const i of o.SpecifiedMaterialIndexMap.keys()) {
        var n = o.SpecifiedMaterialIndexMap.get(i);
        var t = this.AllBodyInfoList.get(i);
        for (let e = 0; e < n.length; e++) {
          if (!t.MaterialSlotList[n[e]].RevertReplaceMaterial(o.ReplaceMaterial)) {
            r = true;
          }
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderCharacter", 40, "材质替换Revert", ["Actor", this.Zhr], ["替换材质名称", e.DataName], ["材质名称", o.ReplaceMaterial?.GetName()], ["是否永久性的", !e.RevertMaterial], ["MaterialMiss", r]);
      }
      o.ReplaceMaterial = undefined;
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Stop();
    }
  }
  elr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.UseBattleCommon();
      } else {
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          if (t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
            n.UseBattle(t.SectionIndex);
          }
        }
      }
    }
  }
  hlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Start();
    var r = e.DataCache;
    var o = e.InterpolateFactor;
    var n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.RimRange, o);
    var t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.RimColor, o);
    var i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.RimIntensity, o);
    for (const _ of e.SpecifiedMaterialIndexMap.keys()) {
      var a = e.SpecifiedMaterialIndexMap.get(_);
      var f = this.AllBodyInfoList.get(_);
      for (let e = 0; e < a.length; e++) {
        var d = f.MaterialSlotList[a[e]];
        d.SetFloat(RenderConfig_1.RenderConfig.UseRim, 1);
        d.SetFloat(RenderConfig_1.RenderConfig.RimUseTex, r.RimUseTex);
        d.SetColor(RenderConfig_1.RenderConfig.RimChannel, r.RimChannel);
        d.SetFloat(RenderConfig_1.RenderConfig.RimRange, n);
        d.SetColor(RenderConfig_1.RenderConfig.RimColor, t);
        d.SetFloat(RenderConfig_1.RenderConfig.RimIntensity, i);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Stop();
  }
  flr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.RevertBattleCommon();
      }
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.UseRim);
        t.RevertProperty(RenderConfig_1.RenderConfig.RimUseTex);
        t.RevertProperty(RenderConfig_1.RenderConfig.RimChannel);
        t.RevertProperty(RenderConfig_1.RenderConfig.RimRange);
        t.RevertProperty(RenderConfig_1.RenderConfig.RimColor);
        t.RevertProperty(RenderConfig_1.RenderConfig.RimIntensity);
        if (!r && t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
          n.RevertBattle(t.SectionIndex);
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Stop();
  }
  tlr(e) {
    var r = e.SelectedAllParts;
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Start();
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.UseBattleMaskCommon();
      } else {
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          if (t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
            n.UseBattleMask(t.SectionIndex);
          }
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Stop();
  }
  llr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Start();
    var r = e.DataCache;
    var o = e.InterpolateFactor;
    var n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DissolveProgress, o);
    var t = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DissolveSmooth, o);
    var i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DissolveColorIntensity, o);
    var a = RenderUtil_1.RenderUtil.GetColorFromGroup(r.DissolveColor, o);
    for (const R of e.SpecifiedMaterialIndexMap.keys()) {
      var f = e.SpecifiedMaterialIndexMap.get(R);
      var d = this.AllBodyInfoList.get(R);
      for (let e = 0; e < f.length; e++) {
        var _ = d.MaterialSlotList[f[e]];
        _.SetFloat(RenderConfig_1.RenderConfig.UseDissolve, 1);
        _.SetColor(RenderConfig_1.RenderConfig.DissolveChannelSwitch, r.DissolveChannel);
        _.SetFloat(RenderConfig_1.RenderConfig.DissolveProgress, n);
        _.SetFloat(RenderConfig_1.RenderConfig.DissolveSmooth, t);
        _.SetFloat(RenderConfig_1.RenderConfig.DissolveMulti, i);
        _.SetColor(RenderConfig_1.RenderConfig.DissolveEmission, a);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Stop();
  }
  plr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.RevertBattleMaskCommon();
      }
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.UseDissolve);
        t.RevertProperty(RenderConfig_1.RenderConfig.DissolveChannelSwitch);
        t.RevertProperty(RenderConfig_1.RenderConfig.DissolveProgress);
        t.RevertProperty(RenderConfig_1.RenderConfig.DissolveSmooth);
        t.RevertProperty(RenderConfig_1.RenderConfig.DissolveMulti);
        t.RevertProperty(RenderConfig_1.RenderConfig.DissolveEmission);
        if (!r && t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
          n.RevertBattleMask(t.SectionIndex);
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Stop();
  }
  ilr(e) {
    if (e.DataCache.UseOuterOutlineEffect) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Start();
      var r = e.SelectedAllParts;
      for (const i of e.SpecifiedMaterialIndexMap.keys()) {
        var o = e.SpecifiedMaterialIndexMap.get(i);
        var n = this.AllBodyInfoList.get(i);
        if (r) {
          n.UseOutlineStencilTestCommon();
        } else {
          for (let e = 0; e < o.length; e++) {
            var t = n.MaterialSlotList[o[e]];
            if (t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
              n.UseOutlineStencilTest(t.SectionIndex);
            }
          }
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Stop();
    }
  }
  _lr(e) {
    var r = e.DataCache;
    var o = e.InterpolateFactor;
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Start();
    var n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.OutlineWidth, o);
    var t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.OutlineColor, o);
    var i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.OutlineIntensity, o);
    for (const _ of e.SpecifiedMaterialIndexMap.keys()) {
      var a = e.SpecifiedMaterialIndexMap.get(_);
      var f = this.AllBodyInfoList.get(_);
      for (let e = 0; e < a.length; e++) {
        var d = f.MaterialSlotList[a[e]];
        d.SetFloat(RenderConfig_1.RenderConfig.OutlineUseTex, r.OutlineUseTex);
        d.SetFloat(RenderConfig_1.RenderConfig.OutlineWidth, n);
        d.SetColor(RenderConfig_1.RenderConfig.OutlineColor, t);
        d.SetFloat(RenderConfig_1.RenderConfig.OutlineColorIntensity, i);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Stop();
  }
  vlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.RevertOutlineStencilTestCommon();
      }
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.OutlineUseTex);
        t.RevertProperty(RenderConfig_1.RenderConfig.OutlineWidth);
        t.RevertProperty(RenderConfig_1.RenderConfig.OutlineColor);
        t.RevertProperty(RenderConfig_1.RenderConfig.OutlineColorIntensity);
        if (!r && t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
          n.RevertOutlineStencilTest(t.SectionIndex);
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Stop();
  }
  olr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.UseBattleCommon();
      } else {
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          if (t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
            n.UseBattle(t.SectionIndex);
          }
        }
      }
    }
  }
  ulr(e) {
    var r = e.DataCache;
    if (r.UseColor) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Start();
      var o = e.InterpolateFactor;
      var n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.BaseColor, o);
      var t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.EmissionColor, o);
      var i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.EmissionIntensity, o);
      var a = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.BaseColorIntensity, o);
      for (const R of e.SpecifiedMaterialIndexMap.keys()) {
        var f = e.SpecifiedMaterialIndexMap.get(R);
        var d = this.AllBodyInfoList.get(R);
        for (let e = 0; e < f.length; e++) {
          var _ = d.MaterialSlotList[f[e]];
          _.SetFloat(RenderConfig_1.RenderConfig.BaseUseTex, r.BaseUseTex);
          _.SetColor(RenderConfig_1.RenderConfig.BaseColor, n);
          _.SetFloat(RenderConfig_1.RenderConfig.BaseColorIntensity, a);
          _.SetFloat(RenderConfig_1.RenderConfig.EmissionUseTex, r.EmissionUseTex);
          _.SetColor(RenderConfig_1.RenderConfig.EmissionColor, t);
          _.SetFloat(RenderConfig_1.RenderConfig.EmissionIntensity, i);
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Stop();
    }
  }
  Mlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.RevertBattleCommon();
      }
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.BaseUseTex);
        t.RevertProperty(RenderConfig_1.RenderConfig.BaseColor);
        t.RevertProperty(RenderConfig_1.RenderConfig.BaseColorIntensity);
        t.RevertProperty(RenderConfig_1.RenderConfig.EmissionUseTex);
        t.RevertProperty(RenderConfig_1.RenderConfig.EmissionColor);
        t.RevertProperty(RenderConfig_1.RenderConfig.EmissionIntensity);
        if (!r && t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
          n.RevertBattle(t.SectionIndex);
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Stop();
  }
  rlr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.UseBattleCommon();
      } else {
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          if (t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
            n.UseBattle(t.SectionIndex);
          }
        }
      }
    }
  }
  clr(e) {
    var r = e.DataCache;
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Start();
    var o = e.InterpolateFactor;
    var n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureScaleAndOffset, o);
    var t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureSpeed, o);
    var i = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureColorTint, o);
    var a = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.Rotation, o);
    var f = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.TextureMaskRange, o);
    var d = r.MaskTexture;
    for (const C of e.SpecifiedMaterialIndexMap.keys()) {
      var _ = e.SpecifiedMaterialIndexMap.get(C);
      var R = this.AllBodyInfoList.get(C);
      for (let e = 0; e < _.length; e++) {
        var l = R.MaterialSlotList[_[e]];
        l.SetFloat(RenderConfig_1.RenderConfig.UseTexture, 1);
        l.SetFloat(RenderConfig_1.RenderConfig.TextureUseMask, r.UseAlphaToMask);
        l.SetFloat(RenderConfig_1.RenderConfig.TextureMaskRange, f);
        l.SetColor(RenderConfig_1.RenderConfig.TextureScaleAndOffset, n);
        l.SetColor(RenderConfig_1.RenderConfig.TextureSpeed, t);
        l.SetColor(RenderConfig_1.RenderConfig.TextureColor, i);
        l.SetFloat(RenderConfig_1.RenderConfig.TextureRotation, a);
        l.SetFloat(RenderConfig_1.RenderConfig.TextureUseScreenUv, r.UseScreenUv);
        if (d) {
          l.SetTexture(RenderConfig_1.RenderConfig.NoiseTexture, d);
        }
        l.SetColor(RenderConfig_1.RenderConfig.TextureUvSwitch, r.UvSelection);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Stop();
  }
  Elr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.RevertBattleCommon();
      }
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.UseTexture);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureUseScreenUv);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureUseMask);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureMaskRange);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureUvSwitch);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureScaleAndOffset);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureSpeed);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureColor);
        t.RevertProperty(RenderConfig_1.RenderConfig.TextureRotation);
        t.RevertProperty(RenderConfig_1.RenderConfig.NoiseTexture);
        if (!r && t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
          n.RevertBattle(t.SectionIndex);
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Stop();
  }
  nlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Start();
    for (const o of e.SpecifiedMaterialIndexMap.keys()) {
      var r = this.AllBodyInfoList.get(o);
      if (r.SkeletalComp?.IsValid()) {
        e.TargetSkeletalMesh = r.SkeletalComp;
        e.MotionStartLocation = e.TargetSkeletalMesh.D_GetSocketLocation(RenderConfig_1.RenderConfig.RootName);
        if (e.MotionEndLocation === undefined) {
          e.MotionEndLocation = new Array(3);
        }
        break;
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Stop();
  }
  mlr(e) {
    var r = e.DataCache;
    if (e.TargetSkeletalMesh) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Start();
      var o = e.InterpolateFactor;
      var n = Math.pow(o.Factor, r.MotionOffsetLength);
      var t = e.TargetSkeletalMesh.D_GetSocketLocation(RenderConfig_1.RenderConfig.RootName);
      RenderUtil_1.RenderUtil.LerpVector(e.MotionStartLocation, t, n, e.MotionEndLocation);
      var n = e.MotionEndLocation[0] - t.X;
      var i = e.MotionEndLocation[1] - t.Y;
      var t = e.MotionEndLocation[2] - t.Z;
      var a = Math.sqrt(n * n + i * i + t * t);
      var f = a < 100 ? new UE.LinearColor(n, i, t, a) : new UE.LinearColor(0, 0, 0, 0);
      var d = a < 100 ? RenderUtil_1.RenderUtil.GetFloatFromGroup(r.MotionNoiseSpeed, o) : 0;
      for (const C of e.SpecifiedMaterialIndexMap.keys()) {
        var _ = e.SpecifiedMaterialIndexMap.get(C);
        var R = this.AllBodyInfoList.get(C);
        for (let e = 0; e < _.length; e++) {
          var l = R.MaterialSlotList[_[e]];
          l.SetFloat(RenderConfig_1.RenderConfig.MotionRange, r.MotionAffectVertexRange);
          l.SetColor(RenderConfig_1.RenderConfig.MotionOffset, f);
          l.SetFloat(RenderConfig_1.RenderConfig.MotionNoiseSpeed, d);
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Stop();
    }
  }
  Slr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Start();
    for (const t of e.SpecifiedMaterialIndexMap.keys()) {
      var r = e.SpecifiedMaterialIndexMap.get(t);
      var o = this.AllBodyInfoList.get(t);
      for (let e = 0; e < r.length; e++) {
        var n = o.MaterialSlotList[r[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.MotionRange);
        n.RevertProperty(RenderConfig_1.RenderConfig.MotionOffset);
        n.RevertProperty(RenderConfig_1.RenderConfig.MotionNoiseSpeed);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Stop();
  }
  slr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.UseAlphaTestCommon();
      } else {
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          if (t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
            n.UseAlphaTest(t.SectionIndex);
          }
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Stop();
  }
  dlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Start();
    var r = e.DataCache;
    var o = e.InterpolateFactor;
    var n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DitherValue, o);
    for (const f of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(f);
      var i = this.AllBodyInfoList.get(f);
      for (let e = 0; e < t.length; e++) {
        var a = i.MaterialSlotList[t[e]];
        a.SetFloat(RenderConfig_1.RenderConfig.UseDitherEffect2, 1);
        a.SetFloat(RenderConfig_1.RenderConfig.DitherValue2, n);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Stop();
  }
  ylr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      if (r) {
        n.RevertAlphaTestCommon();
      }
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.DitherValue2);
        t.RevertProperty(RenderConfig_1.RenderConfig.UseDitherEffect2);
        if (!r && t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX) {
          n.RevertAlphaTest(t.SectionIndex);
        }
      }
    }
  }
  Clr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateCustomMaterialEffect.Start();
    var r = e.DataCache;
    var o = e.InterpolateFactor;
    for (const _ of e.SpecifiedMaterialIndexMap.keys()) {
      var n = e.SpecifiedMaterialIndexMap.get(_);
      var t = this.AllBodyInfoList.get(_);
      for (let e = 0; e < n.length; e++) {
        var i = t.MaterialSlotList[n[e]];
        if (r.CustomTextureParameterNames !== undefined) {
          for (let e = 0; e < r.CustomTextureParameterNames.length; e++) {
            var a = RenderUtil_1.RenderUtil.GetTextureFromGroup(r.CustomTextureParameterValues[e], o);
            if (a) {
              i.SetTexture(r.CustomTextureParameterNames[e], a);
            }
          }
        }
        if (r.CustomFloatParameterNames !== undefined) {
          for (let e = 0; e < r.CustomFloatParameterNames.length; e++) {
            var f = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.CustomFloatParameterValues[e], o);
            i.SetFloat(r.CustomFloatParameterNames[e], f);
          }
        }
        if (r.CustomColorParameterNames !== undefined) {
          for (let e = 0; e < r.CustomColorParameterNames.length; e++) {
            var d = RenderUtil_1.RenderUtil.GetColorFromGroup(r.CustomColorParameterValues[e], o);
            i.SetColor(r.CustomColorParameterNames[e], d);
          }
        }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateCustomMaterialEffect.Stop();
  }
  Ilr(e) {
    var r = e.DataCache;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i);
      var n = this.AllBodyInfoList.get(i);
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        if (r.CustomTextureParameterNames !== undefined) {
          for (let e = 0; e < r.CustomTextureParameterNames.length; e++) {
            t.RevertProperty(r.CustomTextureParameterNames[e]);
          }
        }
        if (r.CustomFloatParameterNames !== undefined) {
          for (let e = 0; e < r.CustomFloatParameterNames.length; e++) {
            t.RevertProperty(r.CustomFloatParameterNames[e]);
          }
        }
        if (r.CustomColorParameterNames !== undefined) {
          for (let e = 0; e < r.CustomColorParameterNames.length; e++) {
            t.RevertProperty(r.CustomColorParameterNames[e]);
          }
        }
      }
    }
  }
}
(exports.CharMaterialContainer = CharMaterialContainer).g6a = -1;
//# sourceMappingURL=CharMaterialContainer.js.map