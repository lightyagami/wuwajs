"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSaveController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EffectSaveByEffectId_1 = require("../../../Core/Define/ConfigQuery/EffectSaveByEffectId");
const EffectSaveByEffectPath_1 = require("../../../Core/Define/ConfigQuery/EffectSaveByEffectPath");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
class EffectSaveController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(16819, EffectSaveController.EffectAddNotify);
    Net_1.Net.Register(18541, EffectSaveController.EffectRemoveNotify);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOnlineWorld, EffectSaveController.RemoveEffectOnOnlineModeChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, EffectSaveController.RemoveEffectOnOnlineModeChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, EffectSaveController.OnLeaveInstanceDungeon);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(16819);
    Net_1.Net.UnRegister(18541);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOnlineWorld, EffectSaveController.RemoveEffectOnOnlineModeChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, EffectSaveController.RemoveEffectOnOnlineModeChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, EffectSaveController.OnLeaveInstanceDungeon);
    this.Xag("[EffectSaveController] Remove By Controller Clear");
    return true;
  }
  static MarkEffectSave(t, e, o) {
    var r;
    var a = EffectSaveByEffectPath_1.configEffectSaveByEffectPath.GetConfig(t);
    if (a) {
      (r = new Protocol_1.Aki.Protocol.NTm()).BKn = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
      r.l9_ = e;
      r.aC1 = a.EffectId;
      r.g8n = {
        X: o.Pitch,
        Y: o.Roll,
        Z: o.Yaw
      };
      Net_1.Net.Call(21812, r, e => {
        if (e?.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 93, "[EffectSaveController] 转发特效信息至服务器失败", ["effectPath", t], ["errorCode", e?.G9n]);
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 93, "[EffectSaveController] 特效路径在t.特效保留.xlsx中未配置", ["effectPath", t]);
    }
  }
  static Xag(e) {
    for (const t of ModelManager_1.ModelManager.EffectSaveModel.EffectSaveMap.values() ?? []) {
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        EffectSystem_1.EffectSystem.StopEffectById(t, e, true);
      }
    }
    ModelManager_1.ModelManager.EffectSaveModel.EffectSaveMap.clear();
  }
}
exports.EffectSaveController = EffectSaveController;
(_a = EffectSaveController).EffectAddNotify = e => {
  var t;
  var o = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
  for (const r of e.YVn) {
    if (r.l9_ && r.g8n && r.BKn === o) {
      if (t = EffectSaveByEffectId_1.configEffectSaveByEffectId.GetConfig(r.aC1)) {
        ModelManager_1.ModelManager.EffectSaveModel.TempPosition.X = r.l9_.X;
        ModelManager_1.ModelManager.EffectSaveModel.TempPosition.Y = r.l9_.Y;
        ModelManager_1.ModelManager.EffectSaveModel.TempPosition.Z = r.l9_.Z;
        ModelManager_1.ModelManager.EffectSaveModel.TempRotation.Pitch = r.g8n.X;
        ModelManager_1.ModelManager.EffectSaveModel.TempRotation.Roll = r.g8n.Y;
        ModelManager_1.ModelManager.EffectSaveModel.TempRotation.Yaw = r.g8n.Z;
        ModelManager_1.ModelManager.EffectSaveModel.TempTransform.SetLocation(ModelManager_1.ModelManager.EffectSaveModel.TempPosition);
        ModelManager_1.ModelManager.EffectSaveModel.TempTransform.SetRotation(ModelManager_1.ModelManager.EffectSaveModel.TempRotation.Quaternion());
        t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, ModelManager_1.ModelManager.EffectSaveModel.TempTransform, t.EffectPath, "[EffectSaveController] Add By Proto_DecalAddNotify");
        ModelManager_1.ModelManager.EffectSaveModel.EffectSaveMap.set(MathUtils_1.MathUtils.LongToBigInt(r.$Tm), t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 93, "[EffectSaveController] 特效Id在t.特效保留.xlsx中未配置", ["effectId", r.aC1]);
      }
    }
  }
};
EffectSaveController.EffectRemoveNotify = e => {
  for (const r of e.YVn) {
    var t = MathUtils_1.MathUtils.LongToBigInt(r.$Tm);
    var o = ModelManager_1.ModelManager.EffectSaveModel.EffectSaveMap.get(t);
    if (o) {
      if (EffectSystem_1.EffectSystem.IsValid(o)) {
        EffectSystem_1.EffectSystem.StopEffectById(o, "[EffectSaveController] Remove By Proto_DecalRemoveNotify", true);
      }
      ModelManager_1.ModelManager.EffectSaveModel.EffectSaveMap.delete(t);
    }
  }
};
EffectSaveController.RemoveEffectOnOnlineModeChange = () => {
  _a.Xag("[EffectSaveController] Remove By Online Mode Change");
};
EffectSaveController.OnLeaveInstanceDungeon = () => {
  _a.Xag("[EffectSaveController] Remove By Leave Instance Dungeon");
}; //# sourceMappingURL=EffectSaveController.js.map