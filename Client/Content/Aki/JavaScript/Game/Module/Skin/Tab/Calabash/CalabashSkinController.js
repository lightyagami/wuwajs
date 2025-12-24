"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinController = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const CalabashSkinDefine_1 = require("./CalabashSkinDefine");
class CalabashSkinController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19839, e => {
      ModelManager_1.ModelManager.CalabashSkinModel.NotifyAddUnlockSkinData(e.bBs);
      ControllerHolder_1.ControllerHolder.InventoryController.AddCalabashSkinItemData(e.bBs);
    });
    Net_1.Net.Register(18310, e => {
      ModelManager_1.ModelManager.CalabashSkinModel.NotifyCurrentEquippedSkinId(e.Z7n);
    });
    Net_1.Net.Register(28765, e => {
      var r = MathUtils_1.MathUtils.LongToNumber(e.F4n);
      var t = e.dUd?.cUd ?? 0;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CalabashSkin", 10, "服务器下发葫芦皮肤", ["CalabashSkinId", e.dUd?.cUd], ["ServerEntityId", r]);
      }
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
      var r = e?.Entity.GetComponent(0);
      if (r?.Valid) {
        r.HuluSkinId = t;
      }
      var r = e?.Entity.GetComponent(84);
      if (r?.Valid) {
        r.OnEntityHuluSkinChangeNotify(t);
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19839);
    Net_1.Net.UnRegister(18310);
    Net_1.Net.UnRegister(28765);
  }
  static RBd() {
    var e = Protocol_1.Aki.Protocol.aUd.create();
    Net_1.Net.Call(16689, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15017);
        } else {
          ModelManager_1.ModelManager.CalabashSkinModel.NotifyCalabashSkinData(e.mUd, e.fUd);
          ControllerHolder_1.ControllerHolder.InventoryController.InitCalabashSkinItemData(e.fUd);
        }
      }
    });
  }
  static async RequestCalabashSkinTakeOn(e) {
    const r = new CustomPromise_1.CustomPromise();
    var t = Protocol_1.Aki.Protocol.nUd.create();
    t.Z7n = e;
    Net_1.Net.Call(17363, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17292);
          r.SetResult(false);
        } else {
          ModelManager_1.ModelManager.CalabashSkinModel.NotifyCurrentEquippedSkinId(e.Z7n);
          r.SetResult(true);
        }
      } else {
        r.SetResult(false);
      }
    });
    return r.Promise;
  }
  static SelectedCalabashSkinChange(e, r, o, t = CalabashSkinDefine_1.DEFAULT_CALABASH_SKIN_CASE) {
    if (o) {
      const a = o.CheckGetComponent(31);
      a.SetSkinId(r, e);
      r = a.ModelId;
      const n = o.CheckGetComponent(1);
      n?.SetTransformByTag(t);
      const i = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashTransformById(a.TransformId);
      o.CheckGetComponent(2)?.LoadModelByModelId(r, true, () => {
        UiModelUtil_1.UiModelUtil.SetVisible(o, true);
        var e = Vector_1.Vector.Create(i.Location.X, i.Location.Y, i.Location.Z);
        var r = Rotator_1.Rotator.Create(i.Rotation.Y, i.Rotation.Z, i.Rotation.X);
        var t = Vector_1.Vector.Create(i.Size.X, i.Size.Y, i.Size.Z);
        var e = Transform_1.Transform.Create(r.Quaternion(), e, t);
        n?.MainMeshComponent?.D_K2_SetRelativeTransform(e.ToUeTransform(), false, undefined, false);
        UiModelUtil_1.UiModelUtil.SetRenderingMaterial(o, CalabashSkinDefine_1.CALABASH_SWITCH_MATERIAL_ID);
        UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponentByPath(o, a.EffectPath);
        var t = o.CheckGetComponent(9);
        t.SetRotateParam(i.RotateTime, 2, false);
        t.StartRotate();
        r.Set(i.AxisRotate.X, i.AxisRotate.Y, i.AxisRotate.Z);
        n?.Actor?.K2_SetActorRotation(r.ToUeRotator(), false);
      });
    }
  }
}
(exports.CalabashSkinController = CalabashSkinController).Q5e = () => {
  CalabashSkinController.RBd();
};
//# sourceMappingURL=CalabashSkinController.js.map