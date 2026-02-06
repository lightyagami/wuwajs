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
    Net_1.Net.Register(21806, e => {
      ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(e.h5n, e.cws);
      if (e.dws && (this.Aei(e.h5n, e.cws), e.h5n === ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(2))) {
        if ((e = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfig(e.cws.s5n))?.GeographyTabType === 2) {
          this.ShowPanoramicPointUnlockTips(e);
        } else {
          this.Pei(e);
        }
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
  static async SendIllustratedRedDotRequest() {
    var e = Protocol_1.Aki.Protocol.pos.create();
    var e = await Net_1.Net.CallAsync(17314, e);
    if (e) {
      ModelManager_1.ModelManager.HandBookModel.InitHandBookRedDotList(e._ws);
    }
  }
  static async SendIllustratedInfoRequestAsync(e) {
    var t = Protocol_1.Aki.Protocol.Sos.create();
    t.E9n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e);
    var a = await Net_1.Net.CallAsync(24610, t);
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
  static async SendIllustratedInfoRequest(e) {
    var t = Protocol_1.Aki.Protocol.Sos.create();
    t.E9n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e);
    var a = await Net_1.Net.CallAsync(24610, t);
    if (a) {
      ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
      var o = a.uws.length;
      for (let e = 0; e < o; e++) {
        var r = a.uws[e];
        ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(r.h5n, r.lws);
      }
    }
  }
  static SendIllustratedReadRequest(t, e) {
    const a = Protocol_1.Aki.Protocol.Los.create();
    a.h5n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(t);
    a.s5n = e;
    Net_1.Net.Call(25601, a, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25707, e.lvs);
        } else {
          ModelManager_1.ModelManager.HandBookModel.UpdateRedDot(t, a.s5n);
        }
      }
    });
  }
  static SendIllustratedUnlockRequest(e, t) {
    var a = Protocol_1.Aki.Protocol.yos.create();
    a.h5n = ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(e);
    a.s5n = t;
    Net_1.Net.Call(26347, a, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20791, e.lvs);
      }
    });
  }
  static GetCollectProgress(e) {
    var t;
    if (e === 7) {
      return ModelManager_1.ModelManager.HandBookModel.GetQuestCount();
    } else if (e === 10) {
      return ModelManager_1.ModelManager.HandBookModel.GetRoleHandBookCount();
    } else if (e === 0) {
      return ModelManager_1.ModelManager.HandBookModel.GetMonsterCount();
    } else if (e === 3) {
      return [t = ModelManager_1.ModelManager.HandBookModel.GetAllHandBookWeaponIdList().length + ModelManager_1.ModelManager.HandBookModel.GetAllHandBookWeaponSkinIdList().length, t];
    } else {
      return [ModelManager_1.ModelManager.HandBookModel.GetCollectCount(e), this.GetCollectProgressMax(e)];
    }
  }
  static GetCollectProgressMax(e) {
    let t = this.uhd.get(e);
    if (t) {
      return t;
    }
    switch (e) {
      case 0:
        var a = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList() ?? [];
        t = 0;
        for (const o of a) {
          if (!o.IsSkin && !(o.OriginalFormInfoId > 0)) {
            t++;
          }
        }
        break;
      case 1:
        t = ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig().length;
        break;
      case 2:
        t = ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig().length;
        break;
      case 4:
        t = ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList().length;
        break;
      case 5:
        t = ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList().length;
        break;
      case 6:
        t = ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig().length;
        break;
      case 11:
        t = ConfigManager_1.ConfigManager.HandBookConfig.GetNounTypeConfigAll().length;
        break;
      default:
        return 0;
    }
    this.uhd.set(e, t ?? 0);
    return t ?? 0;
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
  static async RoleIllustratedInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Xad.create();
    var e = await Net_1.Net.CallAsync(23046, e);
    if (e) {
      ModelManager_1.ModelManager.HandBookModel.RefreshRoleHandBookOpenTime(e.zad);
      ModelManager_1.ModelManager.HandBookModel.RefreshWeaponHandBookOpenTime(e.Jad);
    }
  }
  static ShowPanoramicPointUnlockTips(e) {
    if (e) {
      e = {
        ConfigId: e.Id
      };
      UiManager_1.UiManager.OpenView("PanoramicPointUnlockTipsView", e);
    }
  }
}
(exports.HandBookController = HandBookController).Uei = 0;
HandBookController.uhd = new Map();
HandBookController.xei = e => {
  var e = EntitySystem_1.EntitySystem.Get(e);
  if ((e &&= e.GetComponent(0)) && e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Animal && (e = e.GetModelId(), HandBookController.wei(e))) {
    HandBookController.SendIllustratedUnlockRequest(4, e);
  }
}; //# sourceMappingURL=HandBookController.js.map