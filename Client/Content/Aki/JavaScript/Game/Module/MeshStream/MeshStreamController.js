"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshStreamController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const MeshStreamTask_1 = require("./MeshStreamTask");
class MeshStreamController extends ControllerBase_1.ControllerBase {
  static OnTick(e) {
    if (this.Gpd.size !== 0) {
      for (const s of this.Gpd) {
        var t = this.Fpd.get(s);
        if (t) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 执行网格体流送完成回调", ["TaskId", t.Id]);
          }
          t.Context?.OnTaskFinish?.();
        }
      }
      this.Gpd.clear();
    }
  }
  static AddMeshStreamTask(e) {
    var t = new MeshStreamTask_1.MeshStreamTask();
    t.Id = this.Npd++;
    this.Fpd.set(t.Id, t);
    t.Context = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 添加网格体流送任务", ["TaskId", t.Id]);
    }
    this.Vpd(t);
    return t.Id;
  }
  static Vpd(e) {
    e.MeshStreamFinishDelegate = () => {
      if (e.TaskState !== 4) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 网格体流送完成，等待下一帧执行回调", ["TaskId", e.Id]);
        }
        e.TaskState = 2;
        this.Gpd.add(e.Id);
      }
    };
    e.SteamingHandleId = UE.KuroMeshTextureFunctionLibrary.ForceMeshesBundleStreamingInAllMips(e.Context.SkeletalMeshes, e.Context.StaticMeshes, (0, puerts_1.toManualReleaseDelegate)(e.MeshStreamFinishDelegate));
    e.TaskState = 1;
  }
  static RemoveMeshStreamTask(e) {
    var t = this.Fpd.get(e);
    if (t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 移除网格体流送任务", ["TaskId", t.Id]);
      }
      this.Fpd.delete(e);
      this.Gpd.delete(e);
      this.jpd(t);
      t.TaskState = 4;
    }
  }
  static jpd(e) {
    if (e.SteamingHandleId !== 0 && (UE.KuroMeshTextureFunctionLibrary.StopMeshesBundleStreamingInAllMips(e.SteamingHandleId), e.MeshStreamFinishDelegate && (0, puerts_1.releaseManualReleaseDelegate)(e.MeshStreamFinishDelegate), e.SteamingHandleId = 0, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 释放网格体流送", ["TaskId", e.Id], ["SteamingHandleId", e.SteamingHandleId]);
    }
  }
  static OnClear() {
    if (this.Fpd.size > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 清理时有未完成的网格体流送任务", ["TaskCount", this.Fpd.size]);
      }
      this.Fpd.clear();
    }
    if (this.Gpd.size > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 清理时有未完成的网格体流送回调", ["TaskCount", this.Gpd.size]);
      }
      this.Gpd.clear();
    }
    return true;
  }
}
(exports.MeshStreamController = MeshStreamController).Npd = 1;
MeshStreamController.Gpd = new Set();
MeshStreamController.Fpd = new Map();
MeshStreamController.IsTickEvenPausedInternal = true; //# sourceMappingURL=MeshStreamController.js.map