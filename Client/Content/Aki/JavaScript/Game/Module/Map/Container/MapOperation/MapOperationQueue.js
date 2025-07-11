"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapOperationQueue = undefined;
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiAsyncTaskManager_1 = require("../../../../Ui/Base/UiAsyncTaskManager");
class MapOperationQueue {
  static Run(a) {
    var s = new UiAsyncTask_1.UiAsyncTask("MapOperationQueue." + a.OpName, async () => {
      if (a.IsValidate()) {
        await a.Execute();
      }
    });
    this.Yn1.RunTask(s);
  }
  static RunMapMark(a) {
    a.OpName = a.OpName ?? a.MarkId + "." + a.MarkType;
    this.Run(a);
  }
  static Clear() {
    this.Yn1.CancelAllTask();
  }
}
(exports.MapOperationQueue = MapOperationQueue).Yn1 = new UiAsyncTaskManager_1.UiAsyncTaskManager();
//# sourceMappingURL=MapOperationQueue.js.map