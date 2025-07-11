"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharMaterialControlRuntimeData = exports.CharMaterialControlDataCache = exports.CharMaterialControlTextureGroup = exports.CharMaterialControlColorGroup = exports.CharMaterialControlFloatGroup = exports.InterpolateFactor = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../GlobalData");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig");
const RenderModuleController_1 = require("../../../Manager/RenderModuleController");
const RenderUtil_1 = require("../../../Utils/RenderUtil");
class InterpolateFactor {
  constructor() {
    this.f8o = 0;
    this.Factor = 0;
  }
  get Type() {
    return this.f8o;
  }
  set Type(t) {
    if (this.f8o !== t) {
      this.f8o = t;
    }
  }
}
exports.InterpolateFactor = InterpolateFactor;
class CharMaterialControlFloatGroup {
  constructor(t, i, h) {
    this.End = undefined;
    this.Loop = undefined;
    this.Start = undefined;
    this.EndConstant = undefined;
    this.LoopConstant = undefined;
    this.StartConstant = undefined;
    if (t.bUseCurve) {
      this.End = t;
    } else {
      this.EndConstant = t.Constant;
    }
    if (i.bUseCurve) {
      this.Loop = i;
    } else {
      this.LoopConstant = i.Constant;
    }
    if (h.bUseCurve) {
      this.Start = h;
    } else {
      this.StartConstant = h.Constant;
    }
  }
}
exports.CharMaterialControlFloatGroup = CharMaterialControlFloatGroup;
class CharMaterialControlColorGroup {
  constructor(t, i, h) {
    this.End = undefined;
    this.Loop = undefined;
    this.Start = undefined;
    this.EndConstant = undefined;
    this.LoopConstant = undefined;
    this.StartConstant = undefined;
    if (t.bUseCurve) {
      this.End = t;
    } else {
      this.EndConstant = t.Constant;
    }
    if (i.bUseCurve) {
      this.Loop = i;
    } else {
      this.LoopConstant = i.Constant;
    }
    if (h.bUseCurve) {
      this.Start = h;
    } else {
      this.StartConstant = h.Constant;
    }
  }
}
exports.CharMaterialControlColorGroup = CharMaterialControlColorGroup;
class CharMaterialControlTextureGroup {
  constructor(t, i, h) {
    this.End = undefined;
    this.Loop = undefined;
    this.Start = undefined;
    this.End = t;
    this.Loop = i;
    this.Start = h;
  }
}
exports.CharMaterialControlTextureGroup = CharMaterialControlTextureGroup;
class CharMaterialControlDataCache {
  constructor(t, i) {
    this.Data = undefined;
    this.DataName = undefined;
    this.RefCount = 0;
    this.StatCharMaterialControlCacheData = undefined;
    this.StatCharMaterialControlUpdate = undefined;
    this.WholeLoopTime = 0;
    this.DataLoopEnd = 0;
    this.DataLoopStart = 0;
    this.DataLoopTime = 0;
    this.IgnoreTimeDilation = false;
    this.MaskOriginEffect = false;
    this.DataType = undefined;
    this.OtherCases = undefined;
    this.WeaponCases = undefined;
    this.SpecifiedParts = undefined;
    this.CustomPartNames = undefined;
    this.CustomExcludePartNames = undefined;
    this.HiddenAfterEffect = false;
    this.SpecifiedBodyType = undefined;
    this.SpecifiedSlotType = undefined;
    this.MaterialModifyType = undefined;
    this.UseRim = false;
    this.RimRange = undefined;
    this.RimColor = undefined;
    this.RimIntensity = undefined;
    this.RimUseTex = 0;
    this.RimChannel = undefined;
    this.RimRevertProperty = false;
    this.UseDissolve = false;
    this.DissolveChannel = undefined;
    this.DissolveProgress = undefined;
    this.DissolveSmooth = undefined;
    this.DissolveColorIntensity = undefined;
    this.DissolveColor = undefined;
    this.DissolveRevertProperty = false;
    this.UseOutline = false;
    this.OutlineRevertProperty = false;
    this.OutlineUseTex = 0;
    this.UseOuterOutlineEffect = false;
    this.OutlineWidth = undefined;
    this.OutlineColor = undefined;
    this.OutlineIntensity = undefined;
    this.ReplaceMaterialInterface = undefined;
    this.UseParameterModify = false;
    this.ColorParameterNames = undefined;
    this.ColorParameterValues = undefined;
    this.FloatParameterNames = undefined;
    this.FloatParameterValues = undefined;
    this.RevertMaterial = false;
    this.BaseColor = undefined;
    this.EmissionColor = undefined;
    this.EmissionIntensity = undefined;
    this.BaseColorIntensity = undefined;
    this.BaseUseTex = 0;
    this.EmissionUseTex = 0;
    this.UseColor = false;
    this.ColorRevertProperty = false;
    this.UseTextureSample = false;
    this.MaskTexture = undefined;
    this.UvSelection = undefined;
    this.UseScreenUv = 0;
    this.TextureScaleAndOffset = undefined;
    this.TextureSpeed = undefined;
    this.TextureColorTint = undefined;
    this.Rotation = undefined;
    this.UseAlphaToMask = 0;
    this.TextureMaskRange = undefined;
    this.TextureSampleRevertProperty = false;
    this.UseMotionOffset = false;
    this.MotionAffectVertexRange = 0;
    this.MotionOffsetLength = 0;
    this.MotionNoiseSpeed = undefined;
    this.MotionOffsetRevertProperty = false;
    this.UseDitherEffect = false;
    this.DitherValue = undefined;
    this.DitherRevertProperty = false;
    this.UseCustomMaterialEffect = false;
    this.CustomRevertProperty = false;
    this.CustomColorParameterNames = undefined;
    this.CustomColorParameterValues = undefined;
    this.CustomFloatParameterNames = undefined;
    this.CustomFloatParameterValues = undefined;
    this.CustomTextureParameterNames = undefined;
    this.CustomTextureParameterValues = undefined;
    this.Data = i;
    this.DataName = t;
    this.StatCharMaterialControlUpdate = Stats_1.Stat.CreateNoFlameGraph(["Render_CharMaterialControlUpdate_", t].join());
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataCache.Start();
    this.StatCharMaterialControlCacheData = Stats_1.Stat.CreateNoFlameGraph(["Render_CharMaterialControlCacheData_", t].join());
    this.StatCharMaterialControlCacheData.Start();
    this.RefCount = 0;
    this.MaskOriginEffect = i.MaskOriginEffect;
    this.DataType = i.DataType;
    var t = i.LoopTime;
    this.DataLoopEnd = t.End;
    this.DataLoopStart = t.Start;
    this.DataLoopTime = t.Loop;
    this.WholeLoopTime = this.DataLoopStart + this.DataLoopTime + this.DataLoopEnd;
    this.IgnoreTimeDilation = i.IgnoreTimeDilation;
    this.SpecifiedBodyType = i.SpecifiedBodyType;
    this.SpecifiedSlotType = i.SpecifiedSlotType;
    this.MaterialModifyType = i.MaterialModifyType;
    var h = i.OtherCases;
    let s = h.Num();
    if (s > 0) {
      this.OtherCases = new Set();
      for (let t = 0; t < s; t++) {
        this.OtherCases.add(h.Get(t));
      }
    }
    var r = i.WeaponCases;
    if ((s = r.Num()) > 0) {
      this.WeaponCases = new Set();
      for (let t = 0; t < s; t++) {
        this.WeaponCases.add(r.Get(t));
      }
    }
    var a = i.SpecifiedParts;
    if ((s = a.Num()) > 0) {
      this.SpecifiedParts = new Array(s);
      for (let t = 0; t < s; t++) {
        this.SpecifiedParts[t] = a.Get(t);
      }
    }
    var e = i.CustomPartNames;
    if ((s = e.Num()) > 0) {
      this.CustomPartNames = new Array(s);
      for (let t = 0; t < s; t++) {
        this.CustomPartNames[t] = e.Get(t);
      }
    }
    var o = i.CustomExcludePartNames;
    if ((s = o.Num()) > 0) {
      this.CustomExcludePartNames = new Array(s);
      for (let t = 0; t < s; t++) {
        this.CustomExcludePartNames[t] = o.Get(t);
      }
    }
    this.UseRim = i.UseRim;
    if (this.UseRim) {
      this.RimUseTex = i.RimUseTex ? 1 : 0;
      this.RimChannel = RenderUtil_1.RenderUtil.GetSelectedChannel(i.RimChannel);
      this.RimRevertProperty = i.RimRevertProperty;
      t = i.RimRange;
      this.RimRange = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      t = i.RimColor;
      this.RimColor = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      t = i.RimIntensity;
      this.RimIntensity = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
    }
    this.UseDissolve = i.UseDissolve;
    if (this.UseDissolve) {
      t = i.DissolveChannel;
      this.DissolveChannel = t === 0 ? new UE.LinearColor(1, 0, 0, 0) : RenderUtil_1.RenderUtil.GetSelectedChannel(i.DissolveChannel);
      t = i.DissolveProgress;
      this.DissolveProgress = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      t = i.DissolveSmooth;
      this.DissolveSmooth = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      t = i.DissolveColorIntensity;
      this.DissolveColorIntensity = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      t = i.DissolveColor;
      this.DissolveColor = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      this.DissolveRevertProperty = i.DissolveRevertProperty;
    }
    this.UseOutline = i.UseOutline;
    if (this.UseOutline) {
      this.OutlineRevertProperty = i.OutlineRevertProperty;
      this.OutlineUseTex = i.OutlineUseTex ? 1 : 0;
      this.UseOuterOutlineEffect = i.UseOuterOutlineEffect;
      t = i.OutlineWidth;
      this.OutlineWidth = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      t = i.OutlineColor;
      this.OutlineColor = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      t = i.OutlineIntensity;
      this.OutlineIntensity = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
    }
    if (GlobalData_1.GlobalData.IsEs3 && i.MobileUseDifferentMaterial && i.ReplaceMaterialMobile) {
      this.ReplaceMaterialInterface = i.ReplaceMaterialMobile;
    } else {
      this.ReplaceMaterialInterface = i.ReplaceMaterial;
    }
    if (this.ReplaceMaterialInterface) {
      this.UseParameterModify = i.UseParameterModify;
      this.RevertMaterial = i.RevertMaterial;
      var l = i.ColorParameters;
      if ((s = l.Num()) > 0) {
        this.ColorParameterNames = new Array();
        this.ColorParameterValues = new Array();
        for (let t = 0; t < s; t++) {
          var n = l.Get(t);
          if (!n.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE)) {
            this.ColorParameterNames.push(n.ParameterName);
            n = n.ParameterValue;
            this.ColorParameterValues.push(new CharMaterialControlColorGroup(n.End, n.Loop, n.Start));
          }
        }
      }
      var C = i.FloatParameters;
      if ((s = C.Num()) > 0) {
        this.FloatParameterNames = new Array();
        this.FloatParameterValues = new Array();
        for (let t = 0; t < s; t++) {
          var d = C.Get(t);
          if (!d.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE)) {
            this.FloatParameterNames.push(d.ParameterName);
            d = d.ParameterValue;
            this.FloatParameterValues.push(new CharMaterialControlFloatGroup(d.End, d.Loop, d.Start));
          }
        }
      }
    }
    this.UseColor = i.UseColor;
    if (this.UseColor) {
      t = i.BaseColor;
      this.BaseColor = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      t = i.EmissionColor;
      this.EmissionColor = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      t = i.EmissionIntensity;
      this.EmissionIntensity = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      t = i.BaseColorIntensity;
      this.BaseColorIntensity = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      this.BaseUseTex = i.BaseUseTex ? 1 : 0;
      this.EmissionUseTex = i.EmissionUseTex ? 1 : 0;
      this.ColorRevertProperty = i.ColorRevertProperty;
    }
    this.UseTextureSample = i.UseTextureSample;
    if (this.UseTextureSample) {
      this.MaskTexture = i.MaskTexture;
      this.UseScreenUv = 0;
      switch (i.UVSelection) {
        case 0:
          this.UvSelection = new UE.LinearColor(1, 0, 0, 0);
          break;
        case 1:
          this.UvSelection = new UE.LinearColor(0, 1, 0, 0);
          break;
        case 2:
          this.UvSelection = new UE.LinearColor(0, 0, 1, 0);
          break;
        case 3:
          this.UvSelection = new UE.LinearColor(0, 0, 0, 1);
          break;
        case 4:
          this.UseScreenUv = 1;
          this.UvSelection = new UE.LinearColor(0, 0, 0, 0);
          break;
        default:
          this.UvSelection = new UE.LinearColor(0, 0, 0, 0);
      }
      var t = i.TextureScaleAndOffset;
      this.TextureScaleAndOffset = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      var t = i.TextureSpeed;
      this.TextureSpeed = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      var t = i.TextureColorTint;
      this.TextureColorTint = new CharMaterialControlColorGroup(t.End, t.Loop, t.Start);
      var t = i.Rotation;
      this.Rotation = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      var t = i.TextureMaskRange;
      this.TextureMaskRange = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      this.UseAlphaToMask = i.UseAlphaToMask ? 1 : 0;
      this.TextureSampleRevertProperty = i.TextureSampleRevertProperty;
    }
    this.UseMotionOffset = i.UseMotionOffset;
    if (this.UseMotionOffset) {
      this.MotionAffectVertexRange = i.MotionAffectVertexRange;
      this.MotionOffsetLength = i.MotionOffsetLength;
      t = i.MotionNoiseSpeed;
      this.MotionNoiseSpeed = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      this.MotionOffsetRevertProperty = i.MotionOffsetRevertProperty;
    }
    this.UseDitherEffect = i.UseDitherEffect;
    if (this.UseDitherEffect) {
      t = i.DitherValue;
      this.DitherValue = new CharMaterialControlFloatGroup(t.End, t.Loop, t.Start);
      this.DitherRevertProperty = i.DitherRevertProperty;
    }
    this.UseCustomMaterialEffect = i.UseCustomMaterialEffect;
    if (this.UseCustomMaterialEffect) {
      this.CustomRevertProperty = i.CustomRevertProperty;
      var v = i.CustomColorParameters;
      if ((s = v.Num()) > 0) {
        this.CustomColorParameterNames = new Array();
        this.CustomColorParameterValues = new Array();
        for (let t = 0; t < s; t++) {
          var M = v.Get(t);
          if (!M.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE)) {
            this.CustomColorParameterNames.push(M.ParameterName);
            M = M.ParameterValue;
            this.CustomColorParameterValues.push(new CharMaterialControlColorGroup(M.End, M.Loop, M.Start));
          }
        }
      }
      var c = i.CustomFloatParameters;
      if ((s = c.Num()) > 0) {
        this.CustomFloatParameterNames = new Array();
        this.CustomFloatParameterValues = new Array();
        for (let t = 0; t < s; t++) {
          var u = c.Get(t);
          if (!u.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE)) {
            this.CustomFloatParameterNames.push(u.ParameterName);
            u = u.ParameterValue;
            this.CustomFloatParameterValues.push(new CharMaterialControlFloatGroup(u.End, u.Loop, u.Start));
          }
        }
      }
      var f = i.CustomTextureParameters;
      if ((s = f.Num()) > 0) {
        this.CustomTextureParameterNames = new Array();
        this.CustomTextureParameterValues = new Array();
        for (let t = 0; t < s; t++) {
          var p = f.Get(t);
          if (!p.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE)) {
            this.CustomTextureParameterNames.push(p.ParameterName);
            p = p.ParameterValue;
            this.CustomTextureParameterValues.push(new CharMaterialControlTextureGroup(p.End, p.Loop, p.Start));
          }
        }
      }
    }
    this.HiddenAfterEffect = i.HiddenAfterEffect;
    this.StatCharMaterialControlCacheData.Stop();
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataCache.Stop();
  }
}
exports.CharMaterialControlDataCache = CharMaterialControlDataCache;
class CharMaterialControlDataCacheMgr {
  constructor() {
    this.DataCacheMap = new Map();
    this.DataCacheGcCountDownTime = new Map();
    this.WaitingRemoveDataCacheNames = new Array();
    this.gW = undefined;
    this.e8 = 0;
    this.r6 = t => {
      this.e8 -= t;
      if (!(this.e8 > 0)) {
        this.gW.Start();
        var t = GlobalData_1.GlobalData.IsPlayInEditor ? CharMaterialControlDataCacheMgr.qlr : CharMaterialControlDataCacheMgr.Glr;
        var i = t - this.e8;
        for (const s of this.DataCacheGcCountDownTime.keys()) {
          var h = this.DataCacheGcCountDownTime.get(s) - i;
          if (h <= 0) {
            this.WaitingRemoveDataCacheNames.push(s);
          } else {
            this.DataCacheGcCountDownTime.set(s, h);
          }
        }
        if (this.WaitingRemoveDataCacheNames.length > 0) {
          for (const r of this.WaitingRemoveDataCacheNames) {
            this.DataCacheGcCountDownTime.delete(r);
            if (this.DataCacheMap.has(r)) {
              this.DataCacheMap.delete(r);
            }
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RenderCharacter", 40, "DataCache删除", ["数量", this.WaitingRemoveDataCacheNames.length]);
          }
          this.WaitingRemoveDataCacheNames.length = 0;
        }
        this.e8 = t;
        this.gW.Stop();
      }
    };
    this.e8 = GlobalData_1.GlobalData.IsPlayInEditor ? CharMaterialControlDataCacheMgr.qlr : CharMaterialControlDataCacheMgr.Glr;
    this.gW = Stats_1.Stat.Create("CharMaterialControlDataCacheMgr.Tick");
  }
  static Get() {
    if (!this.Me) {
      this.Me = new CharMaterialControlDataCacheMgr();
      TickSystem_1.TickSystem.Add(this.Me.r6, "CharMaterialControlDataCacheMgr.Tick", 3);
    }
    return this.Me;
  }
  GetOrCreateDataCache(i) {
    if (i) {
      var h = i.GetName();
      let t = this.DataCacheMap.get(h);
      if (!t) {
        t = new CharMaterialControlDataCache(h, i);
        this.DataCacheMap.set(h, t);
      }
      ++t.RefCount;
      if (this.DataCacheGcCountDownTime.has(h)) {
        this.DataCacheGcCountDownTime.delete(h);
      }
      return t;
    }
  }
  RecycleDataCache(t) {
    var i;
    var h = this.DataCacheMap.get(t);
    if (h) {
      --h.RefCount;
      if (h.RefCount <= 0 && (i = GlobalData_1.GlobalData.IsPlayInEditor ? CharMaterialControlDataCacheMgr.Nlr : CharMaterialControlDataCacheMgr.Olr, this.DataCacheGcCountDownTime.set(t, i), h.RefCount < 0) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 40, "RecycleDataCache: dataCache引用计数出错");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 40, "RecycleDataCache: dataCache不存在");
    }
  }
}
CharMaterialControlDataCacheMgr.Olr = 60000;
CharMaterialControlDataCacheMgr.Nlr = 0;
CharMaterialControlDataCacheMgr.Glr = 10000;
CharMaterialControlDataCacheMgr.qlr = 10;
CharMaterialControlDataCacheMgr.Me = undefined;
class CharMaterialControlRuntimeData {
  constructor() {
    this.Id = 0;
    this.DataCache = undefined;
    this.UserData = undefined;
    this.CurrentTimeCounter = 0;
    this.WholeLoopTimeCounter = 0;
    this.InterpolateFactor = undefined;
    this.LoopTimeCounter = 0;
    this.SpecifiedMaterialIndexMap = undefined;
    this.SelectedAllParts = false;
    this.ReadyToDie = false;
    this.IsDead = false;
    this.EffectState = 0;
    this.HasReverted = false;
    this.G8a = false;
    this.ReplaceMaterial = undefined;
    this.MotionStartLocation = undefined;
    this.TargetSkeletalMesh = undefined;
    this.MotionEndLocation = undefined;
    this.klr = undefined;
    this.LastUpdateTime = 0;
    this.Flr = undefined;
  }
  Init(t, i, h) {
    this.Id = t;
    this.DataCache = CharMaterialControlDataCacheMgr.Get().GetOrCreateDataCache(i);
    this.CurrentTimeCounter = 0;
    this.WholeLoopTimeCounter = 0;
    this.LoopTimeCounter = 0;
    this.UserData = h;
    this.InterpolateFactor = new InterpolateFactor();
    this.InterpolateFactor.Type = 0;
    this.InterpolateFactor.Factor = 0;
    this.HasReverted = false;
    this.IsDead = false;
    this.ReadyToDie = false;
    this.G8a = !i.UpdateAtLeastOneFrame;
    this.SelectedAllParts = false;
    this.SpecifiedMaterialIndexMap = new Map();
    this.ReplaceMaterial = undefined;
    this.Flr = undefined;
    this.klr = Stats_1.Stat.CreateNoFlameGraph("[CharMaterialControlRuntimeData.Destroy] Path:" + this.DataCache.DataName);
    this.LastUpdateTime = Time_1.Time.NowSeconds;
  }
  Destroy() {
    CharMaterialControlDataCacheMgr.Get().RecycleDataCache(this.DataCache.DataName);
    this.DataCache = undefined;
    if (this.Flr) {
      this.klr?.Start();
      if (this.Flr) {
        for (const t of this.Flr) {
          t(this.Id);
        }
        this.ClearDestroyCallback();
      }
      this.klr?.Stop();
    }
  }
  ClearDestroyCallback() {
    this.Flr = undefined;
  }
  AddDestroyCallback(t) {
    return !!t && (this.Flr ||= new Set(), !this.Flr.has(t)) && (this.Flr.add(t), true);
  }
  RemoveDestroyCallback(t) {
    return !!t && !!this.Flr && this.Flr.delete(t);
  }
  SetSpecifiedMaterialIndex(i) {
    this.SelectedAllParts = this.DataCache.SpecifiedSlotType === 0 && this.DataCache.SpecifiedParts === undefined && this.DataCache.CustomPartNames === undefined && this.DataCache.CustomExcludePartNames === undefined;
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataSetSpecified.Start();
    let h = undefined;
    if (this.DataCache.SpecifiedBodyType === 0) {
      h = [];
      for (const t of i.AllBodyInfoList.keys()) {
        h.push(t);
      }
    } else {
      h = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(this.DataCache.SpecifiedBodyType);
    }
    if (h && h.length) {
      for (let t = 0; t < h.length; t++) {
        var s = h[t];
        var r = i.AllBodyInfoList.get(s);
        if (r) {
          var a = r.BodyType;
          if ((a !== 1 || this.DataCache.WeaponCases === undefined || this.DataCache.WeaponCases.has(s)) && (a !== 3 || this.DataCache.OtherCases === undefined || this.DataCache.OtherCases.has(s))) {
            var e = r.SpecifiedSlotList[this.DataCache.SpecifiedSlotType];
            var o = new Array();
            for (let h = 0; h < e.length; h++) {
              var l = e[h];
              var n = r.MaterialSlotList[l];
              let i = false;
              let t = true;
              var C = this.DataCache.SpecifiedParts;
              if (C !== undefined) {
                var d = C.length;
                if (d > 0) {
                  t = false;
                  for (let t = 0; t < d; t++) {
                    if (n.MaterialPartType === C[t]) {
                      i = true;
                      break;
                    }
                  }
                }
              }
              var v = this.DataCache.CustomPartNames;
              if (v !== undefined) {
                var M = v.length;
                if (M > 0) {
                  t = false;
                  for (let t = 0; t < M; t++) {
                    if (n.SlotName.includes(v[t])) {
                      i = true;
                      break;
                    }
                  }
                }
              }
              if (i || t) {
                i = true;
                var c = this.DataCache.CustomExcludePartNames;
                if (c !== undefined) {
                  var u = c.length;
                  if (u > 0) {
                    for (let t = 0; t < u; t++) {
                      if (n.SlotName.includes(c[t])) {
                        i = false;
                        break;
                      }
                    }
                  }
                }
                if (i) {
                  o.push(l);
                }
              }
            }
            this.SpecifiedMaterialIndexMap.set(s, o);
          }
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataSetSpecified.Stop();
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderUtil", 13, "", ["BODY类型未配置:", this.DataCache.SpecifiedBodyType]);
    }
  }
  UpdateState(i, h) {
    if (this.IsDead) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 40, "RuntimeData UpdateState: 已经结束的效果，还在更新", ["id", this.Id], ["updated", this.G8a], ["data", this.DataCache.DataName]);
      }
    } else if (this.DataCache.DataType !== 2) {
      if (this.DataCache.WholeLoopTime <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 40, "材质控制器的总时长需大于0", ["data", this.DataCache.DataName]);
        }
        this.IsDead = true;
      } else if (this.DataCache.DataType === 1 && this.DataCache.DataLoopTime <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 40, "Runtime类型材质控制器的Loop时长需大于0", ["data", this.DataCache.DataName]);
        }
        this.IsDead = true;
      } else if (this.DataCache.IgnoreTimeDilation || !RenderModuleController_1.RenderModuleController.IsGamePaused) {
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateState.Start();
        let t = i;
        if (!this.DataCache.IgnoreTimeDilation) {
          t = i * h;
        }
        this.Vlr(t);
        this.CurrentTimeCounter += t;
        this.WholeLoopTimeCounter += t;
        this.LoopTimeCounter += t;
        i = this.GetSpecifiedLoopTime(this.InterpolateFactor.Type);
        this.LoopTimeCounter %= i;
        this.InterpolateFactor.Factor = RenderUtil_1.RenderUtil.Clamp(this.LoopTimeCounter / i, 0, 1);
        if (this.DataCache.DataType === 0 && this.CurrentTimeCounter >= this.DataCache.WholeLoopTime - t && this.G8a) {
          this.IsDead = true;
        }
        this.G8a = true;
        if (this.ReadyToDie && this.CurrentTimeCounter >= this.DataCache.DataLoopEnd) {
          this.IsDead = true;
        }
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateState.Stop();
      }
    }
  }
  RequestEffectStateEnter() {
    if (this.EffectState === 3) {
      this.EffectState = 0;
    } else if (this.EffectState === 2) {
      this.EffectState = 1;
    }
  }
  RequestEffectStateRevert() {
    if (this.EffectState === 1) {
      this.EffectState = 2;
    } else if (this.EffectState === 0) {
      this.EffectState = 3;
    }
  }
  UpdateEffect(t) {
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateEffect.Start();
    this.DataCache.StatCharMaterialControlUpdate.Start();
    if (this.IsDead) {
      this.RequestEffectStateRevert();
    }
    if (this.EffectState !== 3) {
      if (this.EffectState === 0) {
        t.StateEnter(this);
        this.EffectState = 1;
        t.StateUpdate(this);
      } else if (this.EffectState === 2) {
        t.StateRevert(this);
        this.EffectState = 3;
      } else {
        t.StateUpdate(this);
      }
    }
    this.DataCache.StatCharMaterialControlUpdate.Stop();
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateEffect.Stop();
  }
  Vlr(t) {
    var i = this.DataCache.DataLoopStart;
    var h = this.DataCache.DataLoopTime;
    if (!this.ReadyToDie && this.WholeLoopTimeCounter <= i - t) {
      if (this.InterpolateFactor.Type !== 0) {
        this.LoopTimeCounter = 0;
      }
      this.InterpolateFactor.Type = 0;
    } else if (!this.ReadyToDie && this.WholeLoopTimeCounter <= i + h - t) {
      if (this.InterpolateFactor.Type !== 1) {
        this.LoopTimeCounter = 0;
      }
      this.InterpolateFactor.Type = 1;
    } else if (this.WholeLoopTimeCounter <= this.DataCache.WholeLoopTime) {
      if (this.InterpolateFactor.Type !== 2) {
        this.LoopTimeCounter = 0;
      }
      if (this.ReadyToDie || this.DataCache.DataType !== 1) {
        this.InterpolateFactor.Type = 2;
      } else {
        this.InterpolateFactor.Type = 1;
        this.WholeLoopTimeCounter -= h;
      }
    }
  }
  SetReadyToDie() {
    this.ReadyToDie = true;
    if (this.InterpolateFactor.Type === 2) {
      var t = this.DataCache.WholeLoopTime - this.WholeLoopTimeCounter;
      if (t < this.DataCache.DataLoopEnd) {
        this.CurrentTimeCounter = this.DataCache.DataLoopEnd - t;
        return;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 40, "SetReadyToDie: End阶段的剩余时间小于End时间", ["leftTime", t], ["WholeLoopTimeCounter", this.WholeLoopTimeCounter], ["WholeLoopTime", this.DataCache.WholeLoopTime], ["DataLoopEnd", this.DataCache.DataLoopEnd]);
      }
    }
    this.CurrentTimeCounter = 0;
  }
  SetProgress(t) {
    if (this.DataCache.DataType === 2) {
      t = MathUtils_1.MathUtils.Clamp(t, 0, 1);
      t = this.DataCache.WholeLoopTime * t;
      this.Hlr(t);
    }
  }
  Hlr(t) {
    var i = this.DataCache.DataLoopStart;
    var h = this.DataCache.DataLoopTime;
    if (t <= i) {
      this.InterpolateFactor.Type = 0;
      this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(t, i);
    } else if (t <= i + h) {
      this.InterpolateFactor.Type = 1;
      this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(t - i, h);
    } else if (t <= this.DataCache.WholeLoopTime) {
      this.InterpolateFactor.Type = 2;
      this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(t - i - h, this.DataCache.DataLoopEnd);
    }
    this.InterpolateFactor.Factor = MathUtils_1.MathUtils.Clamp(this.InterpolateFactor.Factor, 0, 1);
  }
  GetSpecifiedLoopTime(t) {
    switch (t) {
      case 0:
        return this.DataCache.DataLoopStart ?? 0;
      case 1:
        return this.DataCache.DataLoopTime ?? 0;
      case 2:
        return this.DataCache.DataLoopEnd ?? 0;
      default:
        return 0;
    }
  }
}
exports.CharMaterialControlRuntimeData = CharMaterialControlRuntimeData;
//# sourceMappingURL=CharRuntimeMaterialControllerInfo.js.map