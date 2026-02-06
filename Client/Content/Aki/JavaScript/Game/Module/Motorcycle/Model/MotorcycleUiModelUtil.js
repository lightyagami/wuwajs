"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleUiModelUtil = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const MotorcycleDiyDefine_1 = require("../DIY/MotorcycleDiyDefine");
class MotorcycleUiModelUtil {
  static CreateMotor(t = 18) {
    UiSceneManager_1.UiSceneManager.InitMotorSkeletalHandle(t);
  }
  static DestroyMotor() {
    UiSceneManager_1.UiSceneManager.DestroyMotorSkeletalHandle();
  }
  static oGg() {
    var t = UiSceneManager_1.UiSceneManager.GetMotorSkeletalHandle();
    return t && t.Model;
  }
  static uNg() {
    return {
      FrameId: ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedFrameId(),
      StickerIds: ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList(),
      DecorationIds: ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationIdList()
    };
  }
  static IsMotorCreated() {
    return this.oGg() !== undefined;
  }
  static ShowMotor(t) {
    var e = this.oGg();
    if (e) {
      UiModelUtil_1.UiModelUtil.SetVisible(e, t);
      e.CheckGetComponent(37).ShowAllDecoration(t);
    }
  }
  static ShowMotorLoadingIcon(t) {
    var e = this.oGg();
    if (e &&= e.CheckGetComponent(3)) {
      e.SetLoadingActive(t);
    }
  }
  static LoadEquippedMotor(t) {
    var e;
    if (ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultSkin()) {
      e = this.uNg();
      this.LoadMotorByParam(e, t);
    } else {
      e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedSkinId();
      this.LoadMotorBySkinId(e, t);
    }
  }
  static LoadEquippedMotorAndRole(t, e, i) {
    this.oGg().CheckGetComponent(32).SetRoleData(t, e, i);
    if (ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultSkin()) {
      t = this.uNg();
      this.LoadMotorByParam(t);
    } else {
      e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedSkinId();
      this.LoadMotorBySkinId(e);
    }
  }
  static LoadMotorBySkinId(t, e) {
    var t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorSkinConfig(t);
    if (t) {
      t = {
        FrameId: t.BindFrame,
        StickerIds: t.BindSticker,
        DecorationIds: t.BindDecorations
      };
      this.LoadMotorByParam(t, e);
    }
  }
  static LoadMotorByParam(i, a) {
    const r = this.oGg();
    if (r) {
      var o = r.CheckGetComponent(2);
      var s = r.CheckGetComponent(1);
      const _ = r.CheckGetComponent(32);
      const d = i.FrameId;
      const g = i.StickerIds ?? [];
      var n = i.DecorationIds ?? [];
      if (_.GetFrameId() === d) {
        this.aGg(g);
        this.NFg(n);
        a?.(r);
      } else {
        this.ShowMotor(false);
        var c;
        var M = [];
        var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(d);
        const h = i?.ModelBuff ?? [];
        const v = i?.ModelAnim ?? "";
        if (!StringUtils_1.StringUtils.IsBlank(v)) {
          M.push(v);
        }
        for (const U of g) {
          if (U > 0 && (c = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(U)) && !StringUtils_1.StringUtils.IsBlank(c.MaterialDA)) {
            M.push(c.MaterialDA);
          }
        }
        let e = 1;
        var l = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART;
        for (let t = 0; t < l.length; t++) {
          if (n[t]) {
            e++;
          }
        }
        s.SetTransformByTag("RoleCase");
        let t = 0;
        const f = () => {
          if (++t >= e) {
            this.Y5g(h);
            this.TGg(v);
            this.aGg(g);
            this.ShowMotor(true);
            a?.(r);
          }
        };
        o.LoadModelByModelId(i.ModelId, true, () => {
          _.SetFrameId(d);
          _.SetStickerIdList(g);
          f();
        }, M);
        this.NFg(n, f);
      }
    }
  }
  static SetEmptySticker(t) {
    var e;
    if (!(t <= 0)) {
      if ((e = this.oGg()) && (e = e.CheckGetComponent(36))) {
        e.RemoveStickerMaterial(t);
      }
    }
  }
  static AddMaterialByStickerId(t) {
    var e;
    if (!(t <= 0)) {
      if ((e = this.oGg()) && (e = e.CheckGetComponent(36))) {
        e.AddStickerMaterial(t);
      }
    }
  }
  static Y5g(t) {
    var e = this.oGg();
    if (e) {
      var i = e.CheckGetComponent(11);
      if (i) {
        i.RemoveAllBuffId();
        for (const a of t) {
          i.AddBuffByBuffId(a);
        }
      }
    }
  }
  static TGg(t) {
    var e;
    var i;
    if (!StringUtils_1.StringUtils.IsBlank(t)) {
      if ((e = this.oGg()) && (i = e.CheckGetComponent(2), e = e.CheckGetComponent(10)) && i) {
        i = i.GetLoadedResource(t);
        e.PlayAnimation(i, false);
      }
    }
  }
  static aGg(e) {
    var i = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART;
    for (let t = 0; t < i.length; t++) {
      var a = e[t];
      if (a) {
        this.AddMaterialByStickerId(a);
      } else {
        this.SetEmptySticker(i[t]);
      }
    }
  }
  static NFg(e, i) {
    var a = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART;
    for (let t = 0; t < a.length; t++) {
      var r = e[t];
      if (r) {
        this.AddDecoration(r, i);
      } else {
        this.SetEmptyDecoration(a[t]);
      }
    }
  }
  static SetEmptyDecoration(t) {
    var e = this.oGg();
    var i = e.CheckGetComponent(32);
    var e = e.CheckGetComponent(37);
    i.SetDecorationId(t, 0);
    e.RemoveDecorationHandle(t);
  }
  static AddDecoration(e, i) {
    var a = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(e);
    const r = a.PartId;
    var a = a.ModelId;
    var o = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationPartConfig(r);
    var s = this.oGg();
    var n = s.CheckGetComponent(1);
    const c = s.CheckGetComponent(32);
    if (c.IsSameDecorationId(r, e)) {
      i?.();
    } else {
      o = o.HangPoints[0];
      s = s.CheckGetComponent(37);
      let t = s.GetDecorationHandle(r, o);
      s = (t = t || s.AddDecorationHandle(r, o)).Model.CheckGetComponent(38);
      o = r - 1;
      s.SetAttachActorComponent(n);
      s.LoadModelByModelId(a, o, true, () => {
        c.SetDecorationId(r, e);
        i?.();
      });
    }
  }
  static RefreshRoleInMotor(t, e, i) {
    var a;
    var r = UiSceneManager_1.UiSceneManager.GetMotorSkeletalHandle();
    if ((r &&= r.Model) && (a = r.CheckGetComponent(34), r = r.CheckGetComponent(32), a) && r) {
      r.SetRoleData(t, e, i);
      a.Refresh();
    }
  }
}
exports.MotorcycleUiModelUtil = MotorcycleUiModelUtil;
//# sourceMappingURL=MotorcycleUiModelUtil.js.map