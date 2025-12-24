"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSetPlayerPos = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSetPlayerPos extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments);
    this.Ilt = e => {
      e = LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(e?.GameCtx);
      if (!!e && e.Type === 15 && (e.FlowActionId === this.Context.CurActionId || e.FlowActionId === this.Context.CurSubActionId)) {
        ModelManager_1.ModelManager.PlotModel.SetTemplatePlayerTransform({
          X: Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorLocationProxy.X,
          Y: Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorLocationProxy.Y,
          Z: Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorLocationProxy.Z,
          A: Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorRotationProxy.Yaw,
          Roll: Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorRotationProxy.Roll,
          Pitch: Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorRotationProxy.Pitch
        });
        if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TeleportComplete, this.Ilt)) {
          EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
        }
        this.FinishExecute(true);
      }
    };
  }
  OnExecute() {
    this.RequestServerAction();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  OnBackgroundExecute() {
    if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      this.FinishExecute(true);
    } else {
      this.OnExecute();
    }
  }
  OnInterruptExecute() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TeleportComplete, this.Ilt)) {
      this.Ilt();
    }
  }
}
exports.FlowActionSetPlayerPos = FlowActionSetPlayerPos;
//# sourceMappingURL=FlowActionSetPlayerPos.js.map