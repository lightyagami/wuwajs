"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParkourBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ParkourController_1 = require("../../../../LevelGamePlay/Parkour/ParkourController");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeNodeExtraInfo_1 = require("../../GeneralLogicTreeNodeExtraInfo");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ParkourBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.s$t = 0;
    this.a$t = [];
    this.h$t = (e, r) => {
      if (e) {
        let e = undefined;
        if (r) {
          e = new GeneralLogicTreeNodeExtraInfo_1.ParkourExtraInfo();
          const t = {};
          r.forEach((e, r) => {
            t[r] = e;
          });
          e.TotalScore = t;
        }
        this.SubmitNode(e);
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition, this.TrackTextRuleInner = 2, e.Type === IQuest_1.EChildQuest.Parkour) && (this.s$t = e.SplineEntityId, this.a$t = e.MatchRoleOption, true);
  }
  OnStart(e) {
    super.OnStart(e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ParkourFinished, this.h$t);
    if (this.s$t) {
      ParkourController_1.ParkourController.StartParkour(this.s$t, this.Context, this.a$t);
    }
  }
  OnEnd(e) {
    super.OnEnd(e);
    if (this.s$t) {
      ParkourController_1.ParkourController.EndParkour(this.s$t);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ParkourFinished, this.h$t);
  }
  OnDestroy() {
    super.OnDestroy();
  }
  GetCustomTrackText(e) {
    let r = 0;
    let t = 0;
    if (this.s$t) {
      var o = ModelManager_1.ModelManager.ParkourModel.GetParkour(this.s$t);
      if (!o?.ParkourInfo) {
        return e;
      }
      if (e.search("{show_only}") !== -1) {
        r = o.ParkourInfo.CheckPointsRequire - o.CurCheckPointCount;
        return e.replace("{show_only}", " " + r.toString());
      }
      t = o.ParkourInfo.CheckPointsRequire;
      r = Math.min(o.ParkourInfo.CheckPointsRequire - o.CurCheckPointCount, o.ParkourInfo.CheckPointsRequire);
    }
    if (t === 0) {
      return e;
    } else {
      return `${e}(${r}/${t})`;
    }
  }
}
exports.ParkourBehaviorNode = ParkourBehaviorNode;
//# sourceMappingURL=ParkourBehaviorNode.js.map