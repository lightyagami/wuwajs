"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleUiModelUtil = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
class MotorcycleUiModelUtil {
  static CreateMotor() {
    UiSceneManager_1.UiSceneManager.InitMotorSkeletalHandle();
  }
  static DestroyMotor() {
    UiSceneManager_1.UiSceneManager.DestroyMotorSkeletalHandle();
  }
  static ShowMotor(e) {
    var a = UiSceneManager_1.UiSceneManager.GetMotorSkeletalHandle();
    if (a &&= a.Model) {
      UiModelUtil_1.UiModelUtil.SetVisible(a, e);
    }
  }
  static LoadEquippedMotor() {
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel.CurSkinId;
    var a = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList();
    this.LoadMotorByParam(e, a);
  }
  static ResetEquippedMotor() {
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList();
    this.ChangeMotorByParam(e);
  }
  static LoadMotorByParam(e, a) {
    var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorSkinConfig(e);
    if (e) {
      e = e.ModelId;
      this.LoadMotorModelBySkinId(e, () => {
        this.ChangeMotorByParam(a);
      });
    }
  }
  static LoadMotorModelBySkinId(e, a) {
    var i;
    var r = UiSceneManager_1.UiSceneManager.GetMotorSkeletalHandle();
    if ((r &&= r.Model) && (i = r.CheckGetComponent(33), r = r.CheckGetComponent(1), i) && r) {
      r.SetTransformByTag("RoleCase");
      i.LoadModelBySkinId(e, true, a);
    }
  }
  static ChangeMotorByParam(a) {
    var i = [];
    var r = [1, 2, 3];
    for (let e = 0; e < a.length; e++) {
      var t = a[e];
      if (t === 0) {
        this.SetEmptySticker(r[e]);
      } else {
        i.push(this.ChangeMaterialByStickerId(t));
      }
    }
    Promise.all(i);
  }
  static SetEmptySticker(e) {
    if (!(e <= 0)) {
      var a = UiSceneManager_1.UiSceneManager.GetMotorSkeletalHandle();
      if (a) {
        a = a.Model;
        if (a) {
          var i = a.CheckGetComponent(5);
          if (i) {
            a = this.iAf.get(e);
            if (a) {
              for (const r of a) {
                i.RemoveRenderingMaterial(r);
              }
              this.iAf.set(e, []);
            }
          }
        }
      }
    }
  }
  static async ChangeMaterialByStickerId(e) {
    if (!(e <= 0)) {
      var a = UiSceneManager_1.UiSceneManager.GetMotorSkeletalHandle();
      if (a) {
        a = a.Model;
        if (a) {
          const i = a.CheckGetComponent(5);
          if (a.CheckGetComponent(2) && i) {
            const r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
            if (r) {
              await new LoadAsyncPromise_1.LoadAsyncPromise(r.MaterialDA, UE.PD_CharacterControllerData_C, 102).Promise.then(a => {
                if (a) {
                  a = i?.AddRenderingMaterialByData(a);
                  let e = this.iAf.get(r.PartId);
                  if (!(e = e || []).includes(a)) {
                    e.push(a);
                  }
                  this.iAf.set(r.PartId, e);
                }
              });
            }
          }
        }
      }
    }
  }
}
(exports.MotorcycleUiModelUtil = MotorcycleUiModelUtil).iAf = new Map();
//# sourceMappingURL=MotorcycleUiModelUtil.js.map