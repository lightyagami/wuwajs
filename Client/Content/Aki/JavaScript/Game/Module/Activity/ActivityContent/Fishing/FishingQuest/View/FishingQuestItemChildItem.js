"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQuestItemChildItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const FishingDefine_1 = require("../../FishingDefine");
class FishingQuestItemChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickTaskCallBack = undefined;
    this.Wc_ = 0;
    this.FA_ = [];
    this.su_ = i => {
      if (i) {
        this.RefreshItem();
      }
    };
    this.kqe = () => {
      this.OnClickTaskCallBack?.(this.Wc_, this.GetExtendToggle(4), this.MO_);
      var i = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(this.Wc_) ?? 0;
      this.GetText(3).SetColor(UE.Color.FromHex(FishingDefine_1.fishingSelectStateColorText[i]));
    };
    this.MO_ = () => {
      var i = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(this.Wc_) ?? 0;
      this.GetText(3).SetColor(UE.Color.FromHex(FishingDefine_1.fishingStateColorText[i]));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite], [9, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIText], [16, UE.UIItem]];
    this.BtnBindInfo = [[4, this.kqe]];
  }
  OnStart() {
    this.OnAddEventListener();
    this.GetSprite(11).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetExtendToggle(4).SetToggleState(0);
  }
  OnBeforeDestroy() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingRefreshQuestView, this.su_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingRefreshQuestView, this.su_);
  }
  Refresh(i, t, e) {
    this.Wc_ = i;
    this.RefreshItem();
  }
  RefreshItem() {
    if (this.Wc_ === -1) {
      this.mH_();
    } else {
      var e;
      var s;
      var h = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Wc_);
      this.GetText(15).SetUIActive(false);
      this.GetText(2).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h.Name);
      this.GetItem(0).SetUIActive(this.Wc_ === ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust);
      this.GetItem(5).SetColor(UE.Color.FromHex(FishingDefine_1.fishingQuestPoolColorText[h.EntrustPool]));
      if (h.EntrustType === 0 || h.EntrustType === 1) {
        let i = 0;
        let t = 0;
        for ([e, s] of h.EntrustTarget) {
          var n = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(e);
          i += s;
          t += Math.min(n, s);
        }
        this.GetText(9).SetText(t + "/" + i);
      } else if (h.EntrustType === 2) {
        this.GetText(9).SetUIActive(false);
      }
      this.GetItem(16).SetUIActive(h.IsNight);
      this.plc();
    }
  }
  plc() {
    if (this.Wc_ !== -1) {
      var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Wc_);
      var t = i.EntrustPool === FishingDefine_1.FISHING_HIGHT_VALUE_ENTRUST_POOL;
      var e = ModelManager_1.ModelManager.FishingQuestModel.GetEntrustsLockState(this.Wc_);
      if (t) {
        this.GetItem(1).SetUIActive(e);
        this.GetText(9).SetUIActive(!e);
        this.GetItem(6).SetUIActive(false);
        this.GetText(3).SetUIActive(false);
        for (const s of this.FA_) {
          s.SetUIActive(false);
        }
      } else {
        this.GetText(3).SetUIActive(true);
        i = i.Star;
        this.NA_(i);
        this.RefreshStateText();
      }
      this.u3e(t);
      this.GetItem(1).SetUIActive(e);
      this.GetText(9).SetUIActive(!e);
    }
  }
  RefreshStateText() {
    var i = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(this.Wc_) ?? 0;
    this.GetText(3).SetUIActive(true);
    if (this.GetExtendToggle(4).GetToggleState() !== 1) {
      this.GetText(3).SetColor(UE.Color.FromHex(FishingDefine_1.fishingStateColorText[i]));
    } else {
      this.GetText(3).SetColor(UE.Color.FromHex(FishingDefine_1.fishingSelectStateColorText[i]));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), FishingDefine_1.fishingStateText[i]);
    this.GetItem(6).SetUIActive(i === 2);
  }
  mH_() {
    this.GetText(15).SetUIActive(true);
    this.GetText(2).SetUIActive(false);
    this.GetItem(0).SetUIActive(false);
    this.GetText(3).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetText(9).SetUIActive(false);
    this.GetText(14).SetUIActive(false);
    this.GetItem(16).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(5).SetColor(UE.Color.FromHex(FishingDefine_1.fishingQuestPoolColorText[4]));
    for (const i of this.FA_) {
      i.SetUIActive(false);
    }
  }
  NA_(t) {
    for (const i of this.FA_) {
      i.SetUIActive(false);
    }
    for (let i = 0; i < t; i++) {
      var e = this.GetItem(8);
      if (i + 1 > this.FA_.length) {
        (e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(13), e)).SetUIActive(true);
        this.FA_.push(e);
      } else {
        this.FA_[i].SetUIActive(true);
      }
    }
  }
  SelectToggle() {
    this.GetExtendToggle(4).SetToggleStateForce(1, false, true);
    this.OnClickTaskCallBack?.(this.Wc_, this.GetExtendToggle(4), this.MO_);
    var i = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(this.Wc_) ?? 0;
    this.GetText(3).SetColor(UE.Color.FromHex(FishingDefine_1.fishingSelectStateColorText[i]));
  }
  u3e(i) {
    var t;
    if (i) {
      this.GetText(14).SetUIActive(true);
      i = TimeUtil_1.TimeUtil.GetNextDayTimeStamp();
      t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      if ((i = Math.ceil((i - t) * TimeUtil_1.TimeUtil.Millisecond / TimeUtil_1.TimeUtil.Hour)) <= 1) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "FishingEntrustRefreshRemainTimeInOneHour", i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "FishingEntrustRefreshRemainTime", i);
      }
    } else {
      this.GetText(14).SetUIActive(false);
    }
  }
}
exports.FishingQuestItemChildItem = FishingQuestItemChildItem;
//# sourceMappingURL=FishingQuestItemChildItem.js.map