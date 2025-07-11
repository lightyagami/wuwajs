"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponController = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const RoleController_1 = require("../RoleUi/RoleController");
const WeaponSkinDefine_1 = require("../Skin/Tab/Weapon/WeaponSkinDefine");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
class WeaponController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddWeaponItem, this.QCi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnResponseWeaponItem, this.vko);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveWeaponItem, this.Gdi);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddWeaponItem, this.QCi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnResponseWeaponItem, this.vko);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveWeaponItem, this.Gdi);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23375, e => {
      if (e) {
        ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Gxs);
      }
    });
    Net_1.Net.Register(24677, e => {
      var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o).Entity.GetComponent(81);
      if (o) {
        o.OnEquipWeaponForRoleNotify(e);
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23375);
    Net_1.Net.UnRegister(24677);
  }
  static SendPbWeaponLevelUpRequest(e, o) {
    var t = Protocol_1.Aki.Protocol.R0s.create();
    t.w5n = e;
    for (const n of o) {
      var r = Protocol_1.Aki.Protocol.X8s.create();
      r.m9n = n.SelectedCount;
      r.w5n = n.IncId;
      r.L8n = n.ItemId;
      t.tHn.push(r);
    }
    Net_1.Net.Call(21076, t, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WeaponModel.WeaponLevelUpResponse(e);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17111);
        }
      }
    });
  }
  static SendPbWeaponBreachRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.A0s.create();
    e.w5n = t;
    Net_1.Net.Call(25268, e, e => {
      var o;
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          o = e.ujn;
          ModelManager_1.ModelManager.WeaponModel.SetWeaponBreachData(t, o);
          r(o);
          UiManager_1.UiManager.OpenView("WeaponBreachSuccessView", t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponBreakUp);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19936);
        }
      }
    });
  }
  static SendPbResonUpRequest(o, e) {
    if (!RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()) {
      var t = Protocol_1.Aki.Protocol.U0s.create();
      t.w5n = o;
      t.cjn = e;
      const r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(o).GetResonanceLevel();
      Net_1.Net.Call(18927, t, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.WeaponModel.SetWeaponResonanceData(e.w5n, e.hOs);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponResonanceSuccess, o, r);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19042);
          }
        }
      });
    }
  }
  static SendPbEquipTakeOnRequest(e, o, t) {
    var r;
    if (!RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() && !!e && !(e <= 0)) {
      (r = Protocol_1.Aki.Protocol.css.create()).R5n = Protocol_1.Aki.Protocol.v5s.create();
      r.R5n.mjn = e;
      r.R5n.l8n = o;
      r.R5n.djn = t;
      Net_1.Net.Call(28941, r, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Gxs);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18807);
          }
        }
      });
    }
  }
  static Qil(e, o, t, n, a, i, l, _ = false, s) {
    if (i) {
      var d = i.CheckGetComponent(22);
      var s = s || d.WeaponConfigId;
      let r = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(21, s.toString());
      if (r === undefined) {
        r = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponModelTransformData(t);
      }
      const M = i.CheckGetComponent(1);
      M?.SetTransformByTag(n);
      i.CheckGetComponent(2)?.LoadModelByModelId(e, _, () => {
        UiModelUtil_1.UiModelUtil.SetVisible(i, true);
        var e = Vector_1.Vector.Create(r.Location.X, r.Location.Y, r.Location.Z);
        var o = Rotator_1.Rotator.Create(r.Rotation.Y, r.Rotation.Z, r.Rotation.X);
        var t = Vector_1.Vector.Create(r.Size, r.Size, r.Size);
        var e = Transform_1.Transform.Create(o.Quaternion(), e, t);
        M?.MainMeshComponent?.D_K2_SetRelativeTransform(e.ToUeTransform(), false, undefined, false);
        UiModelUtil_1.UiModelUtil.SetRenderingMaterial(i, "WeaponRootWeaponMaterialController");
        UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(i, "WeaponRootWeaponShowHideEffect");
        var t = i.CheckGetComponent(9);
        t.SetRotateParam(r.RotateTime);
        t.StartRotate();
        o.Set(r.AxisRotate.Y, r.AxisRotate.Z, r.AxisRotate.X);
        M?.Actor?.K2_SetActorRotation(o.ToUeRotator(), false);
      });
      if (l) {
        if (r.ShowScabbard) {
          if (o.length > 1) {
            const c = l.CheckGetComponent(1);
            l.CheckGetComponent(2).LoadModelByModelId(o[1], false, () => {
              UiModelUtil_1.UiModelUtil.SetVisible(l, true);
              c.Actor.K2_AttachToActor(M.Actor, undefined, 2, 1, 1, false);
              c.SetTransformByTag(a);
              c.Actor?.D_K2_SetActorRelativeLocation(Vector_1.Vector.ZeroVectorDouble, false, undefined, false);
              var e = Vector_1.Vector.Create(r.ScabbardOffset.X, r.ScabbardOffset.Y, r.ScabbardOffset.Z);
              var o = Rotator_1.Rotator.Create(r.Rotation.Y, r.Rotation.Z, r.Rotation.X);
              var t = Vector_1.Vector.Create(r.Size, r.Size, r.Size);
              var o = Transform_1.Transform.Create(o.Quaternion(), e, t);
              c.MainMeshComponent?.D_K2_SetRelativeTransform(o.ToUeTransform(), false, undefined, false);
              UiModelUtil_1.UiModelUtil.SetRenderingMaterial(l, "WeaponRootWeaponMaterialController");
            });
          }
        } else {
          UiModelUtil_1.UiModelUtil.SetVisible(l, false);
        }
      }
    }
  }
  static SelectedWeaponSkinChange(e, o, t, r, n = false) {
    if (o === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID) {
      e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e).GetWeaponConfig();
      WeaponController.Qil(e.ModelId, e.Models, e.TransformId, "WeaponSkinCase", "WeaponSkinCase", t.Model, r.Model, n);
    } else {
      e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(o);
      WeaponController.Qil(e.ModelId, e.Models, e.TransformId, "WeaponSkinCase", "WeaponSkinCase", t.Model, r.Model, n, o);
    }
  }
  static OnSelectedWeaponChange(e, o, t, r = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, n = false) {
    var a;
    if (o.Model) {
      (a = o.Model).CheckGetComponent(22)?.SetWeaponData(e);
      a.CheckGetComponent(0)?.SetLoadingIconFollowState(n);
    }
    if (t.Model) {
      t.Model.CheckGetComponent(22).SetWeaponData(e);
    }
    WeaponController.Qil(e.GetModelId(r), e.GetModels(r), e.GetTransformId(r), "WeaponCase", "WeaponScabbardCase", o.Model, t.Model, n);
  }
  static PlayWeaponRenderingMaterial(e, o, t) {
    UiModelUtil_1.UiModelUtil.SetRenderingMaterial(o.Model, e);
    if (t) {
      UiModelUtil_1.UiModelUtil.SetRenderingMaterial(t.Model, e);
    }
  }
  static ApplyWeaponLevelMaterial(e, o, t = 0) {
    UE.BP_CharacterRenderingFunctionLibrary_C.ApplyWeaponLevelMaterial(e, o, t, e);
  }
  static RoleFadeIn(e, o = "RoleFadeInCurve") {
    const t = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var o;
      if (e) {
        o = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeInDuration");
        t?.Fade(1, 0, o, e);
      }
    });
  }
  static RoleFadeOut(e, o = "RoleFadeOutCurve") {
    const t = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var o;
      if (e) {
        o = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeOutDuration");
        t?.Fade(0, 1, o, e);
      }
    });
  }
}
(exports.WeaponController = WeaponController).QCi = e => {
  ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
};
WeaponController.vko = e => {
  ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
};
WeaponController.Gdi = e => {
  for (const o of e) {
    ModelManager_1.ModelManager.WeaponModel.RemoveWeaponData(o);
  }
}; //# sourceMappingURL=WeaponController.js.map