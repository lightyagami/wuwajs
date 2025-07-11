"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookController = undefined;
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const HandBookDefine_1 = require("./HandBookDefine");
class HandBookController extends UiControllerBase_1.UiControllerBase {
  static SetPhantomMeshShow(e, t) {}
  static SetWeaponMeshShow(e, t) {}
  static SetMonsterMeshShow(e, t) {}
  static SetAnimalMeshShow(e, t) {}
  static ClearEffect() {
    if (this.Uei) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Uei, "[HandBookController.ClearEffect] StopEffect", false);
      this.Uei = 0;
    }
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22304, e => {
      ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(e.h5n, e.cws);
      if (e.dws) {
        this.Aei(e.h5n, e.cws);
      }
    });
  }
  static Aei(e, t) {
    let a = "";
    if (e === Protocol_1.Aki.Protocol.N6s.Proto_Photograph) {
      e = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfig(t.s5n);
      a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "";
    }
    a.length;
  }
  static Pei(e) {
    var t = [];
    var a = [];
    var o = [];
    var r = [];
    var n = [];
    t.push(e.Texture);
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, e.Id);
    n.push(i.CreateTime);
    a.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Descrtption));
    o.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name));
    var i = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(e.Type);
    r.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.TypeDescription));
    var e = new HandBookDefine_1.HandBookPhotoData();
    e.DescrtptionText = a;
    e.TypeText = r;
    e.NameText = o;
    e.HandBookType = 2;
    e.Index = 0;
    e.TextureList = t;
    e.DateText = n;
    var i = {
      ScreenShot: false,
      IsPlayerInfoVisible: false,
      IsHiddenBattleView: false,
      HandBookPhotoData: e,
      GachaData: undefined
    };
    UiManager_1.UiManager.OpenView("PhotoSaveView", i);
  }
  static SendIllustratedRedDotRequest() {
    var e = Protocol_1.Aki.Protocol.pos.create();
    Net_1.Net.Call(16844, e, e => {
      if (e) {
        ModelManager_1.ModelManager.HandBookModel.InitHandBookRedDotList(e._ws);
      }
    });
  }
  static async SendIllustratedInfoRequestAsync(e) {
    var t = Protocol_1.Aki.Protocol.Sos.create();
    t.E9n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e);
    var a = await Net_1.Net.CallAsync(28780, t);
    if (a) {
      ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
      var o = a.uws.length;
      for (let e = 0; e < o; e++) {
        var r = a.uws[e];
        ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(r.h5n, r.lws);
      }
      await Promise.resolve();
    }
  }
  static SendIllustratedInfoRequest(e) {
    var t = Protocol_1.Aki.Protocol.Sos.create();
    t.E9n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e);
    Net_1.Net.Call(28780, t, t => {
      if (t) {
        ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
        var a = t.uws.length;
        for (let e = 0; e < a; e++) {
          var o = t.uws[e];
          ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(o.h5n, o.lws);
        }
      }
    });
  }
  static SendIllustratedReadRequest(t, e) {
    const a = Protocol_1.Aki.Protocol.Los.create();
    a.h5n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(t);
    a.s5n = e;
    Net_1.Net.Call(21159, a, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24734, e.lvs);
        } else {
          ModelManager_1.ModelManager.HandBookModel.UpdateRedDot(t, a.s5n);
        }
      }
    });
  }
  static SendIllustratedUnlockRequest(t, e) {
    const a = Protocol_1.Aki.Protocol.yos.create();
    a.h5n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(t);
    a.s5n = e;
    Net_1.Net.Call(22230, a, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26342, e.lvs);
        } else {
          ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(a.h5n, e.cws);
          this.Aei(a.h5n, e.cws);
          if (t === 2) {
            e = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfig(e.cws.s5n);
            this.Pei(e);
          }
        }
      }
    });
  }
  static GetCollectProgress(e) {
    var t = [];
    let a = 0;
    let o = undefined;
    switch (e) {
      case 0:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(0);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList();
        break;
      case 1:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(1);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig();
        break;
      case 2:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(2);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig();
        break;
      case 3:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(3);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
        break;
      case 4:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(4);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
        break;
      case 5:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(5);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList();
        break;
      case 6:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(6);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig();
        break;
      case 7:
        a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(7);
        o = ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig();
        break;
      default:
        return [0, 0];
    }
    t[0] = a;
    t[1] = o.length;
    return t;
  }
  static GetAllCollectProgress() {
    var e = [];
    var t = this.GetCollectProgress(0);
    var a = this.GetCollectProgress(1);
    var o = this.GetCollectProgress(2);
    var r = this.GetCollectProgress(3);
    var n = this.GetCollectProgress(4);
    var i = this.GetCollectProgress(5);
    var l = this.GetCollectProgress(6);
    var s = this.GetCollectProgress(7);
    e[0] = t[0] + a[0] + o[0] + r[0] + n[0] + i[0] + l[0] + s[0];
    e[1] = t[1] + a[1] + o[1] + r[1] + n[1] + i[1] + l[1] + s[1];
    return e;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerSenseTargetEnter, this.xei);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerSenseTargetEnter, this.xei);
  }
  static wei(e) {
    e = ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigByMeshId(e);
    return !!e && !ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(4, e.Id);
  }
}
(exports.HandBookController = HandBookController).Uei = 0;
HandBookController.xei = e => {
  var e = EntitySystem_1.EntitySystem.Get(e);
  if ((e &&= e.GetComponent(0)) && e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Animal && (e = e.GetModelId(), HandBookController.wei(e))) {
    HandBookController.SendIllustratedUnlockRequest(4, e);
  }
}; //# sourceMappingURL=HandBookController.js.map