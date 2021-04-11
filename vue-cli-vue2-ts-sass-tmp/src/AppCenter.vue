<template>
  <div
    id="app"
    :class="{ 'not-found g-df-c column': $route.name === 'notFound' }"
  >
    <!-- <Header /> -->

    <!-- <div class="view-container">
      <router-view :key="routerViewKey" />
    </div> -->

    <!-- <Footer /> -->
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/index.sass'

// header + content + footer
// @import '@bizSass/variables'

// #app
//   min-width: $min-width
//   margin: 0 auto
//   height: 100%
//   height: 100vh
//   min-height: 100%
//   min-height: 100vh

//   >:last-child
//     min-width: $min-width
//     margin: 0 auto

//     &:not(.custom-max-width)
//       max-width: $max-width

//   .view-container
//     &:not(.auto-height)
//       min-height: calc(100% - #{$header-height} - #{$footer-height})
//       min-height: calc(100vh - #{$header-height} - #{$footer-height})
</style>
