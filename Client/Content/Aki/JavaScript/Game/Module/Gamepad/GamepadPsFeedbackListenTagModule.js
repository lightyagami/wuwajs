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
    this.dWm = undefined;
    this.mWm = undefined;
    this.fWm = undefined;
    this.gWm = false;
    this.CWm = "";
    this.pWm = "";
    this.yCd = false;
    this.vWm = (e, t) => {
      e = this.dWm?.get(e);
      if (e && (t ? this.yWm(e) : this.SWm(e))) {
        this.MWm();
      }
    };
    this.lqt = () => {
      if (Info_1.Info.IsInGamepad()) {
        this.EWm();
        this.IWm(Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity);
      } else {
        this.TWm();
      }
    };
    this.xie = (e, t) => {
      this.TWm();
      if (Info_1.Info.IsInGamepad()) {
        this.i1d();
        this.IWm(e.Entity);
      }
    };
    this.xMe = e => {
      if (Info_1.Info.IsInGamepad()) {
        this.bWm();
      }
    };
    this.n1d = (e, t) => {
      var i = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason("ListenTag");
      if (e.GetActionOrAxisName() === i?.ActionName && t === 2) {
        this.bWm();
      }
    };
    this.RZe = (e, t) => {
      this.yCd = t === 0;
      this.bWm();
    };
  }
  Init() {
    this.Ore();
    if (Info_1.Info.IsInGamepad()) {
      this.EWm();
    }
  }
  Clear() {
    this.kre();
    this.TWm();
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
  EWm() {
    if (!this.gWm) {
      this.gWm = true;
      var e;
      var t = ConfigManager_1.ConfigManager.GamepadConfig?.GetAllPsFeedbackConfig();
      if (t) {
        for (const i of t) {
          this.dWm ||= new Map();
          if (i.ListenTag) {
            e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.ListenTag);
            this.dWm.set(e, {
              FeedbackId: i.Id,
              Priority: i.Priority
            });
          }
        }
      }
    }
  }
  IWm(t) {
    if (t && this.dWm) {
      var i;
      var s;
      var n = t.GetComponent(217);
      var r = this.dWm.size;
      let e = 0;
      for ([i, s] of this.dWm.entries()) {
        var a = n?.ListenForTagAddOrRemove(i, this.vWm);
        if (a) {
          this.fWm ||= [];
          this.fWm.push(a);
        }
        if (n?.HasTag(i)) {
          this.yWm(s, false);
        }
        if ((e += 1) === r) {
          this.mWm?.sort((e, t) => t.Priority - e.Priority);
          this.MWm();
        }
      }
    }
  }
  yWm(e, t = true) {
    let i = this.mWm;
    var s;
    if (!i) {
      i = new Array();
      this.mWm = i;
    }
    return !i.includes(e) && (s = i[0], i.push(e), t && i.sort((e, t) => t.Priority - e.Priority), !s || s.FeedbackId !== i[0].FeedbackId);
  }
  SWm(e, t = true) {
    var i = this.mWm;
    return !!i?.includes(e) && (e = i.indexOf(e), i.splice(e, 1), t && i.sort((e, t) => t.Priority - e.Priority), e === 0);
  }
  MWm() {
    var e = this.mWm;
    if (e) {
      if (e.length > 0) {
        e = e[0];
        if (this.CWm !== e.FeedbackId) {
          this.CWm = e.FeedbackId;
          this.bWm();
        }
      } else {
        this.CWm = "";
        this.i1d();
      }
    }
  }
  TWm() {
    if (this.fWm) {
      for (const e of this.fWm) {
        e.EndTask();
      }
      this.fWm.length = 0;
    }
    if (this.mWm) {
      this.mWm.length = 0;
    }
    this.CWm = "";
  }
  bWm() {
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
    var e = this.CWm;
    if (e) {
      if (this.pWm !== e && (this.pWm = e, ControllerHolder_1.ControllerHolder.GamepadController.TryAddFeedbackReason("ListenTag", e), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("PsGamepadFeedback", 67, "监听Tag对应力反馈生效", ["FeedbackId", e]);
      }
    } else {
      this.i1d();
    }
  }
  i1d() {
    if (this.pWm) {
      this.pWm = "";
      ControllerHolder_1.ControllerHolder.GamepadController.RemoveFeedbackReason("ListenTag");
    }
  }
}
exports.GamepadPsFeedbackListenTagModule = GamepadPsFeedbackListenTagModule;
//# sourceMappingURL=GamepadPsFeedbackListenTagModule.js.map