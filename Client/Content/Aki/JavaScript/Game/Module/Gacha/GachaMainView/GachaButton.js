"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaButton = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const CommonExchangeData_1 = require("../../ItemExchange/View/CommonExchangeData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaController_1 = require("../GachaController");
const GachaDefine_1 = require("../GachaDefine");
const CLICKCD = 1000;
class GachaButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ojt = undefined;
    this.Times = 0;
    this.rjt = 0;
    this.njt = 0;
    this.sjt = () => {
      var e = this.ojt.GachaInfo;
      if (e) {
        if (e.UsePoolId === 0) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("GachaNoOption");
        } else {
          if (this.njt !== 0) {
            if (Time_1.Time.Now - this.njt <= CLICKCD) {
              return;
            }
          }
          this.njt = Time_1.Time.Now;
          var r = ModelManager_1.ModelManager.GachaModel.CheckCountIsEnough(e, this.Times);
          if (r[0]) {
            var o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e.ItemId);
            if (e.Id === 5 && o <= 0) {
              i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(195);
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
            } else {
              var i = this.rjt - o;
              if (i <= 0) {
                GachaController_1.GachaController.GachaRequest(e.Id, this.Times);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Gacha", 34, "needTokenCount <= 0");
                }
              } else {
                const n = ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(e.ItemId, i, 0, true);
                if (n) {
                  const a = new CommonExchangeData_1.CommonExchangeData();
                  a.InitByItemId(e.ItemId);
                  if (ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()) {
                    (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(166)).SetTextArgs(a.GetDestName());
                    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
                  } else {
                    (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(61)).SetTextArgs(i.toString(), a.GetDestName(), n.ConsumeCount.toString(), a.GetSrcName());
                    e.FunctionMap.set(2, () => {
                      this.ajt(a, n.ExChangeTime, n.ConsumeCount);
                    });
                    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
                  }
                } else if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Gacha", 34, "exchangeSimulation is null");
                }
              }
            }
          } else {
            o = r[1];
            i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o);
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Gacha", 34, "gachaInfo is null");
      }
    };
    this.Times = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite]];
    this.BtnBindInfo = [[0, this.sjt]];
  }
  ajt(i, n, e) {
    var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.GetSrcItemId());
    if (e <= r) {
      ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(i.GetDestItemId(), n, false, (e, r) => {
        var o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.GetDestItemId());
        if (n <= o) {
          GachaController_1.GachaController.GachaRequest(this.ojt.GachaInfo.Id, this.Times);
        }
      });
    } else {
      const o = ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(i.GetSrcItemId(), e - r, 0, true);
      if (o) {
        const a = new CommonExchangeData_1.CommonExchangeData();
        a.InitByItemId(i.GetSrcItemId());
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(62);
        e.SetTextArgs(a.GetDestName(), a.GetSrcName(), a.GetDestName());
        e.FunctionMap.set(2, () => {
          this.hjt(a, o.ExChangeTime, o.ConsumeCount);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    }
  }
  hjt(e, r, o) {
    if (o <= ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e.GetSrcItemId())) {
      ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(e.GetDestItemId(), r, true);
    } else {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowFirstCurrencyConfirm();
    }
  }
  Refresh(e, r) {
    this.ojt = e;
    this.rjt = r;
    var r = e.GachaInfo;
    for (const o of r.GachaConsumes) {
      if (o.$Us === this.Times) {
        this.rjt = o.HUs;
        break;
      }
    }
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r.ItemId)) {
      this.SetItemIcon(this.GetTexture(1), r.ItemId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Text_GachaExChangeCountDescribe_Text", this.rjt);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), GachaDefine_1.GACHA_TEXT, this.Times.toString());
      r = e.PoolInfo.Id;
      if ((e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(r)) === 1) {
        r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(e);
        this.GetItem(4).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), r.TagText);
        e = UE.Color.FromHex(r.TagColor);
        this.GetSprite(6).SetColor(e);
      } else {
        this.GetItem(4).SetUIActive(false);
      }
    }
  }
}
exports.GachaButton = GachaButton;
//# sourceMappingURL=GachaButton.js.map