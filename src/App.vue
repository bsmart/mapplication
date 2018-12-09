<template>
  <div id="app" class="relative h-screen text-xl">
    <nav
      id="nav"
      class="absolute pin-x pin-t h-16 z-10 flex items-center justify-center py-2 bg-grey-light text-body border-b border-grey-darkest"
    >
      <router-link
        class="text-black no-underline border-black border-b-2 mx-3 hover:bg-black hover:text-white hover:rounded p-2"
        to="/map"
        exact-active-class="bg-black text-white rounded"
      >Map</router-link>
      <router-link
        class="text-black no-underline border-black border-b-2 mx-3 hover:bg-black hover:text-white hover:rounded p-2"
        to="/settings"
        active-class="bg-black text-white rounded"
      >Settings</router-link>
    </nav>
    <main class="relative pt-16 h-full">
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
/**
 * This injects Tailwind's base styles, which is a combination of
 * Normalize.css and some additional base styles.
 *
 * You can see the styles here:
 * https://github.com/tailwindcss/tailwindcss/blob/master/css/preflight.css
 *
 * If using `postcss-import`, use this import instead:
 *
 * @import "tailwindcss/preflight";
 */
@tailwind preflight;

/**
 * This injects any component classes registered by plugins.
 *
 * If using `postcss-import`, use this import instead:
 *
 * @import "tailwindcss/components";
 */
@tailwind components;

/**
 * Here you would add any of your custom component classes; stuff that you'd
 * want loaded *before* the utilities so that the utilities could still
 * override them.
 *
 * Example:
 *
 * .btn { ... }
 * .form-input { ... }
 *
 * Or if using a preprocessor or `postcss-import`:
 *
 * @import "components/buttons";
 * @import "components/forms";
 */

/**
 * This injects all of Tailwind's utility classes, generated based on your
 * config file.
 *
 * If using `postcss-import`, use this import instead:
 *
 * @import "tailwindcss/utilities";
 */
@tailwind utilities;

/**
 * Here you would add any custom utilities you need that don't come out of the
 * box with Tailwind.
 *
 * Example :
 *
 * .bg-pattern-graph-paper { ... }
 * .skew-45 { ... }
 *
 * Or if using a preprocessor or `postcss-import`:
 *
 * @import "utilities/background-patterns";
 * @import "utilities/skew-transforms";
 */
</style>
