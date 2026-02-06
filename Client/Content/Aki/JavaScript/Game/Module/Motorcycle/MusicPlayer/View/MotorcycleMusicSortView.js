"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMusicSortView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const DragSortScrollView_1 = require("./DragSortScrollView");
class MotorcycleMusicSortView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.G6e = undefined;
    this.dGf = () => {
      if (this.xqe?.IsDragging()) {
        this.xqe.CancelDrag();
      } else {
        this.CloseMe();
      }
    };
    this.mGf = () => {
      this.GetItem(0)?.SetUIActive(false);
    };
    this.fGf = () => {
      this.GetItem(0)?.SetUIActive(true);
    };
    this.Bqe = () => {
      return new MotorcycleMusicSortItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIVerticalLayout], [4, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorMusicSortDragCancel, this.dGf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorMusicSortDragCancel, this.dGf);
  }
  async OnBeforeStartAsync() {
    new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)).SetCloseCallBack(this.CloseMe.bind(this));
    this.xqe = new DragSortScrollView_1.DragSortScrollView(this.GetScrollViewWithScrollbar(2), this.Bqe);
    var e = this.OpenParam;
    this.G6e = e.OnCallback;
    await this.xqe.RefreshByDataAsync(e.MusicList);
    if (this.xqe) {
      this.xqe.OnItemPointerDownCallback = this.mGf;
      this.xqe.OnItemPointerUpCallback = this.fGf;
    }
  }
  OnBeforeShowImplementImplement() {
    UiManager_1.UiManager.AddTickView(this);
  }
  OnAfterHideImplementImplement() {
    UiManager_1.UiManager.RemoveTickView(this);
  }
  Tick(e) {
    this.xqe?.Tick(e);
  }
  AfterTick() {}
  OnBeforeDestroy() {
    if (this.xqe?.HasChanged()) {
      this.G6e?.(this.xqe.GetSortedData());
    }
  }
}
exports.MotorcycleMusicSortView = MotorcycleMusicSortView;
class MotorcycleMusicSortItem extends DragSortScrollView_1.DragSortGridAbstract {
  GetDraggableComp() {
    return this.GetDraggable(5);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIDraggableComponent]];
  }
  OnStartImplement() {
    this.GetExtendToggle(1)?.CanExecuteChange.Bind(() => false);
  }
  Refresh(e, t, i) {
    var e = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e);
    if (e && (this.GetText(2)?.ShowTextNew(e.Title), e.Album.length > 0) && (e = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicAlbumById(e.Album[0]))) {
      this.GetText(3).ShowTextNew(e.Title);
    }
  }
}
//# sourceMappingURL=MotorcycleMusicSortView.js.map