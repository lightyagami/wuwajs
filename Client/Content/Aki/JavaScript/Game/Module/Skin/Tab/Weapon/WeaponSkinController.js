"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase");
const WeaponSkinDefine_1 = require("./WeaponSkinDefine");
class WeaponSkinController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
  }
  static Wil() {
    var e = new Protocol_1.Aki.Protocol._ss();
    Net_1.Net.Call(16579, Protocol_1.Aki.Protocol._ss.create(e), e => {
      if (e) {
        ModelManager_1.ModelManager.WeaponSkinModel.NotifyWeaponSkinData(e.qxs);
      }
    });
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22774, e => {
      if (e) {
        if (e.wVn) {
          ModelManager_1.ModelManager.WeaponSkinModel.NotifyAllUnlockSkinData(e.bBs);
        } else {
          ModelManager_1.ModelManager.WeaponSkinModel.SetUnlockSkinData(e.bBs);
        }
      }
    });
    Net_1.Net.Register(20376, e => {
      if (e && (ModelManager_1.ModelManager.WeaponSkinModel.DeleteWeaponSkinData(e.Q6n), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("WeaponSkin,", 10, "武器皮肤卸载成功", ["roleId", e.Q6n]);
      }
    });
    Net_1.Net.Register(28485, e => {
      var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 4, "服务器下发武器皮肤", ["WeaponSkinId", e.lI_?.yI_], ["ServerEntityId", t]);
      }
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t).Entity.GetComponent(86);
      if (t) {
        t.OnEntityEquipSkinChangeNotify(e);
      }
    });
    Net_1.Net.Register(22011, e => {
      for (const o of e.zDc) {
        var t = MathUtils_1.MathUtils.LongToNumber(o.F4n);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 4, "服务器下发翱翔与滑翔翼皮肤", ["FlySkinId", o.cGc], ["ServerEntityId", t]);
        }
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t).Entity.GetComponent(86);
        if (!t) {
          return;
        }
        t.OnEntitySoarWingOrParaglidingSkinChangeNotify(o);
      }
    });
    Net_1.Net.Register(27028, this.TOd);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22774);
    Net_1.Net.UnRegister(20376);
    Net_1.Net.UnRegister(28485);
    Net_1.Net.UnRegister(22011);
    Net_1.Net.UnRegister(27028);
  }
  static Jsl(t, o) {
    var e = Protocol_1.Aki.Protocol.tg_.create();
    e.R5n = Protocol_1.Aki.Protocol.kR_.create();
    e.R5n.mjn = t;
    e.R5n.Zsl = o;
    Net_1.Net.Call(25541, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WeaponSkinModel.EquipWeaponSkinData(e.Gxs);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("WeaponSkin,", 10, "武器皮肤装备成功", ["roleId", t], ["skinId", o]);
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25260);
        }
      }
    });
  }
  static eal(e) {
    var t;
    if (!!e && !(e <= 0)) {
      (t = Protocol_1.Aki.Protocol.rg_.create()).mjn = e;
      Net_1.Net.Call(27434, t, e => {
        if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22477);
        }
      });
    }
  }
  static SendEquipSkinRequest(e, t) {
    if (!!e && !(e <= 0)) {
      if (t === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID) {
        WeaponSkinController.eal(e);
      } else {
        WeaponSkinController.Jsl(e, t);
      }
    }
  }
}
(exports.WeaponSkinController = WeaponSkinController).Q5e = () => {
  WeaponSkinController.Wil();
};
WeaponSkinController.TOd = e => {
  ModelManager_1.ModelManager.WeaponSkinModel.RefreshUnlockSkinData(e.bBs);
}; //# sourceMappingURL=WeaponSkinController.js.map