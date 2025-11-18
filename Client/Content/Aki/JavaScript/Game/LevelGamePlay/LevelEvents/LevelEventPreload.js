"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPreload = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PhantomFormationById_1 = require("../../../Core/Define/ConfigQuery/PhantomFormationById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const WAITE_ENTITY_PRELOAD_TIME = 60000;
class LevelEventPreload extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, o) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, o) {
    var r;
    if (e.PreloadObjectType.Type === "PreloadFlows") {
      r = e.PreloadObjectType.FlowData;
      ControllerHolder_1.ControllerHolder.PreloadControllerNew.PreloadPlot(r.FlowListName, r.FlowId, r.StateId);
      this.FinishExecute(true);
    } else if (e.PreloadObjectType.Type === "PreloadMp4s") {
      if (!(r = e.PreloadObjectType.Mp4s) || r.length < 1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 45, "[VideoBp] Mp4数组异常");
        }
      } else {
        ControllerHolder_1.ControllerHolder.VideoBpController.PreloadMp4s(r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, "LevelEventPreload", o, {
          Name: "Preload",
          Params: {
            Mp4Names: r
          }
        }, true);
      }
      this.FinishExecute(true);
    } else {
      if (e.PreloadObjectType.Type === "PreloadPhantomCharacterForSkill" || e.PreloadObjectType.Type === "PreloadTrialCharacterForSkill") {
        this.ZE1(e);
      }
      if (e.PreloadObjectType.Type === "PreloadLinkResource") {
        this.yLd(e);
      }
    }
  }
  ZE1(e) {
    var e = e.PreloadObjectType;
    var o = e.Type;
    var r = [];
    if (o === "PreloadTrialCharacterForSkill") {
      for (const l of e.CharacterGroupNew) {
        r.push(l.CharacterId);
      }
    } else if (o === "PreloadPhantomCharacterForSkill") {
      o = e.Id;
      e = PhantomFormationById_1.configPhantomFormationById.GetConfig(o);
      if (e) {
        for (const n of e.Roles) {
          r.push(n);
        }
      }
    }
    var t = [];
    for (const i of r) {
      var a = ModelManager_1.ModelManager.SceneTeamModel.GetPreloadEntityData(i);
      if (a) {
        t.push(a[0]);
      }
    }
    if (t.length <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[PreloadRole] 无预加载实体", ["RoleIdList", r]);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[PreloadRole] 开始等待实体加载", ["CreatureDataIdList", t]);
      }
      WaitEntityTask_1.WaitEntityTask.Create("LevelEventPreloadRole.ExecuteNew", t, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 48, "[PreloadRole] 实体加载结束", ["Result", e]);
        }
        this.FinishExecute(true);
      }, WAITE_ENTITY_PRELOAD_TIME);
    }
  }
  yLd(e) {
    const o = e.PreloadObjectType;
    ControllerHolder_1.ControllerHolder.BattleLinkController.PreloadRes(o.LinkResourceId).then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 67, "[PreloadLinkRes]资源预加载完成", ["LinkResourceId", o.LinkResourceId]);
      }
    }).catch(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 67, "[PreloadLinkRes]资源预加载失败", ["LinkResourceId", o.LinkResourceId]);
      }
    }).finally(() => {
      this.FinishExecute(true);
    });
  }
}
exports.LevelEventPreload = LevelEventPreload;
//# sourceMappingURL=LevelEventPreload.js.map