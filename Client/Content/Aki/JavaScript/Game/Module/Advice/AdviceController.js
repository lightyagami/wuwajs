"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceController = exports.INFO_ADVICE_ITEM_TYPE = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const AdviceData_1 = require("./AdviceData");
exports.INFO_ADVICE_ITEM_TYPE = 20;
const PROFILE_KEY = "Advice";
class AdviceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetFriendInitData, AdviceController.RequestAdviceData);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OriginWorldLevelUp, AdviceController.t9e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerLevelChanged, this.x2e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this._Mo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetFriendInitData, AdviceController.RequestAdviceData);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OriginWorldLevelUp, AdviceController.t9e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerLevelChanged, this.x2e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this._Mo);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18325, AdviceController.i9e);
    Net_1.Net.Register(16426, AdviceController.o9e);
    Net_1.Net.Register(26180, AdviceController.r9e);
    Net_1.Net.Register(22112, AdviceController.n9e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18325);
    Net_1.Net.UnRegister(16426);
    Net_1.Net.UnRegister(22112);
    Net_1.Net.UnRegister(26180);
  }
  static OpenAdviceConjunctionSelectView() {
    var e = ModelManager_1.ModelManager.AdviceModel;
    e.CurrentChangeWordType = 1;
    e.CurrentSelectWordId = e.CurrentConjunctionId;
    UiManager_1.UiManager.OpenView("AdviceWordView");
  }
  static OpenAdviceWordSelectView(e) {
    var r;
    var t = ModelManager_1.ModelManager.AdviceModel;
    var o = t.CurrentWordMap.get(e);
    if (o !== undefined && o > 0) {
      r = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordType(o);
      t.CurrentSelectSortTypeId = r;
      t.CurrentSelectSortWordId = o;
    } else {
      r = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs()[0].Id;
      t.CurrentSelectSortTypeId = r;
      t.CurrentSelectSortWordId = -1;
    }
    t.CurrentSelectWordIndex = e;
    UiManager_1.UiManager.OpenView("AdviceSortWordView");
  }
  static OpenAdviceSentenceSelectView() {
    const e = ModelManager_1.ModelManager.AdviceModel;
    if (e.CurrentLineModel === 0) {
      const e = ModelManager_1.ModelManager.AdviceModel;
      e.CurrentChangeWordType = 0;
      var r = e.CurrentSentenceWordMap.get(0);
      e.CurrentSelectWordId = r;
      e.CurrentPreSelectSentenceIndex = 0;
      UiManager_1.UiManager.OpenView("AdviceWordView");
    } else {
      UiManager_1.UiManager.OpenView("AdviceMutiSentenceSelectView");
    }
  }
  static OpenAdviceExpressionView() {
    UiManager_1.UiManager.OpenView("AdviceExpressionView");
  }
  static OpenAdviceCreateView() {
    var e;
    if (ModelManager_1.ModelManager.AdviceModel.GetCreateAdvicePreConditionState()) {
      ModelManager_1.ModelManager.AdviceModel.ResetWordData();
      UiManager_1.UiManager.OpenView("AdviceCreateView");
    } else {
      e = ModelManager_1.ModelManager.AdviceModel.GetCreatePreConditionFailText();
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(e);
    }
  }
  static OpenAdviceView() {
    ModelManager_1.ModelManager.AdviceModel.AdviceViewShowId = undefined;
    UiManager_1.UiManager.OpenView("AdviceView");
  }
  static async OpenAdviceInfoView(e) {
    if (AdviceController.s9e()) {
      return false;
    }
    {
      ModelManager_1.ModelManager.AdviceModel.SetCurrentEntityId(e);
      this.a9e(e);
      var e = await UiManager_1.UiManager.OpenViewAsync("AdviceInfoView");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAdviceInfoView);
      var r = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData();
      var t = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData();
      var o = new LogReportDefine_1.AdviceWatchLogData();
      o.l_advice_id = r.GetAdviceBigId().toString();
      var r = r.GetAdviceContentData();
      const n = new Array();
      r.forEach(e => {
        var r = new AdviceData_1.LogAdviceData();
        r.Phrase(e);
        n.push(r);
      });
      o.o_content = n;
      o.i_creator_id = t.GetPlayerId();
      o.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
      o.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
      r = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
      o.f_pos_x = r.X;
      o.f_pos_y = r.Y;
      o.f_pos_z = r.Z;
      o.i_expression = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
      o.i_motion = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
      LogReportController_1.LogReportController.LogReport(o);
      return e !== undefined;
    }
  }
  static s9e() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e?.Valid && e.Entity.GetComponent(206).HasTag(1996802261)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BattleCannotOpenAdvice");
      return true;
    }
    return false;
  }
  static a9e(e) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    if (r.GetComponent(0).GetAdviceInfo().GetAdviceData().GetAdviceMotionId() > 0) {
      ModelManager_1.ModelManager.AdviceModel.GetAdviceMotionActor(e).PlayMotion(e);
    }
    r.GetComponent(144)?.DoInteract();
  }
  static RequestCreateAdvice(e, r, t, o) {
    const n = new Protocol_1.Aki.Protocol.NXn();
    n.l8n = {
      X: e.X,
      Y: e.Y,
      Z: e.Z
    };
    n._8n = {
      Pitch: r.Pitch,
      Yaw: r.Yaw,
      Roll: r.Roll
    };
    n.u8n = new Array();
    t.forEach(e => {
      n.u8n.push(e.ConvertToPb());
    });
    Net_1.Net.Call(27157, n, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16354);
      } else {
        if (o) {
          o();
        }
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("HasPublishAdvice");
        ModelManager_1.ModelManager.AdviceModel.PhraseAdviceCreateData(e);
      }
    });
  }
  static RequestModifyAdvice(r, t) {
    const o = new Protocol_1.Aki.Protocol.VXn();
    o.s5n = r;
    o.u8n = new Array();
    t.forEach(e => {
      o.u8n.push(e.ConvertToPb());
    });
    Net_1.Net.Call(26306, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20081);
      } else {
        ModelManager_1.ModelManager.AdviceModel.OnModifyAdvice(r, t);
      }
    });
  }
  static RequestDeleteAdvice(r) {
    var e = new Protocol_1.Aki.Protocol.HXn();
    e.s5n = r;
    Net_1.Net.Call(27477, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26552);
      } else {
        ModelManager_1.ModelManager.AdviceModel.OnDeleteAdvice(r);
      }
    });
  }
  static RequestVote(e, r, t) {
    var o = new Protocol_1.Aki.Protocol.WXn();
    o.s5n = e;
    o.h5n = t;
    Net_1.Net.Call(29785, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23898);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAdviceVoteNotify);
      } else {
        ModelManager_1.ModelManager.AdviceModel.OnRequestVote(r, t);
      }
    });
  }
  static RequestSetAdviceShowState(e) {
    const r = new Protocol_1.Aki.Protocol.xXn();
    r.q5n = e;
    Net_1.Net.Call(24060, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22756);
      } else {
        ModelManager_1.ModelManager.AdviceModel.SetAdviceShowSetting(r.q5n);
      }
    });
  }
  static CheckInInValidArea() {
    return !!ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCannotPutArea().includes(ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId);
  }
  static CheckBehindAdviceActor() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    var r = ModelManager_1.ModelManager.FunctionModel.PlayerId;
    var t = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCannotPutDistance();
    for (const a of e.values()) {
      var o = a.Entity.GetComponent(0);
      if (o && o.GetAdviceInfo()?.GetPlayerId() === r) {
        var o = Global_1.Global.BaseCharacter;
        var n = a.Entity.GetComponent(1)?.Owner;
        if (o && a && n) {
          n = n.D_K2_GetActorLocation();
          o = o.D_K2_GetActorLocation();
          if (UE.KismetMathLibrary.D_Vector_Distance(n, o) <= t) {
            return true;
          }
        }
      }
    }
    return false;
  }
  static CheckIfStandAndInValidActor() {
    var e = Vector_1.Vector.Create();
    var r = Vector_1.Vector.Create();
    var t = Global_1.Global.BaseCharacter.CharacterActorComponent;
    var o = t.ActorLocationProxy;
    e.DeepCopy(o);
    e.Z += t.DefaultHalfHeight;
    r.DeepCopy(o);
    r.Z -= t.DefaultHalfHeight + 300;
    var n = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    n.WorldContextObject = t.Actor;
    n.Radius = t.DefaultRadius;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, r);
    n.ActorsToIgnore.Empty();
    var o = TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, n, PROFILE_KEY, PROFILE_KEY);
    if (!o) {
      ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace();
      return false;
    }
    var a = n.HitResult.GetHitCount();
    for (let e = 0; e < a; ++e) {
      var i = n.HitResult.Actors.Get(e);
      if (!this.h9e(i)) {
        ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace();
        return false;
      }
    }
    ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace();
    return true;
  }
  static h9e(e) {
    if (e && UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
      var r = e.GetEntityId();
      const t = EntitySystem_1.EntitySystem.Get(r);
      if (t?.Valid) {
        return false;
      } else {
        return true;
      }
    }
    const t = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
    return !t?.Valid;
  }
}
(exports.AdviceController = AdviceController).t9e = () => {
  if (UiManager_1.UiManager.IsViewShow("AdviceInfoView")) {
    UiManager_1.UiManager.CloseView("AdviceInfoView");
  }
};
AdviceController.x2e = (e, r, t, o, n, a, i) => {
  if (UiManager_1.UiManager.IsViewShow("AdviceInfoView")) {
    UiManager_1.UiManager.CloseView("AdviceInfoView");
  }
};
AdviceController.e9e = (e, r) => {
  var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
  if (e.Parameters.size > 0 && (e = e.Parameters.get(exports.INFO_ADVICE_ITEM_TYPE)) !== undefined && e !== 0) {
    AdviceController.OpenAdviceCreateView();
  }
};
AdviceController._Mo = () => {
  ModelManager_1.ModelManager.AdviceModel.ResetVoteIds();
};
AdviceController.RequestAdviceData = () => {
  var e = new Protocol_1.Aki.Protocol.GXn();
  Net_1.Net.Call(26002, e, e => {
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16119);
    } else {
      ModelManager_1.ModelManager.AdviceModel.PhraseAdviceData(e);
    }
  });
};
AdviceController.i9e = e => {
  var r = MathUtils_1.MathUtils.LongToBigInt(e.s5n);
  var r = Number(r);
  var r = EntitySystem_1.EntitySystem.Get(r);
  if (r) {
    r.GetComponent(0).GetAdviceInfo().PhraseContent(e.u8n);
  }
};
AdviceController.o9e = e => {
  var r = MathUtils_1.MathUtils.LongToNumber(e.s5n);
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
  if (r?.Valid) {
    (r = r.Entity.GetComponent(0)).GetAdviceInfo().PhraseVote(e.XMs);
    ModelManager_1.ModelManager.AdviceModel.OnAdviceVoteUpdate(r.GetAdviceInfo().GetAdviceData().GetAdviceBigId(), e);
  }
};
AdviceController.r9e = e => {
  ModelManager_1.ModelManager.AdviceModel.OnAdviceUpdateNotify(e);
};
AdviceController.n9e = e => {
  ModelManager_1.ModelManager.AdviceModel.SetAdviceShowSetting(e.q5n);
}; //# sourceMappingURL=AdviceController.js.map