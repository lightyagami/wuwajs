"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharBodyInfo = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharMaterialInfo_1 = require("./CharMaterialInfo");
class CharBodyInfo {
  constructor() {
    this.ActorName = "";
    this.BodyName = "";
    this.BodyType = undefined;
    this.MaterialSlotList = undefined;
    this.SpecifiedSlotList = undefined;
    this.SkeletalComp = undefined;
    this.SkeletalMesh = undefined;
    this.whr = undefined;
    this.Bhr = false;
    this.bhr = false;
    this.qhr = false;
    this.Ghr = false;
    this.Nhr = 0;
    this.Ohr = 0;
    this.khr = 0;
    this.Fhr = 0;
    this.Vhr = undefined;
    this.Hhr = undefined;
    this.jhr = undefined;
    this.Whr = undefined;
    this.Khr = undefined;
    this.Qhr = undefined;
    this.Xhr = undefined;
    this.$hr = undefined;
    this.Yhr = undefined;
    this.Uhr = undefined;
    this.LastUpdateCounter = 0;
  }
  Init(t, e, i, s, h = false) {
    this.Uhr = s;
    this.ActorName = t;
    this.BodyName = e;
    this.BodyType = RenderConfig_1.RenderConfig.GetBodyTypeByName(e);
    this.SkeletalComp = i;
    this.SkeletalMesh = i.SkeletalMesh;
    this.SpecifiedSlotList = new Array(4);
    this.SpecifiedSlotList[0] = new Array();
    this.SpecifiedSlotList[2] = new Array();
    this.SpecifiedSlotList[1] = new Array();
    this.SpecifiedSlotList[3] = new Array();
    var r = i.GetMaterialSlotNames();
    var a = r.Num();
    this.MaterialSlotList = new Array(a);
    for (let e = 0; e < a; e++) {
      let t = undefined;
      if (!h) {
        var o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSkeletalMaterialInterface(i.SkeletalMesh, e);
        if (!o?.IsValid()) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("RenderCharacter", 40, "CharBodyInfo.Init: originalMat is not valid");
          }
          continue;
        }
        if (!(t = i.CreateDynamicMaterialInstance(e, o))?.IsValid()) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("RenderCharacter", 40, "CharBodyInfo.Init: dynamicMaterial is not valid");
          }
          continue;
        }
      }
      this.MaterialSlotList[e] = new CharMaterialInfo_1.CharMaterialSlot();
      this.MaterialSlotList[e].Init(e, r.Get(e).toString(), t);
      this.SpecifiedSlotList[0].push(e);
      switch (this.MaterialSlotList[e].SlotType) {
        case 1:
        case 4:
          this.SpecifiedSlotList[2].push(e);
          this.SpecifiedSlotList[1].push(e);
          break;
        case 2:
          this.SpecifiedSlotList[3].push(e);
          this.SpecifiedSlotList[1].push(e);
      }
    }
    var n = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionCount(this.SkeletalMesh);
    this.whr = new Array(n);
    this.Vhr = new Array(n);
    this.Hhr = new Array(n);
    this.jhr = new Array(n);
    this.Whr = new Array(n);
    for (let t = 0; t < n; t++) {
      var l = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionMaterialIndex(this.SkeletalMesh, t);
      this.MaterialSlotList[l].SectionIndex = t;
      this.whr[t] = l;
      this.Vhr[t] = 0;
      this.Hhr[t] = 0;
      this.jhr[t] = 0;
      this.Whr[t] = 0;
    }
    this.Bhr = true;
    this.bhr = true;
    this.qhr = true;
    this.Ghr = true;
    this.Nhr = 0;
    this.Ohr = 0;
    this.khr = 0;
    this.Fhr = 0;
    s = this.ActorName + "_" + this.BodyName;
    this.Khr = Stats_1.Stat.CreateNoFlameGraph(["Render_CharBodyInfo_UpdateMaterial_", s].join());
    this.Qhr = Stats_1.Stat.CreateNoFlameGraph(["Render_CharBodyInfo_UpdateAlphaTest_", s].join());
    this.Yhr = Stats_1.Stat.CreateNoFlameGraph(["Render_CharBodyInfo_UpdateOutlineStencil_", s].join());
    this.Xhr = Stats_1.Stat.CreateNoFlameGraph(["Render_CharBodyInfo_UpdateBattle_", s].join());
    this.$hr = Stats_1.Stat.CreateNoFlameGraph(["Render_CharBodyInfo_UpdateBattleMask_", s].join());
  }
  UseBattleMaskCommon() {
    ++this.Fhr;
    this.Ghr = true;
    if (this.Fhr >= RenderConfig_1.RenderConfig.RefErrorCount) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "Battle类型引用异常，检查UseBattleMask调用情况", ["Battle Mask Reference Count", this.Fhr], ["Actor", this.ActorName]);
      }
      this.Jhr();
    }
  }
  UseBattleMask(t) {
    var e = this.Whr.length;
    if (t < e) {
      ++this.Whr[t];
      this.Ghr = true;
      if (this.Whr[t] >= RenderConfig_1.RenderConfig.RefErrorCount && Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "BattleMask类型引用异常，检查UseBattleMask调用情况", ["Battle Mask Reference Count", this.Whr[t]], ["Actor", this.ActorName]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "UseBattleMask索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  RevertBattleMaskCommon() {
    if (this.Fhr > 0) {
      --this.Fhr;
      this.Ghr = true;
    }
    this.UpdateBattleMask();
  }
  RevertBattleMask(t) {
    var e = this.Whr.length;
    if (t < e) {
      if (this.Whr[t] > 0) {
        --this.Whr[t];
        this.Ghr = true;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "RevertBattleMask索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  UseBattleCommon() {
    ++this.khr;
    this.qhr = true;
    if (this.khr >= RenderConfig_1.RenderConfig.RefErrorCount) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "Battle类型引用异常，检查UseBattleCommon调用情况", ["Battle Reference Count", this.khr], ["Actor", this.ActorName]);
      }
      this.Jhr();
    }
  }
  UseBattle(t) {
    var e = this.jhr.length;
    if (t < e) {
      ++this.jhr[t];
      this.qhr = true;
      if (this.jhr[t] >= RenderConfig_1.RenderConfig.RefErrorCount) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 13, "Battle类型引用异常，检查UseBattle调用情况", ["Battle Reference Count", this.jhr[t]], ["Actor", this.ActorName]);
        }
        this.Jhr();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "UseBattle索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  RevertBattleCommon() {
    if (this.khr > 0) {
      --this.khr;
      this.qhr = true;
    }
    this.UpdateBattle();
  }
  RevertBattle(t) {
    var e = this.jhr.length;
    if (t < e) {
      if (this.jhr[t] > 0) {
        --this.jhr[t];
        this.qhr = true;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "RevertBattle索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  UseAlphaTestCommon() {
    ++this.Nhr;
    this.Bhr = true;
    if (this.Nhr >= RenderConfig_1.RenderConfig.RefErrorCount && Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "AlphaTest类型引用异常，检查UseAlphaTest调用情况", ["AlphaTest Reference Count", this.Nhr], ["Actor", this.ActorName]);
    }
  }
  UseAlphaTest(t) {
    var e = this.Vhr.length;
    if (t < e) {
      ++this.Vhr[t];
      this.Bhr = true;
      if (this.Vhr[t] >= RenderConfig_1.RenderConfig.RefErrorCount && Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "AlphaTestMask类型引用异常，检查UseAlphaTest调用情况", ["AlphaTest Reference Count", this.Vhr[t]], ["Actor", this.ActorName]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "UseAlphaTestMask索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  RevertAlphaTestCommon() {
    if (this.Nhr > 0) {
      --this.Nhr;
      this.Bhr = true;
    }
    this.UpdateAlphaTest();
  }
  RevertAlphaTest(t) {
    var e = this.Vhr.length;
    if (t < e) {
      if (this.Vhr[t] > 0) {
        --this.Vhr[t];
        this.Bhr = true;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "RevertAlphaTestMask索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  UseOutlineStencilTestCommon() {
    ++this.Ohr;
    this.bhr = true;
    if (this.Ohr >= RenderConfig_1.RenderConfig.RefErrorCount && Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "StencilOutline类型引用异常，检查UseAlphaTest调用情况", ["StencilOutline Reference Count", this.Nhr], ["Actor", this.ActorName]);
    }
  }
  UseOutlineStencilTest(t) {
    var e = this.Hhr.length;
    if (t < e) {
      ++this.Hhr[t];
      this.bhr = true;
      if (this.Hhr[t] >= RenderConfig_1.RenderConfig.RefErrorCount && Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "StencilOutlineMask类型引用异常，检查UseStencilOutline调用情况", ["StencilOutline Reference Count", this.Hhr[t]], ["Actor", this.ActorName]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "UseStencilOutlineMask索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  RevertOutlineStencilTestCommon() {
    if (this.Ohr > 0) {
      --this.Ohr;
      this.bhr = true;
    }
    this.UpdateStencilOutlineTest();
  }
  RevertOutlineStencilTest(t) {
    var e = this.Hhr.length;
    if (t < e) {
      if (this.Hhr[t] > 0) {
        --this.Hhr[t];
        this.bhr = true;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "RevertOutlineStencilMask索引超过最大值", ["索引", t], ["最大值", e - 1], ["Actor", this.ActorName]);
    }
  }
  SetColor(e, i, t) {
    var s = this.SpecifiedSlotList[t];
    var h = s.length;
    for (let t = 0; t < h; t++) {
      this.MaterialSlotList[s[t]].SetColor(e, i);
    }
  }
  RevertColor(t, e) {
    var i = this.SpecifiedSlotList[e];
    var s = i.length;
    var h = t.toString();
    for (let t = 0; t < s; t++) {
      this.MaterialSlotList[i[t]].RevertColor(h);
    }
  }
  SetFloat(e, i, t) {
    var s = this.SpecifiedSlotList[t];
    var h = s.length;
    for (let t = 0; t < h; t++) {
      this.MaterialSlotList[s[t]].SetFloat(e, i);
    }
  }
  RevertFloat(t, e) {
    var i = this.SpecifiedSlotList[e];
    var s = i.length;
    var h = t.toString();
    for (let t = 0; t < s; t++) {
      this.MaterialSlotList[i[t]].RevertFloat(h);
    }
  }
  SetTexture(e, i, t) {
    var s = this.SpecifiedSlotList[t];
    var h = s.length;
    for (let t = 0; t < h; t++) {
      this.MaterialSlotList[s[t]].SetTexture(e, i);
    }
  }
  RevertTexture(t, e) {
    var i = this.SpecifiedSlotList[e];
    var s = i.length;
    var h = t.toString();
    for (let t = 0; t < s; t++) {
      this.MaterialSlotList[i[t]].RevertTexture(h);
    }
  }
  SetStarScarEnergy(e) {
    var i = this.MaterialSlotList.length;
    for (let t = 0; t < i; t++) {
      this.MaterialSlotList[t].SetStarScarEnergy(e);
    }
  }
  SetNoWater(t) {
    if (this.SkeletalComp?.IsValid()) {
      this.SkeletalComp.SetDisableWaterForToon(t);
    }
  }
  Update(t = undefined) {
    this.Khr.Start();
    if (t !== undefined && this.SkeletalComp.IsValid()) {
      this.SkeletalComp.SetMeshShadingRate(t);
    }
    t = this.zhr();
    this.Khr.Stop();
    this.UpdateAlphaTest();
    this.UpdateStencilOutlineTest();
    this.UpdateBattle();
    this.UpdateBattleMask();
    return t;
  }
  ResetAllState() {
    this.Bhr = true;
    this.bhr = true;
    this.Nhr = 0;
    this.Ohr = 0;
    this.Vhr.fill(0);
    this.Hhr.fill(0);
    this.jhr.fill(0);
    this.Whr.fill(0);
    this.Hhr.fill(0);
    this.UpdateAlphaTest();
    this.UpdateStencilOutlineTest();
    this.UpdateBattle();
    this.UpdateBattleMask();
  }
  Jhr() {
    var t = this.Uhr.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
    if (t) {
      t.PrintCurrentInfo();
    }
  }
  zhr() {
    if (!this.SkeletalComp || !this.SkeletalComp.IsValid()) {
      return 0;
    }
    let e = 0;
    var i = this.MaterialSlotList.length;
    for (let t = 0; t < i; t++) {
      var s = this.MaterialSlotList[t];
      e += s.UpdateMaterialParam();
      s.SetSkeletalMeshMaterial(this.SkeletalComp);
    }
    return e;
  }
  UpdateBattleMask() {
    if (this.Ghr) {
      this.Ghr = false;
      this.$hr.Start();
      let t = false;
      let e = false;
      var i = UE.NewArray(UE.BuiltinInt);
      if (this.Fhr > 0) {
        t = true;
        e = false;
      } else {
        var s = this.Whr.length;
        for (let t = 0; t < s; t++) {
          if (this.Whr[t] > 0) {
            i.Add(t);
          }
        }
        t = i.Num() > 0;
        e = t;
      }
      if (this.SkeletalComp?.IsValid()) {
        this.SkeletalComp.SetUseEnableBattleMask(t);
        this.SkeletalComp.SetUseEnableBattleMaskSectionMask(e, i);
      }
      this.$hr.Stop();
    }
  }
  UpdateBattle() {
    if (this.qhr) {
      this.qhr = false;
      this.Xhr.Start();
      let t = false;
      let e = false;
      var i = UE.NewArray(UE.BuiltinInt);
      if (this.khr > 0) {
        t = true;
        e = false;
      } else {
        var s = this.jhr.length;
        for (let t = 0; t < s; t++) {
          if (this.jhr[t] > 0) {
            i.Add(t);
          }
        }
        t = i.Num() > 0;
        e = t;
      }
      if (this.SkeletalComp?.IsValid()) {
        this.SkeletalComp.SetUseEnableBattle(t);
        this.SkeletalComp.SetUseEnableBattleSectionMask(e, i);
      }
      this.Xhr.Stop();
    }
  }
  UpdateAlphaTest() {
    if (this.Bhr) {
      this.Bhr = false;
      this.Qhr.Start();
      let t = false;
      let e = false;
      var i = UE.NewArray(UE.BuiltinInt);
      if (this.Nhr > 0) {
        t = true;
        e = false;
      } else {
        var s = this.Vhr.length;
        for (let t = 0; t < s; t++) {
          if (this.Vhr[t] > 0) {
            i.Add(t);
          }
        }
        t = i.Num() > 0;
        e = t;
      }
      if (this.SkeletalComp?.IsValid()) {
        this.SkeletalComp.SetUseCustomAlphaTest(t);
        this.SkeletalComp.SetUseCustomAlphaTestSectionMask(e, i);
      }
      this.Qhr.Stop();
    }
  }
  UpdateStencilOutlineTest() {
    if (this.bhr) {
      this.bhr = false;
      this.Yhr.Start();
      let t = false;
      let e = false;
      var i = UE.NewArray(UE.BuiltinInt);
      if (this.Ohr > 0) {
        t = true;
        e = false;
      } else {
        var s = this.Hhr.length;
        for (let t = 0; t < s; t++) {
          if (this.Hhr[t] > 0) {
            i.Add(t);
          }
        }
        t = i.Num() > 0;
        e = t;
      }
      if (this.SkeletalComp?.IsValid()) {
        this.SkeletalComp.SetUseOutlineStencilTest(t);
        this.SkeletalComp.SetUseOutlineStencilTestSectionMask(e, i);
      }
      this.Yhr.Stop();
    }
  }
}
exports.CharBodyInfo = CharBodyInfo;
//# sourceMappingURL=CharBodyInfo.js.map