"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadPsFeedbackListenTagModule = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class GamepadPsFeedbackListenTagModule {
  constructor() {
    this.BHm = undefined;
    this.kHm = undefined;
    this.qHm = undefined;
    this.OHm = false;
    this.GHm = "";
    this.FHm = "";
    this.yCd = false;
    this.NHm = (e, t) => {
      e = this.BHm?.get(e);
      if (e && (t ? this.VHm(e) : this.HHm(e))) {
        this.jHm();
      }
    };
    this.lqt = () => {
      if (Info_1.Info.IsInGamepad()) {
        this.$Hm();
        this.WHm(Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity);
      } else {
        this.QHm();
      }
    };
    this.xie = (e, t) => {
      this.QHm();
      if (Info_1.Info.IsInGamepad()) {
        this.i1d();
        this.WHm(e.Entity);
      }
    };
    this.xMe = e => {
      if (Info_1.Info.IsInGamepad()) {
        this.KHm();
      }
    };
    this.n1d = (e, t) => {
      var i = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason("ListenTag");
      if (e.GetActionOrAxisName() === i?.ActionName && t === 2) {
        this.KHm();
      }
    };
    this.RZe = (e, t) => {
      this.yCd = t === 0;
      this.KHm();
    };
  }
  Init() {
    this.Ore();
    if (Info_1.Info.IsInGamepad()) {
      this.$Hm();
    }
  }
  Clear() {
    this.kre();
    this.QHm();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.xMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.n1d);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.xMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.n1d);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  $Hm() {
    if (!this.OHm) {
      this.OHm = true;
      var e;
      var t = ConfigManager_1.ConfigManager.GamepadConfig?.GetAllPsFeedbackConfig();
      if (t) {
        for (const i of t) {
          this.BHm ||= new Map();
          if (i.ListenTag) {
            e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.ListenTag);
            this.BHm.set(e, {
              FeedbackId: i.Id,
              Priority: i.Priority
            });
          }
        }
      }
    }
  }
  WHm(t) {
    if (t && this.BHm) {
      var i;
      var s;
      var n = t.GetComponent(215);
      var r = this.BHm.size;
      let e = 0;
      for ([i, s] of this.BHm.entries()) {
        var a = n?.ListenForTagAddOrRemove(i, this.NHm);
        if (a) {
          this.qHm ||= [];
          this.qHm.push(a);
        }
        if (n?.HasTag(i)) {
          this.VHm(s, false);
        }
        if ((e += 1) === r) {
          this.kHm?.sort((e, t) => t.Priority - e.Priority);
          this.jHm();
        }
      }
    }
  }
  VHm(e, t = true) {
    let i = this.kHm;
    var s;
    if (!i) {
      i = new Array();
      this.kHm = i;
    }
    return !i.includes(e) && (s = i[0], i.push(e), t && i.sort((e, t) => t.Priority - e.Priority), !s || s.FeedbackId !== i[0].FeedbackId);
  }
  HHm(e, t = true) {
    var i = this.kHm;
    return !!i?.includes(e) && (e = i.indexOf(e), i.splice(e, 1), t && i.sort((e, t) => t.Priority - e.Priority), e === 0);
  }
  jHm() {
    var e = this.kHm;
    if (e) {
      if (e.length > 0) {
        e = e[0];
        if (this.GHm !== e.FeedbackId) {
          this.GHm = e.FeedbackId;
          this.KHm();
        }
      } else {
        this.GHm = "";
        this.i1d();
      }
    }
  }
  QHm() {
    if (this.qHm) {
      for (const e of this.qHm) {
        e.EndTask();
      }
      this.qHm.length = 0;
    }
    if (this.kHm) {
      this.kHm.length = 0;
    }
    this.GHm = "";
  }
  KHm() {
    if (this.r1d()) {
      this.o1d();
    } else {
      this.i1d();
    }
  }
  r1d() {
    return !!this.s1d() && !this.yCd;
  }
  s1d() {
    return ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
  }
  o1d() {
    var e = this.GHm;
    if (e) {
      if (this.FHm !== e && (this.FHm = e, ControllerHolder_1.ControllerHolder.GamepadController.TryAddFeedbackReason("ListenTag", e), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("PsGamepadFeedback", 67, "监听Tag对应力反馈生效", ["FeedbackId", e]);
      }
    } else {
      this.i1d();
    }
  }
  i1d() {
    if (this.FHm) {
      this.FHm = "";
      ControllerHolder_1.ControllerHolder.GamepadController.RemoveFeedbackReason("ListenTag");
    }
  }
}
exports.GamepadPsFeedbackListenTagModule = GamepadPsFeedbackListenTagModule;
//# sourceMappingURL=GamepadPsFeedbackListenTagModule.js.map