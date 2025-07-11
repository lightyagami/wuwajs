"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerBuffView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
const ItemTipsWithButton_1 = require("../../Common/ItemTips/ItemTipsWithButton");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerBuffListItem_1 = require("./ShipTowerBuffListItem");
class ShipTowerBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.zJa = undefined;
    this.xqe = undefined;
    this.vxt = undefined;
    this.ys_ = undefined;
    this.vZ_ = 0;
    this.yZ_ = 0;
    this.SZ_ = undefined;
    this.MZ_ = () => {
      if (!this.SZ_?.IsFulfilled()) {
        this.SZ_?.SetResult(true);
      }
    };
    this.OnClickBtnSelect = () => {
      this.OpenParam?.OnUseBuff?.(this.ys_, this.OpenParam?.TeamData);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, this.constructor.name);
      }
    };
    this.Ss_ = () => {
      var i = new ShipTowerBuffListItem_1.ShipTowerBuffListItem();
      i.OnItemClickCallback = this.Ms_;
      i.GetStageIdCallback = this.BW_;
      i.BuffComponentLoadedCallback = this.EZ_;
      return i;
    };
    this.EZ_ = () => {
      this.vZ_++;
      if (!(this.vZ_ < this.yZ_)) {
        this.MZ_();
      }
    };
    this.BW_ = () => this.OpenParam?.TeamData?.StageId;
    this.Ms_ = i => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, this.constructor.name, ["OnItemClickCallback", i]);
      }
      this.ys_ = i;
      this.k8t();
      var e = this.ys_.ItemId;
      var e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e);
      var t = this.OpenParam?.TeamData?.StageId;
      e.UpdateShowNumCallback = () => i.CanUseCount;
      e.IsShowNumTextCallback = i.IsShowNumTextCallback.bind(i, t);
      this.vxt.RefreshTips(e);
      this.vxt.SetVisible(true);
      const s = i.AddToGetState();
      this.xqe?.GetScrollItemList().forEach(i => {
        if (s) {
          i.UpdateBuffInfo();
        }
        i.UpdateBuffSelected();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[3, UE.UIItem], [0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem]];
  }
  Es_() {
    var i = this.OpenParam?.BuffId;
    if (i) {
      ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(i)?.SetSelected(true);
    } else {
      ModelManager_1.ModelManager.ShipTowerModel.SelectDefaultBuff(this.OpenParam?.StageId);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerBuffView", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.zJa.SetCloseCallBack(this.CloseMe.bind(this));
    this.zJa.SetHelpBtnActive(false);
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.Ss_, undefined, true);
    this.vxt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent();
    await this.vxt.CreateByActorAsync(this.GetItem(3).GetOwner());
    TimerSystem_1.TimerSystem.Delay(this.MZ_, 5000);
    var i = ModelManager_1.ModelManager.ShipTowerModel.GetBuffQualityList(true);
    var e = i.findIndex(i => i.BuffList.find(i => i.IsSelected));
    this.yZ_ = i.reduce((i, e) => i + e.BuffList.length, 0);
    if (this.yZ_ <= 0) {
      this.xqe.RefreshByData(i);
    } else {
      this.SZ_ = new CustomPromise_1.CustomPromise();
      await this.xqe.RefreshByDataAsync(i);
      await this.SZ_?.Promise;
      this.xqe.LateScrollTo(this.xqe.GetItemByIndex(e));
    }
  }
  OnBeforeDestroy() {
    this.MZ_();
    this.vxt?.Destroy();
    this.vxt = undefined;
    this.zJa = undefined;
  }
  k8t() {
    var i;
    this.vxt.ClearButtonList();
    this.vxt.SetLockStateVisible();
    if (this.OpenParam?.OperationType === 1) {
      if (this.ys_?.IsUnlock) {
        i = this.OpenParam?.TeamData?.StageId;
        if (this.ys_.IsCanUse(i)) {
          i = {
            Function: this.OnClickBtnSelect,
            Text: ShipTowerDefine_1.shipTowerTextKey.EquipBuff,
            Index: 0
          };
          this.vxt.RefreshButton([i]);
        } else {
          this.vxt.SetLockStateData({
            TipsTextKey: ShipTowerDefine_1.shipTowerTextKey.ItemNotEnough
          });
        }
      } else {
        this.vxt.SetLockStateData({
          TipsTextKey: ShipTowerDefine_1.shipTowerTextKey.ItemLock
        });
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetBuffQualityList(true);
    if (e.length !== 0 && i.length === 3) {
      var t = Number(i[1]);
      if (!isNaN(t) && !(t < 0) && !(t >= e.length)) {
        return this.xqe?.GetScrollItemByIndex(t)?.GetGuideUiItemAndUiItemForShowEx(i);
      }
    }
  }
}
exports.ShipTowerBuffView = ShipTowerBuffView;
//# sourceMappingURL=ShipTowerBuffView.js.map