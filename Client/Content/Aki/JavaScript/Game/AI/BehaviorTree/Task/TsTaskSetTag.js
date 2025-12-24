"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSetTag extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.GameplayTag = undefined;
    this.ActorTag = "";
    this.TargetKey = "";
    this.IsCommonTag = false;
    this.IsAdd = true;
    this.SetToPlayer = false;
    this.IsInitTsVariables = false;
    this.TsGameplayTag = undefined;
    this.TsActorTag = undefined;
    this.TsTargetKey = "";
    this.TsIsCommonTag = false;
    this.TsIsAdd = false;
    this.TsSetToPlayer = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsGameplayTag = undefined;
    this.TsActorTag = undefined;
    this.TsTargetKey = "";
    this.TsIsCommonTag = false;
    this.TsIsAdd = false;
    this.TsSetToPlayer = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsGameplayTag = this.GameplayTag;
      this.TsActorTag = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActorTag);
      this.TsTargetKey = this.TargetKey;
      this.TsIsCommonTag = this.IsCommonTag;
      this.TsIsAdd = this.IsAdd;
      this.TsSetToPlayer = this.SetToPlayer;
    }
  }
  ReceiveTickAI(t, s, i) {
    var e = t.AiController;
    if (e) {
      this.InitTsVariables();
      if (this.TsGameplayTag || this.TsActorTag) {
        var h;
        var e = e.CharActorComp;
        if (e?.Valid) {
          let s = e.Entity;
          if (this.TsSetToPlayer) {
            s = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
          } else if (this.TsTargetKey) {
            let t = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByWorld(this.TsTargetKey);
            t = t || ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(e.Entity.Id, this.TsTargetKey);
            s = t ? EntitySystem_1.EntitySystem.Get(t) : undefined;
          }
          if (s) {
            if (this.TsGameplayTag) {
              this.SetGameplayTag(s);
            } else if (e = s?.GetComponent(1)) {
              h = (e = e.Owner.Tags).FindIndex(this.TsActorTag);
              if (this.TsIsAdd && h < 0) {
                e.Add(this.TsActorTag);
              } else if (h > -1) {
                e.RemoveAt(h);
              }
            }
            this.FinishExecute(true);
          } else {
            this.FinishExecute(false);
          }
        } else {
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  SetGameplayTag(t) {
    if (this.TsIsCommonTag && (s = t.GetComponent(206))) {
      i = this.TsGameplayTag.TagId;
      e = s.HasTag(i);
      if (this.TsIsAdd && !e) {
        s.AddTag(i);
      } else if (!this.TsIsAdd && e) {
        s.RemoveTag(i);
      }
    }
    var s;
    var i;
    var e = t.GetComponent(215);
    if (e) {
      s = this.TsGameplayTag.TagId;
      i = e.HasTag(s);
      if (this.TsIsAdd && !i) {
        e.AddTag(s);
      } else if (!this.TsIsAdd && i) {
        e.RemoveTag(s);
      }
    }
  }
}
exports.default = TsTaskSetTag;
//# sourceMappingURL=TsTaskSetTag.js.map