(function() {
  var GrammarUtils, command, windows;

  command = (GrammarUtils = require('../grammar-utils')).command;

  windows = GrammarUtils.OperatingSystem.isWindows();

  module.exports = {
    BuckleScript: {
      'Selection Based': {
        command: 'bsc',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code);
          return ['-c', tmpFile];
        }
      },
      'File Based': {
        command: 'bsc',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-c', filepath];
        }
      }
    },
    OCaml: {
      'File Based': {
        command: 'ocaml',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Reason: {
      'File Based': {
        command: command,
        args: function(arg) {
          var file, filename;
          filename = arg.filename;
          file = filename.replace(/\.re$/, '.native');
          return GrammarUtils.formatArgs("rebuild '" + file + "' && '" + file + "'");
        }
      }
    },
    'Standard ML': {
      'File Based': {
        command: 'sml',
        args: function(arg) {
          var filename;
          filename = arg.filename;
          return [filename];
        }
      },
      'Selection Based': {
        command: 'sml',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code, '.sml');
          return [tmpFile];
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvemFtcGllcmkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9tbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFDLFVBQVcsQ0FBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGtCQUFSLENBQWY7O0VBRVosT0FBQSxHQUFVLFlBQVksQ0FBQyxlQUFlLENBQUMsU0FBN0IsQ0FBQTs7RUFFVixNQUFNLENBQUMsT0FBUCxHQUVFO0lBQUEsWUFBQSxFQUNFO01BQUEsaUJBQUEsRUFDRTtRQUFBLE9BQUEsRUFBUyxLQUFUO1FBQ0EsSUFBQSxFQUFNLFNBQUMsT0FBRDtBQUNKLGNBQUE7VUFBQSxJQUFBLEdBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQTtVQUNQLE9BQUEsR0FBVSxZQUFZLENBQUMsc0JBQWIsQ0FBb0MsSUFBcEM7QUFDVixpQkFBTyxDQUFDLElBQUQsRUFBTyxPQUFQO1FBSEgsQ0FETjtPQURGO01BT0EsWUFBQSxFQUNFO1FBQUEsT0FBQSxFQUFTLEtBQVQ7UUFDQSxJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQWdCLGNBQUE7VUFBZCxXQUFEO2lCQUFlLENBQUMsSUFBRCxFQUFPLFFBQVA7UUFBaEIsQ0FETjtPQVJGO0tBREY7SUFZQSxLQUFBLEVBQ0U7TUFBQSxZQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQVMsT0FBVDtRQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsY0FBQTtVQUFkLFdBQUQ7aUJBQWUsQ0FBQyxRQUFEO1FBQWhCLENBRE47T0FERjtLQWJGO0lBaUJBLE1BQUEsRUFDRTtNQUFBLFlBQUEsRUFBYztRQUNaLFNBQUEsT0FEWTtRQUVaLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFDSixjQUFBO1VBRE0sV0FBRDtVQUNMLElBQUEsR0FBTyxRQUFRLENBQUMsT0FBVCxDQUFpQixPQUFqQixFQUEwQixTQUExQjtpQkFDUCxZQUFZLENBQUMsVUFBYixDQUF3QixXQUFBLEdBQVksSUFBWixHQUFpQixRQUFqQixHQUF5QixJQUF6QixHQUE4QixHQUF0RDtRQUZJLENBRk07T0FBZDtLQWxCRjtJQXlCQSxhQUFBLEVBQ0U7TUFBQSxZQUFBLEVBQWM7UUFDWixPQUFBLEVBQVMsS0FERztRQUVaLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsY0FBQTtVQUFkLFdBQUQ7QUFBZSxpQkFBTyxDQUFDLFFBQUQ7UUFBdkIsQ0FGTTtPQUFkO01BS0EsaUJBQUEsRUFBbUI7UUFDakIsT0FBQSxFQUFTLEtBRFE7UUFFakIsSUFBQSxFQUFNLFNBQUMsT0FBRDtBQUNKLGNBQUE7VUFBQSxJQUFBLEdBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQTtVQUNQLE9BQUEsR0FBVSxZQUFZLENBQUMsc0JBQWIsQ0FBb0MsSUFBcEMsRUFBMEMsTUFBMUM7QUFDVixpQkFBTyxDQUFDLE9BQUQ7UUFISCxDQUZXO09BTG5CO0tBMUJGOztBQU5GIiwic291cmNlc0NvbnRlbnQiOlsie2NvbW1hbmR9ID0gR3JhbW1hclV0aWxzID0gcmVxdWlyZSAnLi4vZ3JhbW1hci11dGlscydcblxud2luZG93cyA9IEdyYW1tYXJVdGlscy5PcGVyYXRpbmdTeXN0ZW0uaXNXaW5kb3dzKClcblxubW9kdWxlLmV4cG9ydHMgPVxuXG4gIEJ1Y2tsZVNjcmlwdDpcbiAgICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdic2MnXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgICByZXR1cm4gWyctYycsIHRtcEZpbGVdXG5cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnYnNjJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFsnLWMnLCBmaWxlcGF0aF1cblxuICBPQ2FtbDpcbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnb2NhbWwnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG4gIFJlYXNvbjpcbiAgICAnRmlsZSBCYXNlZCc6IHtcbiAgICAgIGNvbW1hbmRcbiAgICAgIGFyZ3M6ICh7ZmlsZW5hbWV9KSAtPlxuICAgICAgICBmaWxlID0gZmlsZW5hbWUucmVwbGFjZSAvXFwucmUkLywgJy5uYXRpdmUnXG4gICAgICAgIEdyYW1tYXJVdGlscy5mb3JtYXRBcmdzKFwicmVidWlsZCAnI3tmaWxlfScgJiYgJyN7ZmlsZX0nXCIpXG4gICAgfVxuXG4gICdTdGFuZGFyZCBNTCc6XG4gICAgJ0ZpbGUgQmFzZWQnOiB7XG4gICAgICBjb21tYW5kOiAnc21sJ1xuICAgICAgYXJnczogKHtmaWxlbmFtZX0pIC0+IHJldHVybiBbZmlsZW5hbWVdO1xuICAgIH1cblxuICAgICdTZWxlY3Rpb24gQmFzZWQnOiB7XG4gICAgICBjb21tYW5kOiAnc21sJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+XG4gICAgICAgIGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgJy5zbWwnKVxuICAgICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgfVxuIl19
