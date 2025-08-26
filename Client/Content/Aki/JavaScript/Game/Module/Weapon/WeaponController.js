"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
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
const LoadAsyncPromise_1 = require("../UiComponent/LoadAsyncPromise");
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
    Net_1.Net.Register(24262, e => {
      if (e) {
        ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Gxs);
      }
    });
    Net_1.Net.Register(28470, e => {
      var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o).Entity.GetComponent(81);
      if (o) {
        o.OnEquipWeaponForRoleNotify(e);
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24262);
    Net_1.Net.UnRegister(28470);
  }
  static SendPbWeaponLevelUpRequest(e, o) {
    var t = Protocol_1.Aki.Protocol.R0s.create();
    t.w5n = e;
    for (const a of o) {
      var r = Protocol_1.Aki.Protocol.X8s.create();
      r.m9n = a.SelectedCount;
      r.w5n = a.IncId;
      r.L8n = a.ItemId;
      t.tHn.push(r);
    }
    Net_1.Net.Call(27178, t, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WeaponModel.WeaponLevelUpResponse(e);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19133);
        }
      }
    });
  }
  static SendPbWeaponBreachRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.A0s.create();
    e.w5n = t;
    Net_1.Net.Call(15218, e, e => {
      var o;
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          o = e.ujn;
          ModelManager_1.ModelManager.WeaponModel.SetWeaponBreachData(t, o);
          r(o);
          UiManager_1.UiManager.OpenView("WeaponBreachSuccessView", t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponBreakUp);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23496);
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
      Net_1.Net.Call(19725, t, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.WeaponModel.SetWeaponResonanceData(e.w5n, e.hOs);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponResonanceSuccess, o, r);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28601);
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
      Net_1.Net.Call(26154, r, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Gxs);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28908);
          }
        }
      });
    }
  }
  static Qil(o, t, r, a, n, i, l, s = false, _) {
    if (i) {
      const d = new CustomPromise_1.CustomPromise();
      const C = new CustomPromise_1.CustomPromise();
      var c = i.CheckGetComponent(22);
      var _ = _ || c.WeaponConfigId;
      let e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(21, _.toString());
      if (e === undefined) {
        e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponModelTransformData(r);
      }
      const M = i.CheckGetComponent(1);
      M?.SetTransformByTag(a);
      c = i.CheckGetComponent(2);
      c?.LoadModelByModelId(o, s, () => {
        this.Efd(i, e, M);
        d.SetResult();
      });
      this.Ifd(d, C, i, e);
      if (l) {
        if (e.ShowScabbard) {
          if (t.length > 1) {
            l.CheckGetComponent(2).LoadModelByModelId(t[1], false, () => {
              this.Tfd(l, e, M, n);
              C?.SetResult();
            });
            return;
          }
        } else {
          UiModelUtil_1.UiModelUtil.SetVisible(l, false);
        }
      }
      C?.SetResult();
    }
  }
  static async Ifd(e, o, t, r) {
    await Promise.all([e?.Promise, o?.Promise]);
    e = t.CheckGetComponent(9);
    e.SetRotateParam(r.RotateTime);
    e.StartRotate();
  }
  static SelectedWeaponSkinChange(e, o, t, r, a = false) {
    if (o === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID) {
      e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e).GetWeaponConfig();
      WeaponController.Qil(e.ModelId, e.Models, e.TransformId, "WeaponSkinCase", "WeaponSkinCase", t.Model, r.Model, a);
    } else {
      e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(o);
      WeaponController.Qil(e.ModelId, e.Models, e.TransformId, "WeaponSkinCase", "WeaponSkinCase", t.Model, r.Model, a, o);
    }
  }
  static OnSelectedWeaponChange(e, o, t, r = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, a = false) {
    var n;
    if (o.Model) {
      (n = o.Model).CheckGetComponent(22)?.SetWeaponData(e);
      n.CheckGetComponent(0)?.SetLoadingIconFollowState(a);
    }
    if (t.Model) {
      t.Model.CheckGetComponent(22).SetWeaponData(e);
    }
    WeaponController.Qil(e.GetModelId(r), e.GetModels(r), e.GetTransformId(r), "WeaponCase", "WeaponScabbardCase", o.Model, t.Model, a);
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
  static async LoadCharacterRenderingFunctionLibraryAsync() {
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_CharacterRenderingFunctionLibrary_C", () => {
      e.SetResult();
    });
    await e.Promise;
  }
  static async LoadWeaponLevelMaterialDataAsync(e) {
    return await new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.PD_WeaponLevelMaterialDatas_C).Promise;
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
};
WeaponController.Efd = (e, o, t) => {
  UiModelUtil_1.UiModelUtil.SetVisible(e, true);
  var r = Vector_1.Vector.Create(o.Location.X, o.Location.Y, o.Location.Z);
  var a = Rotator_1.Rotator.Create(o.Rotation.Y, o.Rotation.Z, o.Rotation.X);
  var n = Vector_1.Vector.Create(o.Size, o.Size, o.Size);
  var r = Transform_1.Transform.Create(a.Quaternion(), r, n);
  t?.MainMeshComponent?.D_K2_SetRelativeTransform(r.ToUeTransform(), false, undefined, false);
  UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, "WeaponRootWeaponMaterialController");
  UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "WeaponRootWeaponShowHideEffect");
  a.Set(o.AxisRotate.Y, o.AxisRotate.Z, o.AxisRotate.X);
  t?.Actor?.K2_SetActorRotation(a.ToUeRotator(), false);
};
WeaponController.Tfd = (e, o, t, r) => {
  UiModelUtil_1.UiModelUtil.SetVisible(e, true);
  var a = e.CheckGetComponent(1);
  a.Actor.K2_AttachToActor(t.Actor, undefined, 2, 1, 1, false);
  a.SetTransformByTag(r);
  a.Actor?.D_K2_SetActorRelativeLocation(Vector_1.Vector.ZeroVectorDouble, false, undefined, false);
  var t = Vector_1.Vector.Create(o.ScabbardOffset.X, o.ScabbardOffset.Y, o.ScabbardOffset.Z);
  var r = Rotator_1.Rotator.Create(o.Rotation.Y, o.Rotation.Z, o.Rotation.X);
  var o = Vector_1.Vector.Create(o.Size, o.Size, o.Size);
  var r = Transform_1.Transform.Create(r.Quaternion(), t, o);
  a.MainMeshComponent?.D_K2_SetRelativeTransform(r.ToUeTransform(), false, undefined, false);
  UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, "WeaponRootWeaponMaterialController");
}; //# sourceMappingURL=WeaponController.js.map