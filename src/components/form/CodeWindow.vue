<template>
  <div class="my-3">
    <label class="block mb-1 font-semibold" :for="id">{{ title }}</label>
    <codemirror :value="value" @input="emit" :options="options"></codemirror>
  </div>
</template>

<script>
// language
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/dracula.css";
// require active-line.js
//import "codemirror/addon/selection/active-line.js";
// styleSelectedText
// import "codemirror/addon/selection/mark-selection.js";
// import "codemirror/addon/search/searchcursor.js";
// hint
// import "codemirror/addon/hint/show-hint.js";
// import "codemirror/addon/hint/show-hint.css";
// import "codemirror/addon/hint/javascript-hint.js";
// import "codemirror/addon/selection/active-line.js";
// highlightSelectionMatches
// import "codemirror/addon/scroll/annotatescrollbar.js";
// import "codemirror/addon/search/matchesonscrollbar.js";
// import "codemirror/addon/search/searchcursor.js";
// import "codemirror/addon/search/match-highlighter.js";
// keyMap
// import "codemirror/mode/clike/clike.js";
// import "codemirror/addon/edit/matchbrackets.js";
// import "codemirror/addon/comment/comment.js";
// import "codemirror/addon/dialog/dialog.js";
// import "codemirror/addon/dialog/dialog.css";
// import "codemirror/addon/search/searchcursor.js";
// import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
import "codemirror/addon/display/autorefresh.js";
// foldGutter
// import "codemirror/addon/fold/foldgutter.css";
// import "codemirror/addon/fold/brace-fold.js";
// import "codemirror/addon/fold/comment-fold.js";
// import "codemirror/addon/fold/foldcode.js";
// import "codemirror/addon/fold/foldgutter.js";
// import "codemirror/addon/fold/indent-fold.js";
// import "codemirror/addon/fold/markdown-fold.js";
// import "codemirror/addon/fold/xml-fold.js";

// require component
import { codemirror } from "vue-codemirror";

// require styles
import "codemirror/lib/codemirror.css";

export default {
  name: "CodeWindow",
  components: {
    codemirror
  },
  props: ["title", "id", "size", "required", "value", "event"],
  data() {
    return {
      options: {
        tabSize: 2,
        lineNumbers: true,
        mode: "text/javascript",
        theme: "dracula",
        extraKeys: {}
      }
    };
  },
  methods: {
    emit: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>
.CodeMirror {
  @apply h-auto rounded border shadow-md;
}
</style>
