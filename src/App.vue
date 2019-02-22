<template>
  <div id="app" class="relative h-screen text-xl font-sans">
    <nav
      id="nav"
      class="absolute pin-x pin-t h-16 z-20 flex items-center justify-center py-2 bg-fog-lighter text-body shadow"
    >
      <router-link
        class="text-black no-underline mx-3 rounded hover:bg-black hover:text-white p-2"
        to="/map"
        exact-active-class="bg-black text-white"
      >Map</router-link>
      <router-link
        class="text-black no-underline mx-3 rounded hover:bg-black hover:text-white p-2"
        to="/settings"
        active-class="bg-black text-white"
      >Settings</router-link>
      <router-link
        class="text-black no-underline mx-3 rounded hover:bg-black hover:text-white p-2"
        to="/sources"
        exact-active-class="bg-black text-white"
      >Sources</router-link>
      <router-link
        class="text-black no-underline mx-3 rounded hover:bg-black hover:text-white p-2"
        to="/layers"
        exact-active-class="bg-black text-white"
      >Layers</router-link>
    </nav>
    <main class="relative pt-16 h-full">
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
/* Google Fonts */
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,700,800");

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
