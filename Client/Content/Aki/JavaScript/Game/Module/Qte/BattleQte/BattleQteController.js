"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleQteController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class BattleQteController extends ControllerBase_1.ControllerBase {
  static StartBattleQte(e, o, t, r) {
    let l = undefined;
    var a;
    var n;
    var _;
    if (ControllerHolder_1.ControllerHolder.CommonQteController.IsInQte()) {
      l = "当前存在执行中的Qte, 无法开始新的Qte";
    } else if (ControllerHolder_1.ControllerHolder.CommonQteController.IsPreloading()) {
      l = "Qte预加载中, 无法开始新的Qte";
    } else if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      l = "联机状态下不能触发战斗Qte";
    } else if (Time_1.Time.FlowTimeDilation === 0) {
      l = "副本时停中, 不能触发战斗Qte";
    } else {
      _ = (n = (a = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentTeamItem)?.EntityHandle)?.Entity;
      if (n && n.Valid && _) {
        if (a?.IsDead()) {
          l = "当前角色已死亡, 不能触发战斗Qte";
        } else if (_.GetComponent(122)?.HasPauseLock()) {
          l = "当前角色大招时停中, 不能触发战斗Qte";
        }
      } else {
        l = "当前角色实体无效, 不能触发战斗Qte";
      }
    }
    if (l) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, l, ["BattleQteId", e], ["Source", r]);
      }
    } else {
      const d = ModelManager_1.ModelManager.BattleQteModel?.CreateBattleQteContext(e, o, t, r);
      if (d) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "战斗Qte开始", ["BattleQteHandleId", d.BattleQteHandleId], ["BattleQteId", e], ["Source", r]);
        }
        if (ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(d.CommonQteId, () => {
          d.QteSuccess();
        }, () => {
          d.QteFail();
        })) {
          ModelManager_1.ModelManager.BattleQteModel?.SetCurrentBattleQte(d);
          return d;
        } else {
          return undefined;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "战斗Qte开始失败, 获取context为空", ["BattleQteId", e]);
      }
    }
  }
}
exports.BattleQteController = BattleQteController;
//# sourceMappingURL=BattleQteController.js.map