"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stack_1 = require("../../../Core/Container/Stack");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AdviceController_1 = require("./AdviceController");
const AdviceCreateActor_1 = require("./AdviceCreateActor");
const AdviceData_1 = require("./AdviceData");
const AdviceMotionActor_1 = require("./AdviceMotionActor");
class AdviceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentSentenceWordMap = new Map();
    this.CurrentPreSentenceWordMap = new Map();
    this.CurrentPreSelectWordId = 0;
    this.CurrentSelectWordId = 0;
    this.CurrentPreSelectSentenceIndex = 0;
    this.CurrentConjunctionId = 0;
    this.CurrentChangeWordType = 0;
    this.CurrentLineModel = 0;
    this.CurrentSentenceSelectIndex = 0;
    this.q9e = 0;
    this.PreSelectSortTypeId = 0;
    this.PreSelectSortWordId = 0;
    this.CurrentSelectSortWordId = 0;
    this.CurrentSelectSortTypeId = 0;
    this.CurrentWordMap = new Map();
    this.CurrentSelectWordIndex = 0;
    this.PreSelectExpressionId = 0;
    this.CurrentExpressionId = 0;
    this.CurrentSelectRoleId = 0;
    this.PreSelectRoleId = 0;
    this.CurrentSelectMotionId = 0;
    this.PreSelectMotionId = 0;
    this.PreSelectAdviceItemId = 0;
    this.AdviceViewShowId = undefined;
    this.G9e = new Set();
    this.N9e = new Map();
    this.O9e = undefined;
    this.k9e = false;
    this.F9e = 0;
    this.V9e = undefined;
    this.H9e = false;
    this.j9e = new Stack_1.Stack();
    this.W9e = new Map();
    this.K9e = undefined;
  }
  GetAdviceCreateActor() {
    if (!this.K9e) {
      this.K9e = new AdviceCreateActor_1.AdviceCreateActor();
      this.K9e.Init();
    }
    this.K9e.RefreshPosition();
    return this.K9e;
  }
  OnAdviceCreateActorDestroy() {
    this.K9e = undefined;
  }
  GetAdviceMotionActor(e) {
    e = this.W9e.get(e);
    return e || this.j9e.Pop() || new AdviceMotionActor_1.AdviceMotionActor();
  }
  AddPlayingMotionEntity(e, t) {
    this.W9e.set(e, t);
  }
  RemovePlayingMotionEntity(e) {
    this.W9e.delete(e);
  }
  RecycleMotionActor(e) {
    this.j9e.Push(e);
  }
  RemoveMotionActor(e) {
    this.j9e.Delete(e);
  }
  PhraseAdviceData(e) {
    this.G9e.clear();
    e.ZMs.forEach(e => {
      e = MathUtils_1.MathUtils.LongToBigInt(e);
      this.G9e.add(e);
    });
    this.N9e.clear();
    e.zMs.forEach(e => {
      var t = new AdviceData_1.AdviceData();
      t.Phrase(e);
      this.N9e.set(t.GetAdviceBigId(), t);
    });
    this.k9e = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnReceiveAdviceData);
  }
  PhraseAdviceCreateData(e) {
    var t = new AdviceData_1.AdviceData();
    t.Phrase(e.YMs);
    this.N9e.set(t.GetAdviceBigId(), t);
    this.k9e = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCreateAdviceSuccess);
  }
  OnAdviceUpdateNotify(e) {
    this.G9e.clear();
    e.ZMs.forEach(e => {
      e = MathUtils_1.MathUtils.LongToBigInt(e);
      this.G9e.add(e);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAdviceVoteNotify);
  }
  ResetVoteIds() {
    this.G9e.clear();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAdviceVoteNotify);
  }
  OnRequestVote(e, t) {
    this.G9e.delete(e);
    if (t === Protocol_1.Aki.Protocol.Oks.Proto_Up) {
      this.G9e.add(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAdviceVoteNotify);
  }
  OnAdviceVoteUpdate(e, t) {
    e = this.N9e.get(e);
    if (e) {
      e.PhraseUpDownData(t.XMs);
    }
  }
  OnModifyAdvice(e, t) {
    var i = MathUtils_1.MathUtils.LongToBigInt(e);
    var i = this.N9e.get(i);
    if (i) {
      i.PhraseData(t);
    }
    this.k9e = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnModifyAdviceSuccess, e);
  }
  OnDeleteAdvice(e) {
    e = MathUtils_1.MathUtils.LongToBigInt(e);
    this.N9e.delete(e);
    this.k9e = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDeleteAdviceSuccess);
  }
  GetAdviceArray() {
    if (this.k9e) {
      this.O9e = Array.from(this.N9e.values());
      this.k9e = false;
    }
    return this.O9e;
  }
  GetUpVoteIds() {
    return Array.from(this.G9e);
  }
  GetIfCanCreateAdvice(e) {
    var t;
    var i;
    var r = this.CurrentSentenceWordMap;
    var n = this.CurrentConjunctionId;
    var a = this.CurrentWordMap;
    for ([t, i] of r.entries()) {
      if ((e !== 0 || t !== 1) && i > 0) {
        var o = a.get(t);
        if (!o || o <= 0) {
          return false;
        }
      }
    }
    return e !== 1 || !!n && !(n <= 0);
  }
  SetCurrentEntityId(e) {
    this.F9e = e;
    this.V9e = undefined;
    var e = EntitySystem_1.EntitySystem.Get(e);
    if (e) {
      e = e.GetComponent(0);
      this.V9e = e.GetAdviceInfo();
    }
  }
  GetCurrentEntityAdviceData() {
    return this.V9e;
  }
  GetCurrentEntityId() {
    return this.F9e;
  }
  ResetWordData() {
    this.CurrentWordMap.clear();
    this.CurrentSentenceWordMap.clear();
    this.CurrentConjunctionId = 0;
    this.CurrentSelectMotionId = 0;
    this.CurrentSelectSortWordId = 0;
    this.CurrentSelectSortTypeId = 0;
    this.CurrentSelectWordIndex = 0;
    this.CurrentExpressionId = 0;
    this.CurrentSelectRoleId = 0;
    this.CurrentLineModel = 0;
    this.PreSelectRoleId = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(0)?.GetRoleId() ?? 0;
    this.CurrentSelectMotionId = 0;
    this.PreSelectMotionId = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId();
    var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
    var t = Number(MathUtils_1.MathUtils.GetRandomRange(0, e.length - 1).toFixed());
    this.CurrentSentenceWordMap.set(0, e[t].Id);
    this.RandomSecondSentenceWord();
  }
  SetAdviceShowSetting(e) {
    this.H9e = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, GameSettingsDefine_1.EFunction.ADVICESETTING);
  }
  GetAdviceShowSetting() {
    return this.H9e;
  }
  GetCreateAdvicePreConditionState() {
    var e;
    if (this.Q9e()) {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Advice", 27, "IsInInstance");
        }
        return false;
      } else if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
        if (AdviceController_1.AdviceController.CheckIfStandAndInValidActor()) {
          return !(e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(205)).HasTag(1996802261) && (!!e.HasTag(248240472) || !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Advice", 27, "行为状态.动作状态.站立Tag"), 1));
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Advice", 27, "CheckIfStandAndInValidActor");
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Advice", 27, "IsMyWorld");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Advice", 27, "CheckIfSystemOpen");
      }
      return false;
    }
  }
  GetCreateConditionState() {
    if (AdviceController_1.AdviceController.CheckBehindAdviceActor()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Advice", 27, "CheckBehindAdviceActor");
      }
      return false;
    } else if (AdviceController_1.AdviceController.CheckInInValidArea()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Advice", 27, "CheckInInValidArea");
      }
      return false;
    } else {
      return !this.CheckIfMaxAdvice();
    }
  }
  CheckIfMaxAdvice() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("AdviceCreateLimit") ?? 0;
    return ModelManager_1.ModelManager.AdviceModel.GetAdviceArray().length >= e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Advice", 27, "AdviceCreateLimit"), true);
  }
  GetCreatePreConditionFailText() {
    var e;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      return "CannotPutAdviceInInstanceDungeon";
    } else if (this.Q9e()) {
      if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
        if (AdviceController_1.AdviceController.CheckIfStandAndInValidActor()) {
          if ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(205)).HasTag(1996802261)) {
            return "AdviceCannotOpenOnBattle";
          } else if (e.HasTag(248240472)) {
            return "CurrentStateCannotPutAdvice";
          } else {
            return "AdviceJustCanPutWhenStand";
          }
        } else {
          return "CurrentStateCannotPutAdvice";
        }
      } else {
        return "CannotPutAdviceWhenInOtherWorld";
      }
    } else {
      return "FunctionDisable";
    }
  }
  GetCreateConditionFailText() {
    var e;
    if (AdviceController_1.AdviceController.CheckBehindAdviceActor()) {
      return "AdviceTooClose";
    } else if (AdviceController_1.AdviceController.CheckInInValidArea()) {
      return "AdviceAreaCannotPut";
    } else {
      e = CommonParamById_1.configCommonParamById.GetIntConfig("AdviceCreateLimit") ?? 0;
      if (ModelManager_1.ModelManager.AdviceModel.GetAdviceArray().length >= e) {
        return "OverCreateAdviceMax";
      } else {
        return "CurrentStateCannotPutAdvice";
      }
    }
  }
  Q9e() {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10048) && !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10050);
  }
  OnChangeSentence(e) {
    ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.set(e, 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectAdviceWord);
  }
  GetMotionSelectData() {
    const t = new Array();
    var e = ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId;
    var i = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId();
    var i = new AdviceData_1.AdviceMotionSelectData(i);
    t.push(i);
    if (e > 0) {
      ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfigsByRoleId(e).forEach(e => {
        e = new AdviceData_1.AdviceMotionSelectData(e.Id);
        t.push(e);
      });
    }
    return t;
  }
  GetAdviceSelectData(e) {
    var t = new Array();
    if (e === 0) {
      const i = new AdviceData_1.AdviceSelectItemData(0);
      t.push(i);
    } else {
      e = new AdviceData_1.AdviceSelectItemData(0);
      t.push(e);
      e = new AdviceData_1.AdviceSelectItemData(1);
      t.push(e);
      e = new AdviceData_1.AdviceSelectItemData(2);
      t.push(e);
    }
    let i = new AdviceData_1.AdviceSelectItemData(3);
    t.push(i);
    i = new AdviceData_1.AdviceSelectItemData(4);
    t.push(i);
    i = new AdviceData_1.AdviceSelectItemData(5);
    t.push(i);
    i = new AdviceData_1.AdviceSelectItemData(6);
    t.push(i);
    return t;
  }
  RandomSecondSentenceWord() {
    var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
    let t = Number(MathUtils_1.MathUtils.GetRandomRange(0, e.length - 1).toFixed());
    for (var i = ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(0); t === i;) {
      t = Number(MathUtils_1.MathUtils.GetRandomRange(0, e.length - 1).toFixed());
    }
    this.q9e = t;
    ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.set(1, e[this.q9e].Id);
  }
  GetFirstLineText() {
    var e = new Array();
    var t = new AdviceData_1.AdviceContentData();
    t.SetData(this.CurrentSentenceWordMap.get(0), this.CurrentWordMap.get(0), Protocol_1.Aki.Protocol.qks.Proto_Sentence);
    e.push(t);
    var t = new AdviceData_1.AdviceData();
    t.PhraseShowText(e, 0);
    return t.GetAdviceShowText();
  }
  GetSecondLineText() {
    var e = new Array();
    let t = new AdviceData_1.AdviceContentData();
    t.SetData(this.CurrentConjunctionId, 0, Protocol_1.Aki.Protocol.qks.Proto_Conjunction);
    e.push(t);
    (t = new AdviceData_1.AdviceContentData()).SetData(this.CurrentSentenceWordMap.get(1), this.CurrentWordMap.get(1), Protocol_1.Aki.Protocol.qks.Proto_Sentence);
    e.push(t);
    var i = new AdviceData_1.AdviceData();
    i.PhraseShowText(e, 1);
    return i.GetAdviceShowText();
  }
  GetCurrentShowText() {
    var t = new Array();
    if (this.CurrentLineModel === 0) {
      const e = new AdviceData_1.AdviceContentData();
      e.SetData(this.CurrentSentenceWordMap.get(0), this.CurrentWordMap.get(0), Protocol_1.Aki.Protocol.qks.Proto_Sentence);
      t.push(e);
    } else {
      let e = new AdviceData_1.AdviceContentData();
      e.SetData(this.CurrentSentenceWordMap.get(0), this.CurrentWordMap.get(0), Protocol_1.Aki.Protocol.qks.Proto_Sentence);
      t.push(e);
      (e = new AdviceData_1.AdviceContentData()).SetData(this.CurrentConjunctionId, 0, Protocol_1.Aki.Protocol.qks.Proto_Conjunction);
      t.push(e);
      (e = new AdviceData_1.AdviceContentData()).SetData(this.CurrentSentenceWordMap.get(1), this.CurrentWordMap.get(1), Protocol_1.Aki.Protocol.qks.Proto_Sentence);
      t.push(e);
    }
    const e = new AdviceData_1.AdviceData();
    e.PhraseShowText(t);
    return e.GetAdviceShowText();
  }
  GetCreateAdviceContent() {
    var e;
    var t;
    var i;
    var r;
    var n = new Array();
    var a = ModelManager_1.ModelManager.AdviceModel;
    var o = a.CurrentSentenceWordMap;
    var s = a.CurrentConjunctionId;
    var d = a.CurrentWordMap;
    let c = 0;
    for ([e, t] of o.entries()) {
      if (!(t <= 0) && (this.CurrentLineModel !== 0 || e !== 1)) {
        if ((r = d.get(e)) > 0) {
          c++;
          (i = new AdviceData_1.AdviceContentData()).SetData(t, r, Protocol_1.Aki.Protocol.qks.Proto_Sentence);
          n.push(i);
        }
        if (c === 1 && this.CurrentLineModel !== 0 && s > 0) {
          (r = new AdviceData_1.AdviceContentData()).SetData(s, 0, Protocol_1.Aki.Protocol.qks.Proto_Conjunction);
          n.push(r);
        }
      }
    }
    if (a.CurrentExpressionId > 0) {
      (o = new AdviceData_1.AdviceContentData()).SetData(a.CurrentExpressionId, 0, Protocol_1.Aki.Protocol.qks.Proto_Expression);
      n.push(o);
    }
    if (a.CurrentSelectMotionId > 0) {
      (o = new AdviceData_1.AdviceContentData()).SetData(a.CurrentSelectMotionId, 0, Protocol_1.Aki.Protocol.qks.c8n);
      n.push(o);
    }
    return n;
  }
}
exports.AdviceModel = AdviceModel;
//# sourceMappingURL=AdviceModel.js.map