"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceInfoView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiConfig_1 = require("../../../Ui/Define/UiConfig");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const AdviceController_1 = require("../AdviceController");
const CHECKTIMEGAP = 500;
const ROLEMOVERAGE = 3;
class AdviceInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.IRe = undefined;
    this.b9e = undefined;
    this.f7e = undefined;
    this.p7e = false;
    this.gHe = undefined;
    this.fHe = () => {
      this.G7e();
    };
    this.v7e = (e, t) => {
      if (this.p7e = t) {
        this.CloseMe();
      }
    };
    this.pHe = () => true;
    this.vHe = () => {
      var e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId();
      var e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0).GetCreatureDataId();
      var t = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData().GetAdviceBigId();
      if (ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds().includes(t)) {
        e = MathUtils_1.MathUtils.NumberToLong(e);
        this.GetExtendToggle(6).SetToggleStateForce(0, false);
        AdviceController_1.AdviceController.RequestVote(e, t, Protocol_1.Aki.Protocol.Oks.Proto_Cancel);
      }
    };
    this.MHe = () => {
      var e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId();
      var e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0).GetCreatureDataId();
      var t = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData().GetAdviceBigId();
      var e = MathUtils_1.MathUtils.NumberToLong(e);
      this.GetExtendToggle(7).SetToggleStateForce(0, false);
      if (ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds().includes(t)) {
        AdviceController_1.AdviceController.RequestVote(e, t, Protocol_1.Aki.Protocol.Oks.Proto_Cancel);
      } else {
        AdviceController_1.AdviceController.RequestVote(e, t, Protocol_1.Aki.Protocol.Oks.Proto_Up);
      }
    };
    this.EHe = () => {
      this.SHe();
    };
    this.yHe = () => {
      this.IHe();
      this.THe();
    };
    this.LHe = () => {
      this.DHe();
      this.RHe();
      this.UHe();
    };
    this.AHe = e => {
      if (UiConfig_1.UiConfig.TryGetViewInfo(e.Info.Name).Type === UiLayerType_1.ELayerType.Normal) {
        this.CloseMe();
      }
    };
    this.PHe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIText], [5, UE.UIText], [6, UE.UIExtendToggle], [7, UE.UIExtendToggle], [8, UE.UIText]];
    this.BtnBindInfo = [[6, this.vHe], [7, this.MHe]];
  }
  OnStart() {
    this.IRe = undefined;
    this.GetExtendToggle(6).SetToggleGroup(undefined);
    var e = this.GetExtendToggle(7);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.pHe);
    e.SetToggleGroup(undefined);
    this.GetText(8).SetUIActive(false);
    this.G7e();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAdviceEntityNotify, this.yHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAdviceVoteNotify, this.yHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateViewInstance, this.AHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneStartLoad, this.PHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshAdviceInfoView, this.EHe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAdviceEntityNotify, this.yHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAdviceVoteNotify, this.yHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateViewInstance, this.AHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneStartLoad, this.PHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshAdviceInfoView, this.EHe);
  }
  G7e() {
    var e;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t.Valid) {
      e = t.Entity.GetComponent(209);
      this.p7e = e.HasTag(1996802261);
      this.N7e();
      if (this.p7e) {
        this.CloseMe();
      } else {
        this.O7e(t);
      }
    }
  }
  O7e(e) {
    e = e.Entity.GetComponent(209);
    this.f7e = e.ListenForTagAddOrRemove(1996802261, this.v7e);
  }
  N7e() {
    this.f7e?.EndTask();
    this.f7e = undefined;
  }
  IHe() {
    var e = ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds();
    var t = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData().GetAdviceBigId();
    if (e.includes(t)) {
      this.GetExtendToggle(7).SetToggleStateForce(1, false);
    } else {
      this.GetExtendToggle(7).SetToggleStateForce(0, false);
    }
  }
  OnAfterShow() {
    this.SHe();
  }
  SHe() {
    this.P3e();
    this.gHe = undefined;
    ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(true);
    this.b9e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData();
    this.Og();
  }
  P3e() {
    this.xHe();
    if (this.IRe === undefined) {
      this.IRe = TimerSystem_1.TimerSystem.Forever(this.LHe, CHECKTIMEGAP);
    }
  }
  xHe() {
    if (this.IRe !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
  }
  DHe() {
    var e;
    if (!this.gHe) {
      (e = Vector_1.Vector.Create()).DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy);
      this.gHe = e;
    }
  }
  Og() {
    this.THe();
    this.T2e();
    this.wHe();
    this.IHe();
    this.K7e();
  }
  THe() {
    var e = this.b9e.GetVote();
    this.GetText(5).SetText(e.toString());
    var e = e >= ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceHighNum() ? "F9D751" : "FFFFFF";
    var e = UE.Color.FromHex(e);
    this.GetText(5).SetColor(e);
  }
  T2e() {
    var e = this.b9e.GetAdviceShowText();
    this.GetText(4).SetText(e);
  }
  K7e() {
    var e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetPlayerName();
    this.GetText(2).SetText(e);
  }
  wHe() {
    var e;
    if (this.b9e.GetAdviceExpressionId() > 0) {
      this.GetTexture(1).SetUIActive(true);
      e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(this.b9e.GetAdviceExpressionId());
      this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(1));
    } else {
      this.GetTexture(1).SetUIActive(false);
    }
  }
  UHe() {
    var e;
    if (ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint) {
      e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
      if (!this.BHe(e.X, this.gHe.X, ROLEMOVERAGE) || !this.BHe(e.Y, this.gHe.Y, ROLEMOVERAGE) || !this.BHe(e.Z, this.gHe.Z, ROLEMOVERAGE)) {
        ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(false);
      }
    }
  }
  BHe(e, t, i) {
    e = Math.ceil(e) - Math.ceil(t);
    return e < i && i * -1 < e;
  }
  RHe() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId();
    var i = EntitySystem_1.EntitySystem.Get(i);
    if (!i || (t = Global_1.Global.BaseCharacter, e = i.GetComponent(1)?.Owner, t && i && e && (i = e.D_K2_GetActorLocation(), e = t.D_K2_GetActorLocation(), t = UE.KismetMathLibrary.D_Vector_Distance(i, e), ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceViewCloseDistance() < t))) {
      this.CloseMe();
    }
  }
  OnBeforeDestroy() {
    this.xHe();
    this.N7e();
    ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(false);
  }
}
exports.AdviceInfoView = AdviceInfoView;
//# sourceMappingURL=AdviceInfoView.js.map