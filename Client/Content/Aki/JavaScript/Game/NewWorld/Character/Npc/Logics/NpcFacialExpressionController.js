"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcFacialExpressionController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
class FaceExpressionInfo {
  constructor(t) {
    this.Id = undefined;
    this.Type = undefined;
    this.Config = undefined;
    this.Asset = undefined;
    this.Id = t;
    this.Config = ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(t)?.FaceExpression;
    this.Type = this.Config?.Type;
  }
  IsValid() {
    return !!this.Config;
  }
}
class NpcFacialExpressionController {
  constructor(t) {
    this.vad = 0;
    this.Mer = new UE.FName("AniSwitch_Face");
    this.Ser = new UE.FName("FaceAniMap");
    this.yer = new UE.FName("MI_Face");
    this.E0 = undefined;
    this.Hte = undefined;
    this.oRe = undefined;
    this.wDe = undefined;
    this.lYc = undefined;
    this._Yc = undefined;
    this.$0a = false;
    this.Ler = undefined;
    this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
    this.V0a = true;
    this.W0a = 1;
    this.HOc = undefined;
    this.$Oc = undefined;
    this.$7a = new Set();
    this.hQc = undefined;
    this.WOc = (t, i) => {
      if (t?.IsValid() && this.HOc === t && !this.oRe?.MainAnimInstance?.Montage_IsActive(t)) {
        this.HOc = undefined;
        this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.WOc);
        this.X7a("表情Montage结束");
        this.QOc("表情Montage结束");
      }
    };
    this.KOc = (t, i) => {
      if (t?.IsValid() && this.$Oc === t && !this.oRe?.MainAnimInstance?.Montage_IsActive(t)) {
        t = this.Hte?.Actor.CharRenderingComponent;
        if (this.hQc && t) {
          t.CanUpdate = true;
        }
        this.$Oc = undefined;
        this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.KOc);
        this.QOc("说话Montage结束");
      }
    };
    this.E0 = t;
    this.wDe = EntitySystem_1.EntitySystem.GetComponent(t, 0)?.GetPbDataId();
    this.oRe = EntitySystem_1.EntitySystem.GetComponent(t, 44);
    this.Hte = EntitySystem_1.EntitySystem.GetComponent(t, 2);
  }
  Init() {
    var t;
    var i = EntitySystem_1.EntitySystem.GetComponent(this.E0, 0)?.GetPbEntityInitData();
    if (i && ((t = (0, IComponent_1.getComponent)(i.ComponentsData, "EntityVisibleComponent")) && (this.hQc = t.UseHolographicEffect), t = (0, IComponent_1.getComponent)(i.ComponentsData, "NpcPerformComponent")) && t.DefaultFaceExpressionId && (i = new FaceExpressionInfo(t.DefaultFaceExpressionId))?.IsValid()) {
      this._Yc = i;
      this.QOc("初始化默认表情");
    }
  }
  Y0a(t, i = "") {
    var s;
    if (this.V0a !== t && (s = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(2)?.Owner)?.IsValid() && (s.CanUpdateTextureFace = t, this.V0a = t, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("NPC", 50, "切换NPC贴图表情控制权", ["PbDataId", this.wDe], ["IsAnimUpdate", t], ["Reason", i]);
    }
  }
  J0a(t) {
    if (t) {
      return ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(t)?.FaceExpression.Type;
    }
  }
  Z0a(t) {
    var i;
    if (this.E0 && t) {
      if ((i = new FaceExpressionInfo(t)).IsValid()) {
        if (this.uYc(i)) {
          this.lYc = i;
          this.$0a = i.Type === "Morph";
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "获取表情配置失败", ["FaceExpressionId", t], ["PbDataId", this.wDe]);
      }
    }
  }
  uYc(t) {
    var i;
    if (t.Type === "Texture") {
      i = t.Config;
      this.Der(i.FaceIndex);
    } else if (t.Type === "Morph") {
      i = t.Config;
      if (this.Ler) {
        this.XOc(this.Ler);
      }
      this.Ler = i.MorphData;
      this.Rer(i.MorphData);
    } else if (t.Type === "AnimSequence") {
      this.ozc(t);
    }
    return true;
  }
  Rer(t) {
    if (!t || t === "") {
      return false;
    }
    var i = this.Uer();
    if (!i?.IsValid()) {
      return false;
    }
    for (const h of t.split(",")) {
      var s = h.split(":");
      var e = s[0].trim();
      var s = Number(s[1].trim());
      i.SetMorphTarget(new UE.FName(e), s);
    }
    return true;
  }
  ozc(i) {
    var t;
    if (this.RWa !== ResourceSystem_1.ResourceSystem.InvalidId && (this.lYc ?? this._Yc)?.Config.Path !== i.Config.Path) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.RWa);
      this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (i.Asset?.IsValid()) {
      this.oRe?.MainAnimInstance?.StopSlotAnimation(0.5, CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT);
      t = this.oRe?.MainAnimInstance?.PlaySlotAnimationAsDynamicMontage(i.Asset, CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT, 0.5, 0.5, 1, 1, -1, 0, false);
      return !!ObjectUtils_1.ObjectUtils.IsValid(t) && (this.oRe?.MainAnimInstance?.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, t), true);
    } else {
      t = i.Config;
      return !StringUtils_1.StringUtils.IsEmpty(t.Path) && (this.RWa = ResourceSystem_1.ResourceSystem.LoadAsync(t.Path, UE.AnimSequence, t => {
        this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
        if (t?.IsValid() && (i?.IsValid() && (i.Asset = t), this.oRe?.MainAnimInstance?.StopSlotAnimation(0.5, CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT), t = this.oRe?.MainAnimInstance?.PlaySlotAnimationAsDynamicMontage(t, CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT, 0.5, 0.5, 1, 1, -1, 0, false), ObjectUtils_1.ObjectUtils.IsValid(t))) {
          this.oRe?.MainAnimInstance?.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, t);
        }
      }), true);
    }
  }
  XOc(i) {
    if (i) {
      let t = "";
      for (const e of i.split(",")) {
        var s = e.split(":")[0].trim();
        t += s + ":0,";
      }
      if (t !== "") {
        t = t.slice(0, -1);
      }
      this.Rer(t);
    }
  }
  Der(t) {
    var i;
    var s;
    var e;
    var h;
    return !!this.E0 && !!(h = EntitySystem_1.EntitySystem.Get(this.E0))?.Valid && !!h?.GetComponent(2).Owner?.IsValid() && !(h = this.Uer(), i = this.Hte?.Actor.CharRenderingComponent, !h?.IsValid()) && !!i?.IsValid() && !!(s = i?.GetSkeletalMeshComponentBodyName(h)) && !(e = h.GetMaterialIndex(this.yer), (h = h?.GetMaterial(e))?.IsValid() && h?.IsA(UE.MaterialInstanceDynamic.StaticClass()) ? h.K2_GetTextureParameterValue(this.Ser)?.IsValid() ? (i.AddFloatUpdateParamPermanentByIndexV2(this.Mer, t, s, e), 0) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("NPC", 50, "FaceMesh未配置或错误配置FaceAniMap贴图", ["PbDataId", this.wDe], ["ExpressionId", t], ["MatName", h?.GetName()], ["Montage", this.HOc?.GetName() ?? "None"]), 1) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("NPC", 50, "设置贴图表情失败，无法获取脸部动态材质实例", ["PbDataId", this.wDe], ["ExpressionId", t], ["BodyName", s], ["MatName", h?.GetName()], ["Montage", this.HOc?.GetName() ?? "None"]), 1));
  }
  Uer() {
    if (this.E0) {
      var t = EntitySystem_1.EntitySystem.Get(this.E0);
      if (t?.Valid) {
        var s = t?.GetComponent(2).Owner;
        if (s?.IsValid()) {
          var e = s.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
          var h = e.Num();
          if (h) {
            let i = undefined;
            s = t.GetComponent(0)?.GetModelConfig()?.DA.AssetPathName?.toString();
            if (s?.length && s !== "None") {
              for (let t = 0; t < h; ++t) {
                var r = e.Get(t);
                if (r.GetName() === "Face") {
                  i = r;
                  break;
                }
              }
            } else {
              i = e.Get(0);
            }
            if (i?.IsValid()) {
              return i;
            }
          }
        }
      }
    }
  }
  X0a(t, i = "") {
    if (this.W0a !== t) {
      switch (this.W0a = t) {
        case 1:
          this.Y0a(true, i);
          break;
        case 2:
        case 3:
          this.Y0a(false, i);
          break;
        case 4:
          this.Y0a(true, i);
      }
    }
  }
  ChangeFaceForMouthMontage(t) {
    var i;
    var s;
    if (t && this.E0 && (i = this.oRe?.MainAnimInstance)) {
      s = this.Hte?.Actor.CharRenderingComponent;
      if (this.hQc && s) {
        s.CanUpdate = false;
      }
      this.$Oc = t;
      this.X0a(4, "开始播放口型Montage");
      i.OnMontageEnded.Add(this.KOc);
    }
  }
  ChangeFaceForExpression(t, i) {
    var s = this.J0a(i);
    if (s) {
      if (s === "Texture" && this.W0a > 3) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "当前正在说话，切换表情失败", ["PbDataId", this.wDe], ["FaceId", i]);
        }
      } else {
        this.Z0a(i);
        this.HOc = t;
        this.X0a(3, "切换表情");
        this.oRe.MainAnimInstance.OnMontageEnded.Add(this.WOc);
      }
    }
  }
  ChangeFaceForExpressionFromAnimNotify(t) {
    var i = this.J0a(t);
    if (i) {
      if (i === "Texture" && this.W0a > 2) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "当前具有口型或来自于TD数据的表情，切换表情失败", ["PbDataId", this.wDe], ["FaceId", t]);
        }
        return 0;
      } else {
        i = this.GetFacialExpressionHandleId();
        this.$7a.add(i);
        this.Z0a(t);
        this.X0a(2, "通过ANS切换表情");
        return i;
      }
    } else {
      return 0;
    }
  }
  ResetFaceForExpressionFromAnimNotify(t) {
    if (!!this.$7a.delete(t) && !this.$7a.size && !this.HOc) {
      this.X7a("ANS表情结束");
      this.QOc("ANS表情结束");
    }
  }
  ResetFacialExpressionOuter() {
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.WOc);
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.KOc);
    this.X7a("强制清除");
  }
  QOc(t = "") {
    if (this.$Oc) {
      this.X0a(4, t);
    } else if (this.HOc) {
      this.Z0a(this.lYc?.Id);
      this.X0a(3, t);
    } else if (this.$7a.size && this.lYc?.Id) {
      this.Z0a(this.lYc.Id);
      this.X0a(2, t);
    } else {
      this.X7a(t);
    }
  }
  X7a(t = "") {
    if (this.E0) {
      if (this.RWa !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.RWa);
        this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
      }
      this.oRe?.MainAnimInstance?.StopSlotAnimation(0.5, CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT);
      switch (this.lYc?.Type ?? this._Yc?.Type ?? (this.$0a ? "Morph" : "Texture")) {
        case "Texture":
          var i = this._Yc?.Config;
          this.Der(i?.FaceIndex ?? 1);
          break;
        case "Morph":
          this.XOc(this.Ler);
          this.Ler = undefined;
          i = this._Yc?.Config;
          if (i?.MorphData) {
            this.Ler = i.MorphData;
            this.Rer(i.MorphData);
          }
          break;
        case "AnimSequence":
          if (this._Yc?.IsValid()) {
            this.ozc(this._Yc);
          }
      }
      this.lYc = undefined;
      this.HOc = undefined;
      this.cYc(t);
    }
  }
  cYc(t = "") {
    if (this._Yc?.IsValid()) {
      this.X0a(3, t);
    } else {
      this.X0a(1, t);
    }
  }
  Dispose() {
    var t = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(2)?.Owner;
    if (t?.IsValid()) {
      t.CanUpdateTextureFace = true;
    }
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.WOc);
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.KOc);
    return true;
  }
  GetFacialExpressionHandleId() {
    return ++this.vad;
  }
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
//# sourceMappingURL=NpcFacialExpressionController.js.map