"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipAttributeItem = undefined;
const UE = require("ue");
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
    this.KSu = 0;
    this.XSu = 0;
    this.PBu = 0;
    this.CurrentCount = 0;
    this.HaveRefresh = false;
    this.w2u = false;
    this.L2u = false;
    this.s2i = undefined;
    this.a2i = undefined;
    this.YSu = undefined;
    this.SPe = undefined;
    this.OnClickTipsCallBack = undefined;
    this.XWc = false;
    this.YWc = false;
    this.zWc = new Map();
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
    this.YSu = this.GetSprite(1);
    this.a2i = this.GetSprite(5);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(t => {
      if (t === "ArrowOut" && (this.YWc && (this.GetItem(2).SetUIActive(false), this.YWc = false), this.XWc)) {
        this.GetItem(3).SetUIActive(false);
        this.XWc = false;
      }
    });
    this.XSu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipStaticAttributeChangeMoveSpeed") ?? 0;
    this.PBu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipValueUseBigEffect") ?? 0;
    this.GetItem(8).SetUIActive(false);
  }
  RefreshItem(t, i) {
    this.HaveRefresh = true;
    this.ine = t.AttributeId;
    this.OnClickTipsCallBack = i;
    i = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipAttribute(t.AttributeId);
    this.SetSpriteByPath(i.Icon, this.GetSprite(0), false);
    this.$Xt = t.MaxCount;
    this.KSu = t.MinCount;
    this.CurrentCount = t.Current;
    this.YSu?.SetFillAmount(this.CurrentCount / this.$Xt);
    this.a2i?.SetFillAmount(0);
    this.s2i?.SetFillAmount(0);
  }
  SetIsShow(t) {
    this.GetItem(10).SetUIActive(t);
    if (t) {
      this.SPe?.PlayLevelSequenceByName("Start");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnKingShipAttrItemSetShow, this.ine, t);
  }
  RefreshAttribute(t) {
    this.CurrentCount = this.CurrentCount + t;
    this.CurrentCount = MathUtils_1.MathUtils.Clamp(this.CurrentCount, this.KSu, this.$Xt);
    this.w2u = false;
    this.L2u = false;
    if (t < 0) {
      this.s2i?.SetFillAmount(this.YSu?.fillAmount ?? 0);
      this.YSu?.SetFillAmount(this.CurrentCount / this.$Xt);
      this.YSu?.SetUIActive(false);
      this.a2i?.SetFillAmount(0);
      this.w2u = true;
    } else {
      this.a2i?.SetFillAmount(this.YSu?.fillAmount ?? 0);
      this.YSu?.SetFillAmount(this.CurrentCount / this.$Xt);
      this.YSu?.SetUIActive(false);
      this.s2i?.SetFillAmount(0);
      this.L2u = true;
    }
  }
  RefreshBuffItem(t, i) {
    if (t) {
      this.zWc.set(t, i);
    }
  }
  RefreshUpDownItem() {
    let t = 0;
    if (this.zWc.size <= 0) {
      this.SetDownItem(false);
      this.SetUpItem(false);
    } else {
      for (var [i] of this.zWc) {
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
    for (var [t, i] of this.zWc) {
      i = i - 1;
      if (i <= 0) {
        this.zWc.delete(t);
      } else {
        this.zWc.set(t, i);
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
        this.YWc = true;
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
        this.XWc = true;
      }
    }
  }
  SetAttributeItem(t, i = 0) {
    if (t && i) {
      t = Math.abs(i) >= this.PBu;
      this.GetItem(6).SetUIActive(t);
      this.GetItem(7).SetUIActive(!t);
    } else {
      this.GetItem(6).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
    }
  }
  Update() {
    if (this.a2i && this.YSu && this.s2i && (this.w2u || this.L2u) && (this.L2u && (this.a2i.fillAmount < this.YSu.fillAmount ? (this.a2i.SetUIActive(true), this.a2i.SetFillAmount(this.a2i?.fillAmount + this.XSu)) : (this.YSu.SetUIActive(true), this.a2i.SetUIActive(false), this.L2u = false)), this.w2u)) {
      if (this.s2i.fillAmount > this.YSu.fillAmount) {
        this.s2i.SetUIActive(true);
        this.s2i.SetFillAmount(this.s2i?.fillAmount - this.XSu);
      } else {
        this.YSu.SetUIActive(true);
        this.s2i.SetUIActive(false);
        this.w2u = false;
      }
    }
  }
  CloseTipsItem() {
    this.GetItem(8).SetUIActive(false);
    this.OnClickTipsCallBack?.(false);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayOrReplaySequenceByName("InfoOut");
  }
}
exports.KingShipAttributeItem = KingShipAttributeItem;
//# sourceMappingURL=KingShipAttributeItem.js.map