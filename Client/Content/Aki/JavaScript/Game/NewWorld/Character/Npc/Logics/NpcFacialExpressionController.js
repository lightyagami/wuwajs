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
const PLAYER_USED_ID = -1;
class NpcFacialExpressionController {
  constructor(t) {
    this.Mer = new UE.FName("AniSwitch_Face");
    this.Ser = new UE.FName("FaceAniMap");
    this.yer = new UE.FName("MI_Face");
    this.E0 = undefined;
    this.Hte = undefined;
    this.oRe = undefined;
    this.wDe = undefined;
    this.V0a = true;
    this.$0a = false;
    this.Ter = undefined;
    this.H0a = undefined;
    this.j0a = undefined;
    this.W0a = 1;
    this.Ler = undefined;
    this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
    this.HOc = undefined;
    this.$Oc = undefined;
    this.$7a = new Set();
    this.WHc = undefined;
    this.WOc = (t, i) => {
      if (t?.IsValid() && this.HOc === t && !this.oRe?.MainAnimInstance?.Montage_IsActive(t)) {
        this.HOc = undefined;
        this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.WOc);
        this.X7a();
        this.QOc("表情Montage结束");
      }
    };
    this.KOc = (t, i) => {
      if (t?.IsValid() && this.$Oc === t && !this.oRe?.MainAnimInstance?.Montage_IsActive(t)) {
        t = this.Hte?.Actor.CharRenderingComponent;
        if (this.WHc && t) {
          t.CanUpdate = true;
        }
        this.$Oc = undefined;
        this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.KOc);
        this.QOc("说话Montage结束");
      }
    };
    this.E0 = t;
    t = EntitySystem_1.EntitySystem.Get(this.E0);
    this.wDe = t?.GetComponent(0)?.GetPbDataId();
    this.oRe = t?.GetComponent(44);
    this.Hte = t?.GetComponent(2);
    var t = t?.GetComponent(0)?.GetPbEntityInitData();
    if (t &&= (0, IComponent_1.getComponent)(t.ComponentsData, "EntityVisibleComponent")) {
      this.WHc = t.UseHolographicEffect;
    }
  }
  YLe() {
    return this.wDe === PLAYER_USED_ID;
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
  z0a(t) {
    return !!t && (this.Ter = t, this.H0a = ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(this.Ter)?.FaceExpression, this.j0a = this.H0a?.Type, !!this.H0a || (Log_1.Log.CheckError() && Log_1.Log.Error("NPC", 50, "获取表情配置失败", ["FaceExpressionId", this.Ter], ["PbDataId", this.wDe]), false));
  }
  Z0a(t) {
    if (this.E0 && !this.YLe() && this.z0a(t)) {
      if (this.j0a === "Texture") {
        t = this.H0a;
        this.$0a = false;
        this.Der(t.FaceIndex);
      } else if (this.j0a === "Morph") {
        this.$0a = true;
        t = this.H0a;
        if (this.Ler) {
          this.XOc(this.Ler);
        }
        this.Ler = t.MorphData;
        this.Rer(t.MorphData);
      } else if (this.j0a === "AnimSequence") {
        t = this.H0a;
        if (!StringUtils_1.StringUtils.IsEmpty(t.Path)) {
          this.RWa = ResourceSystem_1.ResourceSystem.LoadAsync(t.Path, UE.AnimSequence, t => {
            this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
            t = this.oRe?.MainAnimInstance?.PlaySlotAnimationAsDynamicMontage(t, CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT, 0.5, 0.5, 1, 1, -1, 0, false);
            if (ObjectUtils_1.ObjectUtils.IsValid(t)) {
              this.oRe?.MainAnimInstance?.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, t);
            }
          });
        }
      }
    }
  }
  Rer(t) {
    if (!t) {
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
  XOc(t) {
    let i = "";
    for (const e of t.split(",")) {
      var s = e.split(":")[0].trim();
      i += s + ":0,";
    }
    if (i !== "") {
      i = i.slice(0, -1);
    }
    this.Rer(i);
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
      if (this.WHc && s) {
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
  ChangeFaceForExpressionFromAnimNotify(t, i) {
    var s = this.J0a(t);
    if (s) {
      if (s === "Texture" && this.W0a > 2) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "当前具有口型或来自于TD数据的表情，切换表情失败", ["PbDataId", this.wDe], ["FaceId", t]);
        }
      } else if (!this.$7a.has(i)) {
        this.$7a.add(i);
        this.Z0a(t);
        this.X0a(2, "通过ANS切换表情");
      }
    }
  }
  ResetFaceForExpressionFromAnimNotify(t) {
    if (!!this.$7a.delete(t) && !this.$7a.size && !this.HOc) {
      this.X7a();
      this.QOc("ANS表情结束");
    }
  }
  ResetFacialExpressionOuter() {
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.WOc);
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.KOc);
    this.X0a(1, "强制清除");
    this.X7a();
  }
  QOc(t = "") {
    if (this.$Oc) {
      this.X0a(4, t);
    } else if (this.HOc) {
      this.Z0a(this.Ter);
      this.X0a(3, t);
    } else if (this.$7a.size && this.Ter) {
      this.Z0a(this.Ter);
      this.X0a(2, t);
    } else {
      this.X0a(1, t);
      this.X7a();
    }
  }
  X7a() {
    if (this.E0 && !this.YLe()) {
      if (this.RWa !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.RWa);
        this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
      }
      this.oRe?.MainAnimInstance?.StopSlotAnimation(0.5, CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT);
      if (this.$0a) {
        if (this.Ler) {
          this.XOc(this.Ler);
        }
      } else {
        this.Der(1);
      }
      this.YOc();
    }
  }
  YOc() {
    this.Ter = undefined;
    this.H0a = undefined;
    this.Ler = undefined;
    this.HOc = undefined;
    this.X0a(1, "重置表情状态");
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
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
//# sourceMappingURL=NpcFacialExpressionController.js.map