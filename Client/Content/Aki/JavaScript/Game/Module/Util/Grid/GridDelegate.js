"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridDelegate = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class GridDelegate {
  constructor(t, s) {
    this.Proxy = t;
    this.Actor = s;
    this.ac = 0;
    this.GridIndex = -1;
    this.Data = undefined;
    this.IsSelected = false;
    this.ShowTime = 0;
    this.WaitOperation = 0;
    this.OnCreateCallBack = undefined;
    this.OnRefreshCallBack = undefined;
    this.OnClearCallBack = undefined;
  }
  get IsBusy() {
    return this.ac === 1 || this.ac === 3 || this.WaitOperation !== 0;
  }
  Create() {
    if (this.ac !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[GridDelegate] [Create] 格子重复创建", ["State", this.ac], ["GridIndex", this.GridIndex]);
      }
    } else {
      this.CreateInternalAsync();
    }
  }
  async CreateInternalAsync() {
    this.ac = 1;
    await this.Proxy.CreateByActorAsync(this.Actor);
    this.ac = 2;
    this.OnCreate();
  }
  OnCreate() {
    this.OnCreateCallBack?.();
    if (this.ShowTime === 0 && this.WaitOperation !== 2) {
      this.Proxy.SetUiActive(true);
    }
    if (this.WaitOperation === 1) {
      this.RefreshInternalAsync();
    } else if (this.WaitOperation === 2) {
      this.ClearInternal();
    }
  }
  Refresh() {
    if (this.WaitOperation !== 1) {
      if (this.ac < 2 || this.ac === 3) {
        this.WaitOperation = 1;
      } else {
        this.RefreshInternalAsync();
      }
    }
  }
  async RefreshInternalAsync() {
    this.WaitOperation = 0;
    if (this.Data) {
      this.ac = 3;
      if (this.Proxy.RefreshAsync) {
        await this.Proxy.RefreshAsync(this.Data, this.IsSelected, this.GridIndex);
      } else if (this.Proxy.Refresh) {
        this.Proxy.Refresh(this.Data, this.IsSelected, this.GridIndex);
      }
    }
    this.ac = 4;
    this.OnRefresh();
  }
  OnRefresh() {
    this.OnRefreshCallBack?.();
    if (this.ShowTime === 1 && this.WaitOperation !== 2) {
      this.Proxy.SetUiActive(true);
    }
    if (this.WaitOperation === 1) {
      this.RefreshInternalAsync();
    }
  }
  Clear() {
    if (this.WaitOperation !== 2) {
      if (this.ac < 2 || this.ac === 3) {
        this.WaitOperation = 2;
      } else {
        this.ClearInternal();
      }
    }
  }
  ClearInternal() {
    this.WaitOperation = 0;
    this.Proxy.Clear();
    this.ac = 5;
    this.OnClear();
  }
  OnClear() {
    this.OnClearCallBack?.();
  }
}
exports.GridDelegate = GridDelegate;
//# sourceMappingURL=GridDelegate.js.map