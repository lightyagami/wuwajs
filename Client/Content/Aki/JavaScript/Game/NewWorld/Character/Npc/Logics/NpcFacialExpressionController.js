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
const TRIFFIC_LIGHT_SLOT_YAW = -120;
class FaceExpressionInfo {
  constructor(t) {
    this.Id = undefined;
    this.Type = undefined;
    this.Config = undefined;
    this.Asset = undefined;
    this.DisableBlink = false;
    this.Id = t;
    t = ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(t);
    this.Config = t?.FaceExpression;
    this.Type = this.Config?.Type;
    this.DisableBlink = t?.CloseAutoBlink ?? false;
  }
  IsValid() {
    return !!this.Config;
  }
}
class NpcFacialExpressionController {
  constructor(t) {
    this.Oud = 0;
    this.Mer = new UE.FName("AniSwitch_Face");
    this.Ser = new UE.FName("FaceAniMap");
    this.yer = new UE.FName("MI_Face");
    this.E0 = undefined;
    this.Hte = undefined;
    this.oRe = undefined;
    this.wDe = undefined;
    this._Jc = undefined;
    this.uJc = undefined;
    this.$0a = false;
    this.Ler = undefined;
    this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
    this.pif = undefined;
    this.vif = 0;
    this.V0a = true;
    this.W0a = 1;
    this.HOc = undefined;
    this.$Oc = undefined;
    this.$7a = new Set();
    this.AYu = undefined;
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
        if (this.AYu && t) {
          t.CanUpdate = true;
        }
        this.$Oc = undefined;
        this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.KOc);
        this.QOc("说话Montage结束");
      }
    };
    this.E0 = t;
    this.wDe = EntitySystem_1.EntitySystem.GetComponent(t, 0)?.GetPbDataId();
    this.oRe = EntitySystem_1.EntitySystem.GetComponent(t, 47);
    this.Hte = EntitySystem_1.EntitySystem.GetComponent(t, 2);
  }
  Init() {
    var t = EntitySystem_1.EntitySystem.GetComponent(this.E0, 0)?.GetPbEntityInitData();
    if (t) {
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityVisibleComponent");
      if (i) {
        this.AYu = i.UseHolographicEffect;
      }
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "NpcPerformComponent");
      if (i) {
        if (i.DefaultFaceExpressionId && (t = new FaceExpressionInfo(i.DefaultFaceExpressionId))?.IsValid()) {
          this.uJc = t;
          this.QOc("初始化默认表情");
        }
        if (i.NpcSpecialMarks) {
          for (const e of i.NpcSpecialMarks) {
            if (e.Type === IComponent_1.ESpecialNpcMarkType.TrafficLight) {
              this.pif = IComponent_1.ESpecialNpcMarkType.TrafficLight;
              break;
            }
          }
        }
      }
    }
  }
  Y0a(t, i = "") {
    var e;
    if (this.V0a !== t && (e = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(2)?.Owner)?.IsValid() && (e.CanUpdateTextureFace = t, this.V0a = t, Log_1.Log.CheckDebug())) {
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
        if (this.cJc(i)) {
          this._Jc = i;
          this.$0a = i.Type === "Morph";
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "获取表情配置失败", ["FaceExpressionId", t], ["PbDataId", this.wDe]);
      }
    }
  }
  cJc(t) {
    switch (t.Type) {
      case "Texture":
        var i = t.Config;
        this.Der(i.FaceIndex);
        break;
      case "TextureMultiSlot":
        i = t.Config;
        this.Der(i.FaceIndex, i.SlotIndex);
        break;
      case "Morph":
        i = t.Config;
        if (this.Ler) {
          this.XOc(this.Ler);
        }
        this.Ler = i.MorphData;
        this.Rer(i.MorphData);
        break;
      case "AnimSequence":
        this.nZc(t);
    }
    var e = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(47);
    if (e?.Valid) {
      e.DisableBlink = t.DisableBlink;
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
      var e = h.split(":");
      var s = e[0].trim();
      var e = Number(e[1].trim());
      i.SetMorphTarget(new UE.FName(s), e);
    }
    return true;
  }
  nZc(i) {
    var t;
    if (this.RWa !== ResourceSystem_1.ResourceSystem.InvalidId && (this._Jc ?? this.uJc)?.Config.Path !== i.Config.Path) {
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
      for (const s of i.split(",")) {
        var e = s.split(":")[0].trim();
        t += e + ":0,";
      }
      if (t !== "") {
        t = t.slice(0, -1);
      }
      this.Rer(t);
    }
  }
  Der(t, i = 0) {
    var e;
    var s;
    var h;
    var r;
    return !!this.E0 && !!(r = EntitySystem_1.EntitySystem.Get(this.E0))?.Valid && !!r?.GetComponent(2).Owner?.IsValid() && !(r = this.Uer(), e = this.Hte?.Actor.CharRenderingComponent, !r?.IsValid()) && !!e?.IsValid() && !!(s = e?.GetSkeletalMeshComponentBodyName(r)) && !(h = r.GetMaterialIndex(this.yif(i)), (r = r?.GetMaterial(h))?.IsValid() && r?.IsA(UE.MaterialInstanceDynamic.StaticClass()) ? r.K2_GetTextureParameterValue(this.Ser)?.IsValid() ? (this.Sif() && (this.vif = i, this.oRe?.SetHeadBaseYaw(this.Mif(i))), e.AddFloatUpdateParamPermanentByIndexV2(this.Mer, t, s, h), 0) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("NPC", 50, "FaceMesh未配置或错误配置FaceAniMap贴图", ["PbDataId", this.wDe], ["ExpressionId", t], ["MatName", r?.GetName()], ["Montage", this.HOc?.GetName() ?? "None"]), 1) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("NPC", 50, "设置贴图表情失败，无法获取脸部动态材质实例", ["PbDataId", this.wDe], ["ExpressionId", t], ["BodyName", s], ["MatName", r?.GetName()], ["Montage", this.HOc?.GetName() ?? "None"]), 1));
  }
  yif(t) {
    if (!this.Sif()) {
      if (t !== 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "单插槽脸使用了多插槽", ["PbDataId", this.wDe], ["SlotId", t]);
      }
      return this.yer;
    }
    let i = this.yer.toString();
    if (t < 10) {
      i += "0";
    }
    i += (t + 1).toString();
    return new UE.FName(i);
  }
  Uer() {
    if (this.E0) {
      var t = EntitySystem_1.EntitySystem.Get(this.E0);
      if (t?.Valid) {
        var e = t?.GetComponent(2).Owner;
        if (e?.IsValid()) {
          var s = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
          var h = s.Num();
          if (h) {
            let i = undefined;
            e = t.GetComponent(0)?.GetModelConfig()?.DA.AssetPathName?.toString();
            if (e?.length && e !== "None") {
              for (let t = 0; t < h; ++t) {
                var r = s.Get(t);
                if (r.GetName() === "Face") {
                  i = r;
                  break;
                }
              }
            } else {
              i = s.Get(0);
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
    var e;
    if (t && this.E0 && (i = this.oRe?.MainAnimInstance)) {
      e = this.Hte?.Actor.CharRenderingComponent;
      if (this.AYu && e) {
        e.CanUpdate = false;
      }
      this.$Oc = t;
      this.X0a(4, "开始播放口型Montage");
      i.OnMontageEnded.Add(this.KOc);
    }
  }
  ChangeFaceForExpression(t, i) {
    var e = this.J0a(i);
    if (e) {
      if (this.Eif(e) && this.W0a > 3) {
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
      if (this.Eif(i) && this.W0a > 2) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "当前具有口型或来自于TD数据的表情，切换表情失败", ["PbDataId", this.wDe], ["FaceId", t]);
        }
        return 0;
      } else {
        i = this.Iif();
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
      this.Z0a(this._Jc?.Id);
      this.X0a(3, t);
    } else if (this.$7a.size && this._Jc?.Id) {
      this.Z0a(this._Jc.Id);
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
      switch (this._Jc?.Type ?? this.uJc?.Type ?? (this.$0a ? "Morph" : "Texture")) {
        case "Texture":
          var i = this.uJc?.Config;
          this.Der(i?.FaceIndex ?? 1, this.vif);
          break;
        case "TextureMultiSlot":
          i = this.uJc?.Config;
          this.Der(i?.FaceIndex ?? 1, this.vif);
          break;
        case "Morph":
          this.XOc(this.Ler);
          this.Ler = undefined;
          i = this.uJc?.Config;
          if (i?.MorphData) {
            this.Ler = i.MorphData;
            this.Rer(i.MorphData);
          }
          break;
        case "AnimSequence":
          if (this.uJc?.IsValid()) {
            this.nZc(this.uJc);
          }
      }
      var e = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(47);
      if (e?.Valid) {
        e.DisableBlink = false;
      }
      this._Jc = undefined;
      this.HOc = undefined;
      this.dJc(t);
    }
  }
  dJc(t = "") {
    if (this.uJc?.IsValid()) {
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
  Iif() {
    return ++this.Oud;
  }
  Eif(t) {
    return t === "Texture" || t === "TextureMultiSlot";
  }
  Sif() {
    return this.pif !== undefined;
  }
  Mif(t) {
    if (this.pif !== IComponent_1.ESpecialNpcMarkType.TrafficLight) {
      return 0;
    } else {
      return t * TRIFFIC_LIGHT_SLOT_YAW;
    }
  }
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
//# sourceMappingURL=NpcFacialExpressionController.js.map