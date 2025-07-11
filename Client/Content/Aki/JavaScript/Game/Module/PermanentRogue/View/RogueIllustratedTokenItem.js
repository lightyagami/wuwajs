"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueIllustratedTokenItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const RogueResCollectionById_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const RogueBattleTokenElement_1 = require("../../RogueBattle/Component/RogueBattleTokenElement");
const RogueBattleUtils_1 = require("../../RogueBattle/RogueBattleUtils");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
class RogueIllustratedTokenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GainData = undefined;
    this.OnClickHandle = undefined;
    this.Mli = undefined;
    this.gQl = false;
    this.RefreshDescText = () => {
      var e;
      if (this.GainData) {
        if (this.gQl) {
          e = this.GainData.lIc;
          if (e = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(e.v9n)) {
            if (ModelManager_1.ModelManager.RogueBattleModel.DescMode === 0) {
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.BuffDescSimple);
            } else {
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.BuffDesc, ...e.BuffDescParam);
            }
          }
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueRes_CollectionEventLock");
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIText], [5, UE.UIExtendToggle], [6, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [7, UE.UISprite]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueBattleDescModeChange, this.RefreshDescText);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueBattleDescModeChange, this.RefreshDescText);
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), () => new RogueBattleTokenElement_1.RogueBattleTokenElement());
    this.GetExtendToggle(5).SetEnable(false);
    this.GetExtendToggle(5).SetToggleState(2);
    this.GetItem(6).SetUIActive(false);
  }
  Refresh(t, e, i) {
    var o;
    var r;
    if (t.lIc) {
      r = t.lIc;
      if (o = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(r.v9n)) {
        this.GainData = t;
        r = RogueResCollectionById_1.configRogueResCollectionById.GetConfig(r.v9n);
        r = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(r.IdKey);
        this.gQl = r !== Protocol_1.Aki.Protocol.zps.Z6n;
        this.GetText(2).ShowTextNew(this.gQl ? o.BuffName : "RogueRes_CollectionEventLock");
        this.SetTextureByPath(o.BuffIcon, this.GetTexture(1));
        if (r = ConfigManager_1.ConfigManager.WeeklyRogueConfig?.GetRogueWeeklyQualityConfig(o.Quality)) {
          this.SetTextureByPath(r.TokenBg, this.GetTexture(0));
        }
        this.GetSprite(7).SetColor(UE.Color.FromHex(r.TokenColor));
        this.GetItem(8).SetUIActive(o.Quality === 6);
        this.GetItem(9).SetUIActive(o.Quality === 5);
        this.RefreshDescText();
        r = new UiAsyncTask_1.UiAsyncTask("RogueBattleTokenItem.Refresh", async () => {
          var e = RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfoByCount(t);
          await this.Mli.RefreshByDataAsync(e);
        });
        this.RunAsyncTask(r);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "RogueBattleTokenItem.Refresh data.Proto_RogueResToken is null");
    }
  }
}
exports.RogueIllustratedTokenItem = RogueIllustratedTokenItem;
//# sourceMappingURL=RogueIllustratedTokenItem.js.map