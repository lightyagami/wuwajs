"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipAttributeItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
class KingShipAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ine = 0;
    this.$Xt = 0;
    this.XSu = 0;
    this.YSu = 0;
    this.rku = 0;
    this.CurrentCount = 0;
    this.HaveRefresh = false;
    this.PFu = false;
    this.xFu = false;
    this.s2i = undefined;
    this.a2i = undefined;
    this.zSu = undefined;
    this.SPe = undefined;
    this.OnClickTipsCallBack = undefined;
    this.KXc = false;
    this.XXc = false;
    this.YXc = new Map();
    this.IsShowByKingShip = false;
    this.nqe = () => {
      var t;
      if (this.ine) {
        this.GetItem(8).SetUIActive(true);
        this.OnClickTipsCallBack?.(true);
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlayOrReplaySequenceByName("InfoIn");
        t = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipAttribute(this.ine);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.DesText);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIButtonComponent]];
    this.BtnBindInfo = [[11, this.nqe]];
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.s2i = this.GetSprite(4);
    this.zSu = this.GetSprite(1);
    this.a2i = this.GetSprite(5);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(t => {
      if (t === "ArrowOut" && (this.XXc && (this.GetItem(2).SetUIActive(false), this.XXc = false), this.KXc)) {
        this.GetItem(3).SetUIActive(false);
        this.KXc = false;
      }
    });
    this.YSu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipStaticAttributeChangeMoveSpeed") ?? 0;
    this.rku = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipValueUseBigEffect") ?? 0;
    this.GetItem(8).SetUIActive(false);
  }
  RefreshItem(t, i) {
    this.HaveRefresh = true;
    this.ine = t.AttributeId;
    this.OnClickTipsCallBack = i;
    i = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipAttribute(t.AttributeId);
    this.SetSpriteByPath(i.Icon, this.GetSprite(0), false);
    this.$Xt = t.MaxCount;
    this.XSu = t.MinCount;
    this.CurrentCount = t.Current;
    this.zSu?.SetFillAmount(this.CurrentCount / this.$Xt);
    this.a2i?.SetFillAmount(0);
    this.s2i?.SetFillAmount(0);
  }
  SetIsShow(t) {
    this.IsShowByKingShip = t;
    this.GetItem(10).SetUIActive(t);
    if (t) {
      this.SPe?.PlayLevelSequenceByName("Start");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnKingShipAttrItemSetShow, this.ine, t);
  }
  RefreshAttribute(t) {
    this.CurrentCount = this.CurrentCount + t;
    this.CurrentCount = MathUtils_1.MathUtils.Clamp(this.CurrentCount, this.XSu, this.$Xt);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KingShip", 5, "KingShip_Attribute", ["AttributeId:", this.ine], ["Value:", this.CurrentCount]);
    }
    this.PFu = false;
    this.xFu = false;
    if (t < 0) {
      this.s2i?.SetFillAmount(this.zSu?.fillAmount ?? 0);
      this.zSu?.SetFillAmount(this.CurrentCount / this.$Xt);
      this.zSu?.SetUIActive(false);
      this.a2i?.SetFillAmount(0);
      this.PFu = true;
    } else {
      this.a2i?.SetFillAmount(this.zSu?.fillAmount ?? 0);
      this.zSu?.SetFillAmount(this.CurrentCount / this.$Xt);
      this.zSu?.SetUIActive(false);
      this.s2i?.SetFillAmount(0);
      this.xFu = true;
    }
  }
  RefreshBuffItem(t, i) {
    if (t) {
      this.YXc.set(t, i);
    }
  }
  RefreshUpDownItem() {
    let t = 0;
    if (this.YXc.size <= 0) {
      this.SetDownItem(false);
      this.SetUpItem(false);
    } else {
      for (var [i] of this.YXc) {
        t += i;
      }
      if (t > 0) {
        this.SetUpItem(true);
        this.SetDownItem(false);
      } else {
        this.SetUpItem(false);
        this.SetDownItem(true);
      }
    }
  }
  RefreshBuffRounds() {
    for (var [t, i] of this.YXc) {
      i = i - 1;
      if (i <= 0) {
        this.YXc.delete(t);
      } else {
        this.YXc.set(t, i);
      }
    }
  }
  SetDownItem(t) {
    if (this.GetItem(2).IsUIActiveSelf() !== t) {
      this.SPe?.StopCurrentSequence();
      if (t) {
        this.GetItem(2).SetUIActive(true);
        this.SPe?.PlayLevelSequenceByName("ArrowIn");
      } else {
        this.SPe?.PlayLevelSequenceByName("ArrowOut");
        this.XXc = true;
      }
    }
  }
  SetUpItem(t) {
    if (this.GetItem(3).IsUIActiveSelf() !== t) {
      this.SPe?.StopCurrentSequence();
      if (t) {
        this.GetItem(3).SetUIActive(true);
        this.SPe?.PlayLevelSequenceByName("ArrowIn");
      } else {
        this.SPe?.PlayLevelSequenceByName("ArrowOut");
        this.KXc = true;
      }
    }
  }
  SetAttributeItem(t, i = 0) {
    if (t && i) {
      t = Math.abs(i) >= this.rku;
      this.GetItem(6).SetUIActive(t);
      this.GetItem(7).SetUIActive(!t);
      if (t) {
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlayLevelSequenceByName("GLoop");
      } else {
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlayLevelSequenceByName("Loop");
      }
    } else {
      this.GetItem(6).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
    }
  }
  Update() {
    if (this.a2i && this.zSu && this.s2i && (this.PFu || this.xFu) && (this.xFu && (this.a2i.fillAmount < this.zSu.fillAmount ? (this.a2i.SetUIActive(true), this.a2i.SetFillAmount(this.a2i?.fillAmount + this.YSu)) : (this.zSu.SetUIActive(true), this.a2i.SetUIActive(false), this.xFu = false)), this.PFu)) {
      if (this.s2i.fillAmount > this.zSu.fillAmount) {
        this.s2i.SetUIActive(true);
        this.s2i.SetFillAmount(this.s2i?.fillAmount - this.YSu);
      } else {
        this.zSu.SetUIActive(true);
        this.s2i.SetUIActive(false);
        this.PFu = false;
      }
    }
  }
  CloseTipsItem() {
    this.GetItem(8).SetUIActive(false);
    this.OnClickTipsCallBack?.(false);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayOrReplaySequenceByName("InfoOut");
  }
  GetShowItem() {
    return this.GetItem(10);
  }
}
exports.KingShipAttributeItem = KingShipAttributeItem;
//# sourceMappingURL=KingShipAttributeItem.js.map