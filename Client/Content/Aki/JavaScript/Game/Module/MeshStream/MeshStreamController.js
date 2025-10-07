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
    if (this.p0d.size !== 0) {
      for (const s of this.p0d) {
        var t = this.v0d.get(s);
        if (t) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 执行网格体流送完成回调", ["TaskId", t.Id]);
          }
          t.Context?.OnTaskFinish?.();
        }
      }
      this.p0d.clear();
    }
  }
  static AddMeshStreamTask(e) {
    var t = new MeshStreamTask_1.MeshStreamTask();
    t.Id = this.y0d++;
    this.v0d.set(t.Id, t);
    t.Context = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 添加网格体流送任务", ["TaskId", t.Id]);
    }
    this.S0d(t);
    return t.Id;
  }
  static S0d(e) {
    e.MeshStreamFinishDelegate = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 网格体流送完成，等待下一帧执行回调", ["TaskId", e.Id]);
      }
      e.TaskState = 2;
      this.p0d.add(e.Id);
    };
    e.SteamingHandleId = UE.KuroMeshTextureFunctionLibrary.ForceMeshesBundleStreamingInAllMips(e.Context.SkeletalMeshes, e.Context.StaticMeshes, (0, puerts_1.toManualReleaseDelegate)(e.MeshStreamFinishDelegate));
    e.TaskState = 1;
  }
  static RemoveMeshStreamTask(e) {
    var t = this.v0d.get(e);
    if (t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 移除网格体流送任务", ["TaskId", t.Id]);
      }
      this.v0d.delete(e);
      this.p0d.delete(e);
      this.M0d(t);
      t.TaskState = 4;
    }
  }
  static M0d(e) {
    if (e.SteamingHandleId !== 0 && (UE.KuroMeshTextureFunctionLibrary.StopMeshesBundleStreamingInAllMips(e.SteamingHandleId), e.MeshStreamFinishDelegate && (0, puerts_1.releaseManualReleaseDelegate)(e.MeshStreamFinishDelegate), e.SteamingHandleId = 0, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("MeshStream", 43, "[MeshStream] 释放网格体流送", ["TaskId", e.Id], ["SteamingHandleId", e.SteamingHandleId]);
    }
  }
  static OnClear() {
    if (this.v0d.size > 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MeshStream", 43, "[MeshStream] 清理时有未完成的网格体流送任务", ["TaskCount", this.v0d.size]);
      }
      this.v0d.clear();
    }
    if (this.p0d.size > 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MeshStream", 43, "[MeshStream] 清理时有未完成的网格体流送回调", ["TaskCount", this.p0d.size]);
      }
      this.p0d.clear();
    }
    return true;
  }
}
(exports.MeshStreamController = MeshStreamController).y0d = 1;
MeshStreamController.p0d = new Set();
MeshStreamController.v0d = new Map();
MeshStreamController.IsTickEvenPausedInternal = true; //# sourceMappingURL=MeshStreamController.js.map