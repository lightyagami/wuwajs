"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanoramicController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputLayerHelper_1 = require("../../NewWorld/Character/Common/Component/Input/InputLayerHelper/InputLayerHelper");
const PanoramicDefine_1 = require("./PanoramicDefine");
const PANORMIC_TAG = -826780033;
class PanoramicController extends ControllerBase_1.ControllerBase {
  static Init() {
    var e = super.Init();
    this.AVm = ModelManager_1.ModelManager.PanoramicModel;
    this.Onf = new InputLayerHelper_1.InputLayerHelper();
    this.Onf.Init(10);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPanoramicActive, this.dZm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPanoramicDisable, this.mZm);
    return e;
  }
  static Clear() {
    if (this.Onf) {
      this.Onf.Clear();
      this.Onf = undefined;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPanoramicActive, this.dZm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPanoramicDisable, this.mZm);
    return super.Clear();
  }
  static OnTick(e) {
    if (!this.AVm || this.AVm?.GetPointNum() <= 0) {
      this.AVm.SetCurrentPanoramic(undefined);
    } else if (this.IsInFight()) {
      var r;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Panoramic", 45, "[环视]进入战斗");
      }
      for ([, r] of this.AVm.GetPoint() ?? []) {
        this.heg(r);
      }
      this.AVm.SetCurrentPanoramic(undefined, true);
      this.AVm.ChangeAllPanoramicType(2);
      this.RemoveInputLayer();
    } else if (!ModelManager_1.ModelManager.PanoramicModel?.IsPanoramic) {
      this.DVm();
    }
  }
  static yWu() {
    this.Onf?.AddInputLayer();
  }
  static RemoveInputLayer() {
    this.Onf?.RemoveInputLayer();
  }
  static DVm() {
    var e = this.AVm.GetPoint();
    if (e && !(e.size <= 0)) {
      let a = PanoramicDefine_1.PANORAMIC_MAX_ANGLE;
      let t = undefined;
      let o = -1;
      e.forEach((e, r) => {
        this.heg(e);
        if (e.CheckCondition() && e.Angle < a) {
          a = e.Angle;
          t = e;
          o = t.GetId();
        }
      });
      this.AVm.SetCurrentPanoramic(t);
      if (t) {
        this.yWu();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Panoramic", 45, "[环视]CheckToGetNowPanoramic", ["currentPanoramic", o]);
      }
    }
  }
  static heg(e) {
    var r;
    var a = e.Entity.GetComponent(207);
    if (a && (r = a.GetInteractController(), a.ForceUpdate(), r) && r.CurrentInteractOption) {
      if (a.CanInteraction && a.IsPawnInteractive() && e.CheckInCircle()) {
        e.ChangeNeedTickCheck(true);
        e.ChangeSpotHidden(false);
      } else {
        e.ChangeSpotHidden(true);
        e.ChangeNeedTickCheck(false);
      }
    }
  }
  static InteractPawn() {
    var e;
    var r;
    var a;
    if (this.IsInFight()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Panoramic", 45, "[环视] InteractPawn 在战斗中");
      }
    } else if (this.CheckCanEnterCameraGuide()) {
      if ((e = this.AVm.GetCurrentPanoramic()) && e.Entity) {
        if (e.CheckCondition()) {
          if ((r = e.Entity.GetComponent(207)) && (a = r.GetInteractController()) && a.CurrentInteractOption && r.PanoramicInteract(a.CurrentInteractOption.InstanceId)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Panoramic", 45, "[环视] InteractPawn成功", ["currentPanoramic", e.GetId()]);
            }
            e.ChangeSpotHidden(true);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Panoramic", 45, "[环视] InteractPawn 检查未通过", ["currentPanoramic", e.GetId()]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Panoramic", 45, "[环视] InteractPawn 现在的Panoramic为空");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Panoramic", 74, "[环视] InteractPawn 当前无法进入CameraGuide");
    }
  }
  static IsInFight() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(215)?.HasTag(1996802261) ?? false;
  }
  static CheckCanEnterCameraGuide() {
    var e = ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent;
    return !!e && e.CameraGuideController.IsCameraGuideAvailable();
  }
  static wdf(e) {
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    var a = r?.Valid && r.Entity?.GetComponent(242)?.IsOnVehicle && r.Entity?.GetComponent(242)?.VehicleType === "Motorcycle";
    var r = a ? r.Entity?.GetComponent(242)?.VehicleEntity : undefined;
    if (ModelManager_1.ModelManager.PanoramicModel && a && r) {
      a = r.GetComponent(254);
      if (e) {
        if (!a?.HasTag(ModelManager_1.ModelManager.PanoramicModel.PlayMoveMotorTag)) {
          a?.AddTag(ModelManager_1.ModelManager.PanoramicModel.PlayMoveMotorTag);
        }
      } else if (a?.HasTag(ModelManager_1.ModelManager.PanoramicModel.PlayMoveMotorTag)) {
        a?.RemoveTag(ModelManager_1.ModelManager.PanoramicModel.PlayMoveMotorTag);
      }
    }
  }
  static EnterPanoramic(r, e) {
    if (ModelManager_1.ModelManager.PanoramicModel) {
      if (ModelManager_1.ModelManager.PanoramicModel.IsPanoramic = r) {
        ModelManager_1.ModelManager.PanoramicModel.PlayMoveMotorTag = e !== undefined ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e) : -731650997;
      }
      this.wdf(r);
    }
    e = this.AVm?.GetPoint();
    if (e) {
      e.forEach(e => {
        e.ChangeNeedTickCheck(!r);
        e.ChangeSpotHidden(r);
      });
    }
  }
}
(exports.PanoramicController = PanoramicController).AVm = undefined;
PanoramicController.Onf = undefined;
PanoramicController.dZm = () => {
  var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  if (ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(e) && !ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(e, PANORMIC_TAG)) {
    ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(e, PANORMIC_TAG);
  }
};
PanoramicController.mZm = () => {
  var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  if (ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(e) && ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(e, PANORMIC_TAG)) {
    ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(e, PANORMIC_TAG);
  }
}; //# sourceMappingURL=PanoramicController.js.map