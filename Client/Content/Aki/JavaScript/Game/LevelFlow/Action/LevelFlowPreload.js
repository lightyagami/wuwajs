"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowPreload = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PhantomFormationById_1 = require("../../../Core/Define/ConfigQuery/PhantomFormationById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
const WAITE_ENTITY_PRELOAD_TIME = 60000;
class LevelFlowPreload extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.oGf = undefined;
  }
  Init(e) {
    this.oGf = e;
    return this;
  }
  OnExecute() {
    var e;
    var o = this.oGf;
    if (o.PreloadObjectType.Type === "PreloadFlows") {
      e = o.PreloadObjectType.FlowData;
      ControllerHolder_1.ControllerHolder.PreloadControllerNew.PreloadPlot(e.FlowListName, e.FlowId, e.StateId);
      this.FinishExecute(true);
    } else if (o.PreloadObjectType.Type === "PreloadMp4s") {
      if (!(e = o.PreloadObjectType.Mp4s) || e.length < 1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelFlow", 45, "[VideoBp] Mp4数组异常");
        }
      } else {
        ControllerHolder_1.ControllerHolder.VideoBpController.PreloadMp4s(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, "LevelEventPreload", undefined, {
          Name: "Preload",
          Params: {
            Mp4Names: e
          }
        }, true);
      }
      this.FinishExecute(true);
    } else {
      if (o.PreloadObjectType.Type === "PreloadPhantomCharacterForSkill" || o.PreloadObjectType.Type === "PreloadTrialCharacterForSkill") {
        this.ZE1(o);
      }
      if (o.PreloadObjectType.Type === "PreloadLinkResource") {
        this.yLd(o);
      }
    }
  }
  ZE1(e) {
    var e = e.PreloadObjectType;
    var o = e.Type;
    var r = [];
    if (o === "PreloadTrialCharacterForSkill") {
      for (const a of e.CharacterGroupNew) {
        r.push(a.CharacterId);
      }
    } else if (o === "PreloadPhantomCharacterForSkill") {
      o = e.Id;
      e = PhantomFormationById_1.configPhantomFormationById.GetConfig(o);
      if (e) {
        for (const i of e.Roles) {
          r.push(i);
        }
      }
    }
    var l = [];
    for (const n of r) {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetPreloadEntityData(n);
      if (t) {
        l.push(t[0]);
      }
    }
    if (l.length <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelFlow", 48, "[PreloadRole] 无预加载实体", ["RoleIdList", r]);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelFlow", 48, "[PreloadRole] 开始等待实体加载", ["CreatureDataIdList", l]);
      }
      WaitEntityTask_1.WaitEntityTask.Create("LevelEventPreloadRole.ExecuteNew", l, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelFlow", 48, "[PreloadRole] 实体加载结束", ["Result", e]);
        }
        this.FinishExecute(true);
      }, WAITE_ENTITY_PRELOAD_TIME);
    }
  }
  yLd(e) {
    const o = e.PreloadObjectType;
    ControllerHolder_1.ControllerHolder.BattleLinkController.PreloadRes(o.LinkResourceId).then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelFlow", 67, "[PreloadLinkRes]资源预加载完成", ["LinkResourceId", o.LinkResourceId]);
      }
    }).catch(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelFlow", 67, "[PreloadLinkRes]资源预加载失败", ["LinkResourceId", o.LinkResourceId]);
      }
    }).finally(() => {
      this.FinishExecute(true);
    });
  }
}
exports.LevelFlowPreload = LevelFlowPreload;
//# sourceMappingURL=LevelFlowPreload.js.map