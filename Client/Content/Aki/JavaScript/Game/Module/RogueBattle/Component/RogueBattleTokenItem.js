"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTokenItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleUtils_1 = require("../RogueBattleUtils");
const RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleTokenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GainData = undefined;
    this.OnClickHandle = undefined;
    this.Mli = undefined;
    this.cFe = () => {
      if (this.GetExtendToggle(5).GetToggleState() === 1) {
        this.OnSelected(true);
        this.OnClickHandle?.(this.GridIndex);
      } else {
        this.OnDeselected(true);
        this.OnClickHandle?.();
      }
    };
    this.RefreshDescText = () => {
      var e;
      var t;
      if (this.GainData) {
        e = this.GainData.lIc;
        if (t = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(e.v9n)) {
          if (ModelManager_1.ModelManager.RogueBattleModel.DescMode === 0) {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.BuffDescSimple);
          } else {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.BuffDesc, ...t.BuffDescParam);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RogueBattle", 34, "RogueBattleTokenItem.RefreshDescText tokenConfig is null", ["ConfigId", e?.v9n]);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIText], [5, UE.UIExtendToggle], [6, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [7, UE.UISprite]];
    this.BtnBindInfo = [[5, this.cFe]];
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), () => new RogueBattleTokenElement_1.RogueBattleTokenElement());
    this.GetItem(10).SetUIActive(false);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueBattleDescModeChange, this.RefreshDescText);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueBattleDescModeChange, this.RefreshDescText);
  }
  Refresh(t, e, i) {
    var o;
    var s;
    var n;
    if (t.lIc) {
      o = (this.GainData = t).lIc;
      this.GetItem(6).SetUIActive(o.dws);
      if (s = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(o.v9n)) {
        this.GetText(2).ShowTextNew(s.BuffName);
        this.SetTextureByPath(s.BuffIcon, this.GetTexture(1));
        if (n = ConfigManager_1.ConfigManager.WeeklyRogueConfig?.GetRogueWeeklyQualityConfig(s.Quality)) {
          this.SetTextureByPath(n.TokenBg, this.GetTexture(0));
        }
        this.GetSprite(7).SetColor(UE.Color.FromHex(n.TokenColor));
        this.GetItem(8).SetUIActive(s.Quality === 6);
        this.GetItem(9).SetUIActive(s.Quality === 5);
        this.RefreshDescText();
        n = new UiAsyncTask_1.UiAsyncTask("RogueBattleTokenItem.Refresh", async () => {
          var e = RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfoByCount(t);
          await this.Mli.RefreshByDataAsync(e);
        });
        this.RunAsyncTask(n);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RogueBattle", 34, "RogueBattleTokenItem.Refresh tokenConfig is null", ["ConfigId", o.v9n]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "RogueBattleTokenItem.Refresh data.Proto_RogueResToken is null");
    }
  }
  OnSelected(e) {
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = this.GainData;
    this.GetExtendToggle(5).SetToggleState(1);
  }
  OnDeselected(e) {
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = undefined;
    this.GetExtendToggle(5).SetToggleState(0);
  }
}
exports.RogueBattleTokenItem = RogueBattleTokenItem;
//# sourceMappingURL=RogueBattleTokenItem.js.map