Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require("atom");

"use babel";

exports["default"] = {
  config: {
    fmtOnSave: {
      type: "boolean",
      "default": true,
      title: "Format on save"
    },
    lineLength: {
      type: "integer",
      "default": "88",
      minimum: 1,
      title: "Maximum line length",
      description: "Leave as default to pickup settings from pyproject.toml"
    },
    binPath: {
      type: "string",
      "default": "black",
      title: "Path to the black executable"
    },
    skipStringNormalization: {
      type: "boolean",
      "default": false,
      title: "Skip string normalization"
    },
    skipNumericUnderscoreNormalization: {
      type: "boolean",
      "default": false,
      title: "Skip numeric underscore normalization"
    },
    showErrors: {
      type: "string",
      "default": "show",
      "enum": [{ value: "flash", description: "Dismiss after 5 seconds" }, { value: "hide", description: "Hide" }, { value: "show", description: "Show until dismissed" }],
      title: "Errors"
    }
  },
  subscriptions: null,

  activate: function activate(state) {
    var _this = this;

    this.subscriptions = new _atom.CompositeDisposable();

    this.subscriptions.add(atom.workspace.observeTextEditors(function (textEditor) {
      if (textEditor.getGrammar().scopeName == "source.python") {
        _this.subscriptions.add(textEditor.onDidSave(function (event) {
          if (atom.config.get("python-black.fmtOnSave")) {
            _this.formatFile(event.path);
          }
        }));
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-text-editor[data-grammar="source python"]', "python-black:format", function () {
      _this.formatEditor(atom.workspace.getActiveTextEditor());
    }));

    this.subscriptions.add(atom.commands.add("atom-workspace", "python-black:toggle-format-on-save", function () {
      atom.config.set("python-black.fmtOnSave", !atom.config.get("python-black.fmtOnSave"));
    }));
  },

  deactivate: function deactivate() {
    this.subscriptions.dispose();
  },

  handleError: function handleError(err) {
    errors = atom.config.get("python-black.showErrors");
    if (errors != "hide") {
      atom.notifications.addError("Black failed to reformat 💥 💔 💥", {
        detail: err,
        dismissable: errors == "show" ? true : false
      });
    }
  },

  loadArgs: function loadArgs() {
    var args = ["-q"];
    lineLength = atom.config.get("python-black.lineLength");
    if (atom.config.getSchema("python-black.lineLength")["default"] != lineLength) {
      args.push("-l", lineLength);
    }
    if (atom.config.get("python-black.skipStringNormalization")) {
      args.push("-S");
    }
    if (atom.config.get("python-black.skipNumericUnderscoreNormalization")) {
      args.push("-N");
    }
    return args;
  },

  formatFile: function formatFile(file) {
    var _this2 = this;

    var args = this.loadArgs();
    args.push(file);

    new _atom.BufferedProcess({
      command: atom.config.get("python-black.binPath"),
      args: args,
      stderr: function stderr(err) {
        _this2.handleError(err);
      }
    });
  },

  formatEditor: function formatEditor(textEditor) {
    var _this3 = this;

    var args = this.loadArgs();
    args.push("-"); // Set black to read from stdin

    bp = new _atom.BufferedProcess({
      command: atom.config.get("python-black.binPath"),
      args: args,
      stdout: function stdout(out) {
        textEditor.setText(out);
      },
      stderr: function stderr(err) {
        _this3.handleError(err);
      }
    });
    bp.process.stdin.write(textEditor.getText());
    bp.process.stdin.end();
  }
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3phbXBpZXJpLy5hdG9tL3BhY2thZ2VzL3B5dGhvbi1ibGFjay9saWIvcHl0aG9uLWJsYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7b0JBRXFELE1BQU07O0FBRjNELFdBQVcsQ0FBQzs7cUJBSUc7QUFDYixRQUFNLEVBQUU7QUFDTixhQUFTLEVBQUU7QUFDVCxVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFTLElBQUk7QUFDYixXQUFLLEVBQUUsZ0JBQWdCO0tBQ3hCO0FBQ0QsY0FBVSxFQUFFO0FBQ1YsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxJQUFJO0FBQ2IsYUFBTyxFQUFFLENBQUM7QUFDVixXQUFLLEVBQUUscUJBQXFCO0FBQzVCLGlCQUFXLEVBQUUseURBQXlEO0tBQ3ZFO0FBQ0QsV0FBTyxFQUFFO0FBQ1AsVUFBSSxFQUFFLFFBQVE7QUFDZCxpQkFBUyxPQUFPO0FBQ2hCLFdBQUssRUFBRSw4QkFBOEI7S0FDdEM7QUFDRCwyQkFBdUIsRUFBRTtBQUN2QixVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFTLEtBQUs7QUFDZCxXQUFLLEVBQUUsMkJBQTJCO0tBQ25DO0FBQ0Qsc0NBQWtDLEVBQUU7QUFDbEMsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxLQUFLO0FBQ2QsV0FBSyxFQUFFLHVDQUF1QztLQUMvQztBQUNELGNBQVUsRUFBRTtBQUNWLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsTUFBTTtBQUNmLGNBQU0sQ0FDSixFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFDLHlCQUF5QixFQUFDLEVBQ3ZELEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDLEVBQ3BDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsc0JBQXNCLEVBQUMsQ0FDckQ7QUFDRCxXQUFLLEVBQUUsUUFBUTtLQUNoQjtHQUNGO0FBQ0QsZUFBYSxFQUFFLElBQUk7O0FBRW5CLFVBQVEsRUFBQSxrQkFBQyxLQUFLLEVBQUU7OztBQUNkLFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUM7O0FBRS9DLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQUEsVUFBVSxFQUFJO0FBQzlDLFVBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsSUFBSSxlQUFlLEVBQUU7QUFDeEQsY0FBSyxhQUFhLENBQUMsR0FBRyxDQUNwQixVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQzVCLGNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsRUFBRTtBQUM3QyxrQkFBSyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQzdCO1NBQ0YsQ0FBQyxDQUNILENBQUM7T0FDSDtLQUNGLENBQUMsQ0FDSCxDQUFDOztBQUVGLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDZixnREFBZ0QsRUFDaEQscUJBQXFCLEVBQ3JCLFlBQU07QUFDSixZQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztLQUN6RCxDQUNGLENBQ0YsQ0FBQzs7QUFFRixRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2YsZ0JBQWdCLEVBQ2hCLG9DQUFvQyxFQUNwQyxZQUFNO0FBQ0osVUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ2Isd0JBQXdCLEVBQ3hCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FDM0MsQ0FBQztLQUNILENBQ0YsQ0FDRixDQUFDO0dBQ0g7O0FBRUQsWUFBVSxFQUFBLHNCQUFHO0FBQ1gsUUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUM5Qjs7QUFFRCxhQUFXLEVBQUEscUJBQUMsR0FBRyxFQUFFO0FBQ2YsVUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7QUFDbkQsUUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO0FBQ3BCLFVBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG1DQUFtQyxFQUFFO0FBQy9ELGNBQU0sRUFBRSxHQUFHO0FBQ1gsbUJBQVcsRUFBRSxNQUFNLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLO09BQzdDLENBQUMsQ0FBQztLQUNKO0dBQ0Y7O0FBRUQsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsUUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixjQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtBQUN2RCxRQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFdBQVEsSUFBSSxVQUFVLEVBQUU7QUFDMUUsVUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDN0I7QUFDRCxRQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLEVBQUU7QUFDM0QsVUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQjtBQUNELFFBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaURBQWlELENBQUMsRUFBRTtBQUN0RSxVQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pCO0FBQ0QsV0FBTyxJQUFJLENBQUM7R0FDYjs7QUFFRCxZQUFVLEVBQUEsb0JBQUMsSUFBSSxFQUFFOzs7QUFDZixRQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDN0IsUUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFaEIsOEJBQW9CO0FBQ2xCLGFBQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztBQUNoRCxVQUFJLEVBQUUsSUFBSTtBQUNWLFlBQU0sRUFBRSxnQkFBQSxHQUFHLEVBQUk7QUFDYixlQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUN2QjtLQUNGLENBQUMsQ0FBQztHQUNKOztBQUVELGNBQVksRUFBQSxzQkFBQyxVQUFVLEVBQUU7OztBQUN2QixRQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDN0IsUUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFZixNQUFFLEdBQUcsMEJBQW9CO0FBQ3ZCLGFBQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztBQUNoRCxVQUFJLEVBQUUsSUFBSTtBQUNWLFlBQU0sRUFBRSxnQkFBQSxHQUFHLEVBQUk7QUFDYixrQkFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUN6QjtBQUNELFlBQU0sRUFBRSxnQkFBQSxHQUFHLEVBQUk7QUFDYixlQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUN2QjtLQUNGLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUM3QyxNQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztHQUN4QjtDQUNGIiwiZmlsZSI6Ii9ob21lL3phbXBpZXJpLy5hdG9tL3BhY2thZ2VzL3B5dGhvbi1ibGFjay9saWIvcHl0aG9uLWJsYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIjtcblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgQnVmZmVyZWRQcm9jZXNzIH0gZnJvbSBcImF0b21cIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBmbXRPblNhdmU6IHtcbiAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIHRpdGxlOiBcIkZvcm1hdCBvbiBzYXZlXCJcbiAgICB9LFxuICAgIGxpbmVMZW5ndGg6IHtcbiAgICAgIHR5cGU6IFwiaW50ZWdlclwiLFxuICAgICAgZGVmYXVsdDogXCI4OFwiLFxuICAgICAgbWluaW11bTogMSxcbiAgICAgIHRpdGxlOiBcIk1heGltdW0gbGluZSBsZW5ndGhcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYXZlIGFzIGRlZmF1bHQgdG8gcGlja3VwIHNldHRpbmdzIGZyb20gcHlwcm9qZWN0LnRvbWxcIlxuICAgIH0sXG4gICAgYmluUGF0aDoge1xuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIGRlZmF1bHQ6IFwiYmxhY2tcIixcbiAgICAgIHRpdGxlOiBcIlBhdGggdG8gdGhlIGJsYWNrIGV4ZWN1dGFibGVcIlxuICAgIH0sXG4gICAgc2tpcFN0cmluZ05vcm1hbGl6YXRpb246IHtcbiAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB0aXRsZTogXCJTa2lwIHN0cmluZyBub3JtYWxpemF0aW9uXCJcbiAgICB9LFxuICAgIHNraXBOdW1lcmljVW5kZXJzY29yZU5vcm1hbGl6YXRpb246IHtcbiAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB0aXRsZTogXCJTa2lwIG51bWVyaWMgdW5kZXJzY29yZSBub3JtYWxpemF0aW9uXCJcbiAgICB9LFxuICAgIHNob3dFcnJvcnM6IHtcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZWZhdWx0OiBcInNob3dcIixcbiAgICAgIGVudW06IFtcbiAgICAgICAge3ZhbHVlOiBcImZsYXNoXCIsIGRlc2NyaXB0aW9uOlwiRGlzbWlzcyBhZnRlciA1IHNlY29uZHNcIn0sXG4gICAgICAgIHt2YWx1ZTogXCJoaWRlXCIsIGRlc2NyaXB0aW9uOiBcIkhpZGVcIn0sXG4gICAgICAgIHt2YWx1ZTogXCJzaG93XCIsIGRlc2NyaXB0aW9uOiBcIlNob3cgdW50aWwgZGlzbWlzc2VkXCJ9XG4gICAgICBdLFxuICAgICAgdGl0bGU6IFwiRXJyb3JzXCJcbiAgICB9XG4gIH0sXG4gIHN1YnNjcmlwdGlvbnM6IG51bGwsXG5cbiAgYWN0aXZhdGUoc3RhdGUpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20ud29ya3NwYWNlLm9ic2VydmVUZXh0RWRpdG9ycyh0ZXh0RWRpdG9yID0+IHtcbiAgICAgICAgaWYgKHRleHRFZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZSA9PSBcInNvdXJjZS5weXRob25cIikge1xuICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgICAgICB0ZXh0RWRpdG9yLm9uRGlkU2F2ZShldmVudCA9PiB7XG4gICAgICAgICAgICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoXCJweXRob24tYmxhY2suZm10T25TYXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRGaWxlKGV2ZW50LnBhdGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZChcbiAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3JbZGF0YS1ncmFtbWFyPVwic291cmNlIHB5dGhvblwiXScsXG4gICAgICAgIFwicHl0aG9uLWJsYWNrOmZvcm1hdFwiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mb3JtYXRFZGl0b3IoYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoXG4gICAgICAgIFwiYXRvbS13b3Jrc3BhY2VcIixcbiAgICAgICAgXCJweXRob24tYmxhY2s6dG9nZ2xlLWZvcm1hdC1vbi1zYXZlXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoXG4gICAgICAgICAgICBcInB5dGhvbi1ibGFjay5mbXRPblNhdmVcIixcbiAgICAgICAgICAgICFhdG9tLmNvbmZpZy5nZXQoXCJweXRob24tYmxhY2suZm10T25TYXZlXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH0sXG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICB9LFxuXG4gIGhhbmRsZUVycm9yKGVycikge1xuICAgIGVycm9ycyA9IGF0b20uY29uZmlnLmdldChcInB5dGhvbi1ibGFjay5zaG93RXJyb3JzXCIpXG4gICAgaWYgKGVycm9ycyAhPSBcImhpZGVcIikge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFwiQmxhY2sgZmFpbGVkIHRvIHJlZm9ybWF0IPCfkqUg8J+SlCDwn5KlXCIsIHtcbiAgICAgICAgZGV0YWlsOiBlcnIsXG4gICAgICAgIGRpc21pc3NhYmxlOiBlcnJvcnMgPT0gXCJzaG93XCIgPyB0cnVlIDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBsb2FkQXJncygpIHtcbiAgICBjb25zdCBhcmdzID0gW1wiLXFcIl07XG4gICAgbGluZUxlbmd0aCA9IGF0b20uY29uZmlnLmdldChcInB5dGhvbi1ibGFjay5saW5lTGVuZ3RoXCIpXG4gICAgaWYgKGF0b20uY29uZmlnLmdldFNjaGVtYShcInB5dGhvbi1ibGFjay5saW5lTGVuZ3RoXCIpLmRlZmF1bHQgIT0gbGluZUxlbmd0aCkge1xuICAgICAgYXJncy5wdXNoKFwiLWxcIiwgbGluZUxlbmd0aCk7XG4gICAgfVxuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoXCJweXRob24tYmxhY2suc2tpcFN0cmluZ05vcm1hbGl6YXRpb25cIikpIHtcbiAgICAgIGFyZ3MucHVzaChcIi1TXCIpO1xuICAgIH1cbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KFwicHl0aG9uLWJsYWNrLnNraXBOdW1lcmljVW5kZXJzY29yZU5vcm1hbGl6YXRpb25cIikpIHtcbiAgICAgIGFyZ3MucHVzaChcIi1OXCIpO1xuICAgIH1cbiAgICByZXR1cm4gYXJncztcbiAgfSxcblxuICBmb3JtYXRGaWxlKGZpbGUpIHtcbiAgICBjb25zdCBhcmdzID0gdGhpcy5sb2FkQXJncygpO1xuICAgIGFyZ3MucHVzaChmaWxlKTtcblxuICAgIG5ldyBCdWZmZXJlZFByb2Nlc3Moe1xuICAgICAgY29tbWFuZDogYXRvbS5jb25maWcuZ2V0KFwicHl0aG9uLWJsYWNrLmJpblBhdGhcIiksXG4gICAgICBhcmdzOiBhcmdzLFxuICAgICAgc3RkZXJyOiBlcnIgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZm9ybWF0RWRpdG9yKHRleHRFZGl0b3IpIHtcbiAgICBjb25zdCBhcmdzID0gdGhpcy5sb2FkQXJncygpO1xuICAgIGFyZ3MucHVzaChcIi1cIik7IC8vIFNldCBibGFjayB0byByZWFkIGZyb20gc3RkaW5cblxuICAgIGJwID0gbmV3IEJ1ZmZlcmVkUHJvY2Vzcyh7XG4gICAgICBjb21tYW5kOiBhdG9tLmNvbmZpZy5nZXQoXCJweXRob24tYmxhY2suYmluUGF0aFwiKSxcbiAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICBzdGRvdXQ6IG91dCA9PiB7XG4gICAgICAgIHRleHRFZGl0b3Iuc2V0VGV4dChvdXQpO1xuICAgICAgfSxcbiAgICAgIHN0ZGVycjogZXJyID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGJwLnByb2Nlc3Muc3RkaW4ud3JpdGUodGV4dEVkaXRvci5nZXRUZXh0KCkpO1xuICAgIGJwLnByb2Nlc3Muc3RkaW4uZW5kKCk7XG4gIH1cbn07XG4iXX0=