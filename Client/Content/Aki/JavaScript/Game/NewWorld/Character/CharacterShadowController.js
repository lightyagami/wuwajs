"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterShadowController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const ModelManager_1 = require("../../Manager/ModelManager");
class CharacterShadowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.EKo();
    this.OnAddEvents();
    this.Uqn = new Date();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetImageQuality, this.SKo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetImageQuality, this.SKo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  static EKo() {
    this.yKo = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMaxRoleShadowDistance();
    this.IKo = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMaxRoleShadowNum();
    this.TKo = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMaxDecalShadowDistance();
    this.LKo = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMainPlayerUseRealRoleShadow() !== 0;
  }
  static async xqn() {
    var e;
    var t = new Date();
    if ((t.getTime() - this.Uqn.getTime()) / 1000 / 60 >= 3 && (this.Uqn = t, t = UE.Guid.NewGuid(), cpp_1.KuroCharacterShadowLibrary.Set(t), (e = new Protocol_1.Aki.Protocol.CombatMessage.Vfs()).s5n = t.ToString(), t = await Net_1.Net.CallAsync(16120, e))) {
      cpp_1.KuroCharacterShadowLibrary.SetR(t.YLs);
    }
  }
  static OnTick(e) {
    if (Net_1.Net.IsFinishLogin()) {
      this.xqn();
    }
    if (!TickSystem_1.TickSystem.IsPaused && !(Time_1.Time.Frame - this.IDa < 15)) {
      if (this.RKo && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 54, "[CharacterShadowController]UpdateFrame", ["Time.Frame", Time_1.Time.Frame], ["this.LastUpdateFrame", this.IDa]);
      }
      this.IDa = Time_1.Time.Frame;
      if (!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() && this.TKo > 0) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(this.TKo, 248, this.DKo);
        let e = 0;
        this.gya.clear();
        this.fya.clear();
        for (const o of this.DKo) {
          var t;
          if (o.Valid && (t = o.Entity.GetComponent(2)) && t.Actor.IsValid() && t.Owner?.WasRecentlyRenderedOnScreen) {
            if (this.IKo > 0 && e < this.IKo && o.Entity.DistanceWithCamera < this.yKo) {
              t.Actor.CharRenderingComponent?.SetDecalShadowEnabled(false);
              t.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(true);
              this.gya.add(o);
              e++;
              if (this.RKo && Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 24, "[CharacterShadowController] Enable Character Real Shadow", ["EnableRealShadowDistance:", this.yKo], ["EnableRealShadowNum:", this.IKo], ["Distance:", o.Entity.DistanceWithCamera], ["ActorLabel", t.Actor.ActorLabel], ["i", e]);
              }
            } else {
              if (e >= this.IKo) {
                t.Actor.CharRenderingComponent?.SetDecalShadowEnabled(true);
                t.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(false);
                this.fya.add(o);
              }
              if (this.RKo && Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 24, "[CharacterShadowController] Enable Decal Shadow", ["MaxDecalShadowDistance:", this.TKo], ["Distance:", o.Entity.DistanceWithCamera], ["ActorLabel", t.Actor.ActorLabel], ["i", e]);
              }
            }
          }
        }
        for (const i of this.pya) {
          var a;
          if (!!i.Valid && !this.gya.has(i) && !this.fya.has(i)) {
            if ((a = i.Entity.GetComponent(2)) && a.Actor.IsValid()) {
              a.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent();
            }
          }
        }
      }
      this.pya = this.fya;
      for (const n of this.AKo) {
        var r;
        if (n.Valid && (r = n.Entity.GetComponent(2)) && r.Actor.IsValid() && (n.Entity?.Active ? this.LKo ? (r.Actor.CharRenderingComponent?.SetDecalShadowEnabled(false), r.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(true)) : (r.Actor.CharRenderingComponent?.SetDecalShadowEnabled(true), r.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(false)) : r.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent(), this.RKo) && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 24, "[CharacterShadowController] Set Role Shadow", ["Active", n.Entity?.Active], ["IsMainPlayerUseRealRoleShadow", this.LKo], ["ActorLabel", r.Actor.ActorLabel], ["type", r.Actor.CharRenderingComponent?.RenderType]);
        }
      }
    }
  }
}
exports.CharacterShadowController = CharacterShadowController;
(_a = CharacterShadowController).IsTickEvenPausedInternal = true;
CharacterShadowController.yKo = 0;
CharacterShadowController.IKo = 0;
CharacterShadowController.TKo = 0;
CharacterShadowController.IDa = 0;
CharacterShadowController.LKo = false;
CharacterShadowController.AKo = new Set();
CharacterShadowController.DKo = [];
CharacterShadowController.fya = new Set();
CharacterShadowController.gya = new Set();
CharacterShadowController.pya = new Set();
CharacterShadowController.RKo = false;
CharacterShadowController.Uqn = undefined;
CharacterShadowController.SKo = () => {
  _a.EKo();
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("GameSettings", 64, "OnSetImageQuality", ["GameSettingsDeviceRender.GameQualitySettingLevel", GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel], ["this.EnableRealShadowDistance", _a.yKo], ["this.EnableRealShadowNum", _a.IKo], ["this.MaxDecalShadowDistance", _a.TKo], ["this.IsMainPlayerUseRealRoleShadow", _a.LKo]);
  }
};
CharacterShadowController.GUe = (e, t, a) => {
  var r = t.Entity?.GetComponent(0);
  if (r && r.IsCharacter()) {
    if (r.IsRole() || r.GetSummonerPlayerId() !== 0 || r.IsVision()) {
      _a.AKo.add(t);
    } else if ((r = t.Entity.GetComponent(2)) && r.Actor.IsValid() && _a.IKo === 0) {
      r.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent();
    }
  }
};
CharacterShadowController.zpe = (e, t) => {
  _a.AKo.delete(t);
}; //# sourceMappingURL=CharacterShadowController.js.map